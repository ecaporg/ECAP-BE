/* eslint-disable @typescript-eslint/no-unused-vars */
import { Equal, FindOptionsWhere, ILike, In, LessThanOrEqual } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { AuthUser } from '@/auth/types/auth-user';
import { BadRequestException, extractPaginationOptions } from '@/core';
import { AcademicYearService } from '@/track/services/academic-year.service';
import { AssignmentPeriodService } from '@/school/services/assignment.service';
import { StudentService } from '@/students/services/student.service';
import { TenantEntity } from '@/tenant/entities/tenant.entity';
import { TenantService } from '@/tenant/services/tenant.service';
import { RolesEnum } from '@/users/enums/roles.enum';

import {
  StudentSamplesFilterDto,
  StudentsTableFilterDto,
} from '../dto/filters.dto';

@Injectable()
export class TeacherComplianceTaskService {
  constructor(
    private readonly studentService: StudentService,
    private readonly assignmentPeriodService: AssignmentPeriodService,
    private readonly academicYearService: AcademicYearService,
    private readonly tenantService: TenantService,
  ) {}

  async getStudents(filterDTO: StudentsTableFilterDto) {
    const paginationOptions = extractPaginationOptions(filterDTO);
    const assignmentPeriods =
      await this.assignmentPeriodService.findAllWithCompletedCount(
        paginationOptions,
        {
          student: {
            track: true,
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
    const assignmentPeriods = await this.assignmentPeriodService.findAll(
      paginationOptions,
      {
        samples: {
          subject: true,
          done_by: true,
          flag_missing_work: true,
          assignment_period: {
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
        assignment_periods: {
          course: {
            teacher: { user },
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
        firstname: ILike(`%${search}%`),
      },
      {
        lastname: ILike(`%${search}%`),
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
      query.schools = { courses: { teacher: { user: { id: user.id } } } };
      query.tracks = {
        academicYear: {
          id: In(academicYears.map((academicYear) => academicYear.id)),
        },
        start_date: LessThanOrEqual(new Date()),
        learningPeriods: {
          assignment_periods: {
            course: {
              teacher: { user: { id: user.id } },
            },
          },
        },
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
