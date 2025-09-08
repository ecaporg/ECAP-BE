import { Injectable } from '@nestjs/common';

import { AuthUser } from '../../../auth/types/auth-user';
import {
  createOrderCondition,
  extractPaginationOptions,
  getAndDeleteField,
} from '../../../core';
import { StudentLPEnrollmentAssignmentService } from '../../../domain/enrollment/services/student-enrollment-assignment.service';
import { TeacherService } from '../../../domain/staff/services/staff.service';
import {
  SampleFlagCategory,
  SampleStatus,
} from '../../../domain/students/entities/sample.entity';
import { RolesEnum } from '../../../domain/users/enums/roles.enum';
import { TeachersTableFilterDto } from '../dto/filters.dto';

import { TeacherComplianceTaskService } from './teacher.service';

@Injectable()
export class AdminComplianceService {
  constructor(
    private readonly studentLPEnrollmentAssignmentService: StudentLPEnrollmentAssignmentService,
    private readonly teacherComplianceTaskService: TeacherComplianceTaskService,
    private readonly teacherService: TeacherService,
  ) {}

  async getTeachers(filters: TeachersTableFilterDto, user: AuthUser) {
    const semesters = getAndDeleteField(
      filters,
      'student_lp_enrollment.learning_period.track.semesters.id',
    );
    const completed = getAndDeleteField(
      filters,
      'student_lp_enrollment.completed',
    );
    const subject = getAndDeleteField(filters, 'assignment.course_id');

    const paginationOptions = extractPaginationOptions(filters);
    const query =
      this.studentLPEnrollmentAssignmentService.getDefaultQuery(
        paginationOptions,
      );

    const subQuery = this.studentLPEnrollmentAssignmentService
      .getRepository()
      .createQueryBuilder('assignments')
      .select([
        't_s_y_e.id as teacher_school_year_enrollment_id',
        'teacher.id as teacher_id',
        'user.name as teacher_name',
        'academy.id as academy_id',
        'academy.name as academy_name',
        'COUNT(DISTINCT student_lp_enrollment.student_id) as student_count',
        `COUNT(CASE WHEN sample.status = '${SampleStatus.COMPLETED}' THEN sample.id END) as completed_count`,
        `COUNT(CASE WHEN sample.flag_category IN ('${SampleFlagCategory.ERROR_IN_SAMPLE}', '${SampleFlagCategory.MISSING_SAMPLE}', '${SampleFlagCategory.REASON_REJECTED}') THEN sample.id END) as flagged_count`,
        `COUNT(CASE WHEN sample.status IN ('${SampleStatus.PENDING}', '${SampleStatus.ERRORS_FOUND}', '${SampleStatus.MISSING_SAMPLE}') THEN sample.id END) as incompleted_count`,
        `BOOL_AND(sample.status = '${SampleStatus.COMPLETED}') as is_complated`,
        `(COUNT(CASE WHEN sample.status = '${SampleStatus.COMPLETED}' THEN sample.id END)::float / COUNT(student_lp_enrollment.student_id)::float) * 100 as completion_percentage`,
      ])
      .leftJoin('assignments.student_lp_enrollment', 'student_lp_enrollment')
      .leftJoin(
        'student_lp_enrollment.teacher_school_year_enrollments',
        't_s_y_e',
      )
      .leftJoin('t_s_y_e.teacher', 'teacher')
      .leftJoin('teacher.user', 'user')
      .leftJoin('t_s_y_e.school', 'school')
      .leftJoin('t_s_y_e.academic_year', 'academic_year')
      .leftJoin('assignments.sample', 'sample')
      .leftJoin('student_lp_enrollment.student', 'student')
      .leftJoin('student.academy', 'academy')
      .where(query.where)
      .groupBy('t_s_y_e.id')
      .addGroupBy('teacher.id')
      .addGroupBy('user.name')
      .addGroupBy('academy.id')
      .addGroupBy('academy.name')
      .orderBy(createOrderCondition(filters.sortBy, filters.sortDirection));

    if (user.role === RolesEnum.DIRECTOR) {
      subQuery.leftJoin('academy.directors', 'directors');
      subQuery.andWhere('directors.id = :id', {
        id: user.id,
      });
    } else if (user.role === RolesEnum.ADMIN) {
      subQuery.leftJoin('school.tenant', 'tenant');
      subQuery.leftJoin('tenant.admins', 'admins');
      subQuery.leftJoin('admins.user', 'admin_user');
      subQuery.andWhere('admin_user.id = :id', {
        id: user.id,
      });
    }

    if (semesters && semesters.length > 0) {
      subQuery.leftJoin(
        'student_lp_enrollment.learning_period',
        'learning_period',
      );
      subQuery.leftJoin('learning_period.track', 'track');
      subQuery.leftJoin('track.semesters', 'semesters');
      subQuery.andWhere('semesters.id IN (:...ids)', {
        ids: semesters,
      });
    }

    if (subject && subject.length > 0) {
      subQuery.leftJoin('assignments.assignment', 'assignment');
      subQuery.andWhere('assignment.course_id IN (:...ids)', {
        ids: subject,
      });
    }

    const [subQuerySql, subQueryParams] = subQuery.getQueryAndParameters();

    const completedQuery =
      completed && completed.length > 0
        ? `WHERE is_complated IN (${completed.join(',')})`
        : 'WHERE true';

    const sql = `
      WITH filtered_data AS (
        ${subQuerySql}
      )
      SELECT 
        *,
        (SELECT COUNT(*) FROM filtered_data ${completedQuery}) as total_rows,
        (SELECT COUNT(*) FROM filtered_data ${completedQuery} AND is_complated = true) as total_completed
      FROM filtered_data
      ${completedQuery}
      LIMIT ${query.take} OFFSET ${query.skip}
    `;

    const items = await this.studentLPEnrollmentAssignmentService
      .getRepository()
      .query(sql, subQueryParams);

    const totalItems = items[0]?.total_rows || 0;

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: query.take,
        totalPages: Math.ceil(totalItems / query.take),
        currentPage: query.skip,
        additionalData: {
          completedCount: filters?.['student_lp_enrollment.completed']?.every(
            (item) => item === false,
          )
            ? 0
            : items[0]?.total_completed,
        },
      },
    };
  }

  async getFilters(user: AuthUser) {
    return this.teacherComplianceTaskService.getFilters(user);
  }

  async searchTeachers(user: AuthUser, search: string) {
    const whereInSchool = {
      tenant: {
        [user.role === RolesEnum.DIRECTOR ? 'directors' : 'admins']: {
          user: {
            id: user.id,
          },
        },
      },
    };

    const teachers = await this.teacherService.findBy({
      where: this.teacherComplianceTaskService
        .getUserSearchFields(search)
        .map((property) => ({
          user: {
            ...property,
          },
          teacher_school_year_enrollments: {
            school: {
              ...whereInSchool,
            },
          },
        })),
      take: 10,
    });
    return teachers;
  }
}
