import { Injectable } from '@nestjs/common';

import { AuthUser } from '../../auth/types/auth-user';
import { extractPaginationOptions } from '../../core';
import { StudentLPEnrollmentService } from '../../enrollment/services/student-enrollment.service';
import { TeacherService } from '../../staff/services/staff.service';
import {
  SampleFlagCategory,
  SampleStatus,
} from '../../students/entities/sample.entity';
import { RolesEnum } from '../../users/enums/roles.enum';

import { TeachersTableFilterDto } from '../dto/filters.dto';

import { TeacherComplianceTaskService } from './teacher.service';

@Injectable()
export class AdminComplianceService {
  constructor(
    private readonly studentLPEnrollmentService: StudentLPEnrollmentService,
    private readonly teacherComplianceTaskService: TeacherComplianceTaskService,
    private readonly teacherService: TeacherService,
  ) {}

  async getTeachers(filters: TeachersTableFilterDto, user: AuthUser) {
    const semesters = filters['track.semesters.id'];
    const completed = filters['completed'];
    const subject = filters['samples.subject.id'];

    if (completed && completed.length > 0) {
      delete filters['completed'];
    }

    if (semesters && semesters.length > 0) {
      delete filters['track.semesters.id'];
    }

    if (subject && subject.length > 0) {
      delete filters['samples.subject.id'];
    }

    const paginationOptions = extractPaginationOptions(filters);
    const query =
      this.studentLPEnrollmentService.getDefaultQuery(paginationOptions);

    const subQuery = this.studentLPEnrollmentService
      .getRepository()
      .createQueryBuilder('student_lp_enrollments')
      .select([
        'student_lp_enrollments.teacher_school_year_enrollment_id as teacher_school_year_enrollment_id',
        'teacher.id as teacher_id',
        'user.name as teacher_name',
        'academy.id as academy_id',
        'academy.name as academy_name',
        'COUNT(DISTINCT student_lp_enrollments.student_id) as student_count',
        `COUNT(CASE WHEN samples.status = '${SampleStatus.COMPLETED}' THEN samples.id END) as completed_count`,
        `COUNT(CASE WHEN samples.flag_category IN ('${SampleFlagCategory.ERROR_IN_SAMPLE}', '${SampleFlagCategory.MISSING_SAMPLE}', '${SampleFlagCategory.REASON_REJECTED}') THEN samples.id END) as flagged_count`,
        `COUNT(CASE WHEN samples.status IN ('${SampleStatus.PENDING}', '${SampleStatus.ERRORS_FOUND}', '${SampleStatus.MISSING_SAMPLE}') THEN samples.id END) as incompleted_count`,
        `BOOL_AND(samples.status = '${SampleStatus.COMPLETED}') as is_complated`,
        `(COUNT(CASE WHEN samples.status = '${SampleStatus.COMPLETED}' THEN samples.id END)::float / COUNT(student_lp_enrollments.student_id)::float) * 100 as completion_percentage`,
      ])
      .leftJoin(
        'student_lp_enrollments.teacher_school_year_enrollment',
        'teacher_school_year_enrollment',
      )
      .leftJoin('teacher_school_year_enrollment.teacher', 'teacher')
      .leftJoin('teacher.user', 'user')
      .leftJoin('teacher_school_year_enrollment.school', 'school')
      .leftJoin('teacher_school_year_enrollment.academic_year', 'academic_year')
      .leftJoin('student_lp_enrollments.samples', 'samples')
      .leftJoin('student_lp_enrollments.student', 'student')
      .leftJoin('student.academy', 'academy')
      .where(query.where)
      .groupBy('student_lp_enrollments.teacher_school_year_enrollment_id')
      .addGroupBy('teacher.id')
      .addGroupBy('user.name')
      .addGroupBy('academy.id')
      .addGroupBy('academy.name')
      .orderBy(query.order as any);

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
      subQuery.leftJoin('track', 'track');
      subQuery.leftJoin('track.semesters', 'semesters');
      subQuery.andWhere('semesters.id IN (:...ids)', {
        ids: semesters,
      });
    }

    if (subject && subject.length > 0) {
      subQuery.leftJoin('samples.subject', 'subject');
      subQuery.andWhere('subject.id IN (:...ids)', {
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

    const items = await this.studentLPEnrollmentService
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
          completedCount: filters?.completed?.every((item) => item === false)
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
