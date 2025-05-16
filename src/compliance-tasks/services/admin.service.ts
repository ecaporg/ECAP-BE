import { Injectable } from '@nestjs/common';

import { AuthUser } from '@/auth/types/auth-user';
import { extractPaginationOptions } from '@/core';
import { AssignmentPeriodService } from '@/school/services/assignment.service';
import { TeacherService } from '@/staff/services/staff.service';
import { SampleStatus } from '@/students/entities/sample.entity';
import { RolesEnum } from '@/users/enums/roles.enum';

import { TeachersTableFilterDto } from '../dto/filters.dto';

import { TeacherComplianceTaskService } from './teacher.service';

@Injectable()
export class AdminComplianceService {
  constructor(
    private readonly assignmentPeriodService: AssignmentPeriodService,
    private readonly teacherComplianceTaskService: TeacherComplianceTaskService,
    private readonly teacherService: TeacherService,
  ) {}

  async getTeachers(filters: TeachersTableFilterDto, user: AuthUser) {
    const semesters = filters['student.track.semesters.id'];
    if (semesters && semesters.length > 0) {
      delete filters['student.track.semesters.id'];
    }

    const paginationOptions = extractPaginationOptions(filters);
    const query =
      this.assignmentPeriodService.getDefaultQuery(paginationOptions);

    const subQuery = this.assignmentPeriodService
      .getRepository()
      .createQueryBuilder('assignment_periods')
      .select([
        'assignment_periods.course_id as course_id',
        'teacher.id as teacher_id',
        'user.firstname as teacher_firstname',
        'user.lastname as teacher_lastname',
        'academy.id as academy_id',
        'academy.name as academy_name',
        'COUNT(DISTINCT assignment_periods.student_id) as student_count',
        `COUNT(CASE WHEN samples.status = '${SampleStatus.COMPLETED}' THEN samples.id END) as completed_count`,
        `COUNT(CASE WHEN samples.status IN ('${SampleStatus.FLAGGED_TO_ADMIN}', '${SampleStatus.ERRORS_FOUND}', '${SampleStatus.REASON_REJECTED}') THEN samples.id END) as flagged_count`,
        `COUNT(CASE WHEN samples.status IN ('${SampleStatus.PENDING}', '${SampleStatus.MISSING_SAMPLE}') THEN samples.id END) as incompleted_count`,
        `BOOL_AND(samples.status = '${SampleStatus.COMPLETED}') as is_complated`,
        `(COUNT(CASE WHEN samples.status = '${SampleStatus.COMPLETED}' THEN samples.id END)::float / COUNT(assignment_periods.student_id)::float) * 100 as completion_percentage`,
      ])
      .leftJoin('assignment_periods.course', 'course')
      .leftJoin('course.teacher', 'teacher')
      .leftJoin('teacher.user', 'user')
      .leftJoin('course.school', 'school')
      .leftJoin('course.academic_year', 'academic_year')
      .leftJoin('assignment_periods.samples', 'samples')
      .leftJoin('assignment_periods.student', 'student')
      .leftJoin('student.academy', 'academy')
      .where(query.where)
      .groupBy('assignment_periods.course_id')
      .addGroupBy('teacher.id')
      .addGroupBy('user.firstname')
      .addGroupBy('user.lastname')
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
      subQuery.leftJoin('student.track', 'track');
      subQuery.leftJoin('track.semesters', 'semesters');
      subQuery.andWhere('semesters.id IN (:...ids)', {
        ids: semesters,
      });
    }

    const [subQuerySql, subQueryParams] = subQuery.getQueryAndParameters();

    const sql = `
      WITH filtered_data AS (
        ${subQuerySql}
      )
      SELECT 
        *,
        (SELECT COUNT(*) FROM filtered_data) as total_rows,
        (SELECT COUNT(*) FROM filtered_data WHERE is_complated = true) as total_completed
      FROM filtered_data
      LIMIT ${query.take} OFFSET ${query.skip}
    `;

    const items = await this.assignmentPeriodService
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
    const whereInSchool =
      user.role === RolesEnum.DIRECTOR
        ? { tenant: { directors: { user } } }
        : {
            tenant: {
              admins: { user },
            },
          };

    const teachers = await this.teacherService.findBy({
      where: this.teacherComplianceTaskService
        .getUserSearchFields(search)
        .map((property) => ({
          user: {
            ...property,
          },
          courses: {
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
