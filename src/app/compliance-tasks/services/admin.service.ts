import { SelectQueryBuilder } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { RolesEnum } from '../../../auth/enums/roles.enum';
import { AuthUser } from '../../../auth/types/auth-user';
import {
  addInOrEqualsCondition,
  createOrderCondition,
  formInOrEqualsCondition,
  getAndDeleteField,
} from '../../../core';
import { StudentLPEnrollmentAssignmentEntity } from '../../../domain/enrollment/entities/student-enrollment-assignment.entity';
import { StudentLPEnrollmentAssignmentService } from '../../../domain/enrollment/services/student-enrollment-assignment.service';
import { TeacherService } from '../../../domain/staff/services/staff.service';
import {
  SampleFlagCategory,
  SampleStatus,
} from '../../../domain/students/entities/sample.entity';
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
    const completed = getAndDeleteField(
      filters,
      'student_lp_enrollment.completed',
    );

    const query = this.studentLPEnrollmentAssignmentService.getDefaultQuery({
      page: filters.page,
      limit: filters.limit,
    });

    const subQuery = this.studentLPEnrollmentAssignmentService
      .getRepository()
      .createQueryBuilder('assignments')
      .select([
        't_s_y_e.id as teacher_enrollment_id',
        'teacher.id as teacher_id',
        'user.name as teacher_name',
        'academy.id as academy_id',
        'academy.name as academy_name',
        'COUNT(DISTINCT student_lp_enrollment.student_id) as student_count',
        `COUNT(CASE WHEN sample.status = '${SampleStatus.COMPLETED}' THEN sample.id END) as completed_count`,
        `COUNT(CASE WHEN sample.flag_category IN ('${SampleFlagCategory.ERROR_IN_SAMPLE}', '${SampleFlagCategory.MISSING_SAMPLE}', '${SampleFlagCategory.REASON_REJECTED}') and sample.status <> '${SampleStatus.COMPLETED}' THEN sample.id END) as flagged_count`,
        `COUNT(CASE WHEN sample.status IN ('${SampleStatus.PENDING}', '${SampleStatus.ERRORS_FOUND}', '${SampleStatus.MISSING_SAMPLE}') THEN sample.id END) as incompleted_count`,
        `BOOL_AND(sample.status = '${SampleStatus.COMPLETED}') as is_complated`,
        `(COUNT(CASE WHEN sample.status = '${SampleStatus.COMPLETED}' THEN sample.id END)::float / COUNT(student_lp_enrollment.student_id)::float) * 100 as completion_percentage`,
      ])
      .leftJoin('assignments.student_lp_enrollment', 'student_lp_enrollment')
      .leftJoin('student_lp_enrollment.teacher_enrollments', 't_s_y_e')
      .leftJoin('t_s_y_e.teacher', 'teacher')
      .leftJoin('teacher.user', 'user')
      .leftJoin('t_s_y_e.academic_year', 'academic_year')
      .leftJoin('assignments.sample', 'sample')
      .leftJoin('student_lp_enrollment.student', 'student')
      .leftJoin('student.academy', 'academy')
      .groupBy('t_s_y_e.id')
      .addGroupBy('teacher.id')
      .addGroupBy('user.name')
      .addGroupBy('academy.id')
      .addGroupBy('academy.name')
      .orderBy(createOrderCondition(filters.sortBy, filters.sortDirection));

    this.buildTeacherFilters(filters, user, subQuery);
    const [subQuerySql, subQueryParams] = subQuery.getQueryAndParameters();

    // Log the generated SQL for debugging
    console.log('Generated subquery SQL:', subQuerySql);
    console.log('Query parameters:', subQueryParams);

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
        [user.role === RolesEnum.DIRECTOR
          ? 'directors'
          : user.role === RolesEnum.ADMIN
            ? 'admins'
            : 'teachers']: {
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
          ...whereInSchool,
        })),
      take: 10,
    });
    return teachers;
  }

  buildTeacherFilters(
    filters: TeachersTableFilterDto,
    user: AuthUser,
    query: SelectQueryBuilder<StudentLPEnrollmentAssignmentEntity>,
  ) {
    const academicYear = getAndDeleteField(
      filters,
      'student_lp_enrollment.teacher_enrollments.academic_year_id',
    );
    const learningPeriod = getAndDeleteField(
      filters,
      'student_lp_enrollment.learning_period_id',
    );

    const academy = getAndDeleteField(
      filters,
      'student_lp_enrollment.student.academy_id',
    );

    const school = getAndDeleteField(
      filters,
      'student_lp_enrollment.student.school_id',
    );
    const track = getAndDeleteField(
      filters,
      'student_lp_enrollment.learning_period.track_id',
    );
    const semesters = getAndDeleteField(
      filters,
      'student_lp_enrollment.learning_period.track.semesters.id',
    );
    const subject = getAndDeleteField(filters, 'assignment.course_id');

    const gradeSpan = getAndDeleteField(
      filters,
      'student_lp_enrollment.student_grade',
    );
    const status = getAndDeleteField(filters, 'sample.status');

    // Log filters for debugging
    console.log('Applied filters:', {
      academicYear,
      learningPeriod,
      academy,
      school,
      track,
      semesters,
      subject,
      gradeSpan,
      status,
    });

    if (user.role === RolesEnum.DIRECTOR) {
      query.leftJoin('academy.directors', 'directors');
      query.andWhere('directors.id = :id', {
        id: user.id,
      });
    } else if (user.role === RolesEnum.ADMIN) {
      query.leftJoin('teacher.tenant', 'tenant');
      query.leftJoin('tenant.admins', 'admins');
      query.leftJoin('admins.user', 'admin_user');
      query.andWhere('admin_user.id = :id', {
        id: user.id,
      });
    }

    if (academicYear) {
      addInOrEqualsCondition(query, 't_s_y_e.academic_year_id', academicYear);
    }

    if (learningPeriod) {
      if (!track) {
        const [condition, params] = formInOrEqualsCondition(
          'learning_period.id',
          learningPeriod,
        );
        query.innerJoin(
          'student_lp_enrollment.learning_period',
          'learning_period',
          condition,
          params,
        );
      } else {
        const [condition_1, params_1] = formInOrEqualsCondition(
          'learning_period.id',
          learningPeriod,
          'learning_period_ids',
        );
        const [condition_2, params_2] = formInOrEqualsCondition(
          'learning_period.track_id',
          track,
          'track_ids',
        );
        query.innerJoin(
          'student_lp_enrollment.learning_period',
          'learning_period',
          `${condition_1} AND ${condition_2}`,
          { ...params_1, ...params_2 },
        );
      }
    }

    if (academy) {
      addInOrEqualsCondition(query, 'academy.id', academy);
    }

    if (school) {
      const [condition, params] = formInOrEqualsCondition('school.id', school);
      query.innerJoin('student.school', 'school', condition, params);
    }

    if (semesters) {
      query.leftJoin('learning_period.track', 'track');
      query.leftJoin('track.semesters', 'semesters');
      addInOrEqualsCondition(query, 'semesters.id', semesters);
    }

    if (subject) {
      query.leftJoin('assignments.assignment', 'assignment');
      addInOrEqualsCondition(query, 'assignment.course_id', subject);
    }

    if (gradeSpan) {
      addInOrEqualsCondition(
        query,
        'student_lp_enrollment.student_grade',
        gradeSpan,
      );
    }

    if (status) {
      addInOrEqualsCondition(query, 'sample.status', status);
    }
  }
}
