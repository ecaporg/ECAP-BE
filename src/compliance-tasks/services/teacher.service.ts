/* eslint-disable @typescript-eslint/no-unused-vars */
import { Equal, FindOptionsWhere, ILike, In, LessThanOrEqual } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { AuthUser } from 'src/auth/types/auth-user';
import { BadRequestException, extractPaginationOptions } from 'src/core';
import { StudentLPEnrollmentService } from 'src/enrollment/services/student-enrollment.service';
import { StudentService } from 'src/students/services/student.service';
import { TenantEntity } from 'src/tenant/entities/tenant.entity';
import { TenantService } from 'src/tenant/services/tenant.service';
import { AcademicYearService } from 'src/track/services/academic-year.service';
import { RolesEnum } from 'src/users/enums/roles.enum';

import {
  StudentSamplesFilterDto,
  StudentsTableFilterDto,
} from '../dto/filters.dto';

@Injectable()
export class TeacherComplianceTaskService {
  constructor(
    private readonly studentService: StudentService,
    private readonly studentLPEnrollmentService: StudentLPEnrollmentService,
    private readonly academicYearService: AcademicYearService,
    private readonly tenantService: TenantService,
  ) {}

  async getStudents(filterDTO: StudentsTableFilterDto) {
    const paginationOptions = extractPaginationOptions(filterDTO);
    const assignmentPeriods =
      await this.studentLPEnrollmentService.findAllWithCompletedCount(
        paginationOptions,
        {
          track: true,
          student: {
            academy: true,
            school: true,
            user: true,
          },
        },
      );
    return assignmentPeriods;
  }

  async getStudentSamples(filterDTO: StudentSamplesFilterDto) {
    const paginationOptions = extractPaginationOptions(filterDTO);
    const assignmentPeriods = await this.studentLPEnrollmentService.findAll(
      paginationOptions,
      {
        samples: {
          subject: true,
          done_by: true,
          flag_missing_work: {
            user: true,
          },
          flag_errors: {
            user: true,
          },
          flag_rejected: {
            user: true,
          },
          student_lp_enrollments: {
            student: {
              user: true,
            },
            learning_period: {
              track: true,
            },
          },
        },
      },
    );
    return assignmentPeriods;
  }

  async getFilters(user: AuthUser) {
    const query = await this.getTenantQuery(user);
    const tenant = await this.tenantService.findOneBy(query);
    return tenant;
  }

  async searchStudents(user: AuthUser, search: string) {
    const students = await this.studentService.findBy({
      where: this.getUserSearchFields(search).map((property) => ({
        user: {
          ...property,
        },
        student_lp_enrollments: {
          teacher_school_year_enrollment: {
            teacher: {
              user: {
                id: user.id,
              },
            },
          },
        },
      })),
      take: 10,
    });
    return students;
  }

  getUserSearchFields(search: string) {
    const fields = [
      {
        name: ILike(`%${search}%`),
      },
    ];
    if (!isNaN(parseInt(search))) {
      fields.push({
        id: Equal(parseInt(search)),
      } as any);
    }
    return fields;
  }

  private async getTenantQuery(user: AuthUser) {
    const query: FindOptionsWhere<TenantEntity> = {};

    if (user.role === RolesEnum.TEACHER) {
      const academicYears =
        await this.academicYearService.findCurrentAcademicYears();
      query.schools = {
        teacher_school_year_enrollments: {
          teacher: { user: { id: user.id } },
        },
      };
      query.tracks = {
        academicYear: {
          id: In(academicYears.map((academicYear) => academicYear.id)),
        },
        start_date: LessThanOrEqual(new Date()),
        // studentLPEnrollments: {
        //   teacher_school_year_enrollment: {
        //     teacher: { user: { id: user.id } },
        //   },
        // },
      };
    } else if (
      user.role === RolesEnum.ADMIN ||
      user.role === RolesEnum.SUPER_ADMIN
    ) {
      query.admins = { user: { id: user.id } };
    } else if (user.role === RolesEnum.DIRECTOR) {
      query.directors = { user: { id: user.id } };
      query.academies = {
        directors: {
          user: { id: user.id },
        },
      };
    } else {
      throw new BadRequestException('User role not found');
    }
    return query;
  }
}

