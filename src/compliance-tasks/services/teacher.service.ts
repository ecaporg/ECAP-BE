/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Equal,
  FindOptionsWhere,
  ILike,
  In,
  LessThanOrEqual,
  Like,
} from 'typeorm';

import { Injectable } from '@nestjs/common';

import { IAuthUser } from '@/auth/types/auth-user';
import { extractPaginationOptions } from '@/core/utils/pagination.utils';
import { TenantEntity } from '@/school/entities/tenant.entity';
import { AcademicYearService } from '@/school/services/academic-year.service';
import {
  AssignmentPeriodService,
  AssignmentService,
} from '@/school/services/subject-assignment.service';
import { TenantService } from '@/school/services/tenant.service';
import { StudentService } from '@/students/services/student.service';
import { RolesEnum } from '@/users/enums/roles.enum';

import {
  StudentSamplesFilterDto,
  StudentsTableFilterDto,
} from '../dto/filters.dto';

@Injectable()
export class TeacherComplianceTaskService {
  constructor(
    private readonly studentService: StudentService,
    private readonly assignmentService: AssignmentService,
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
          samples: true,
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

  async getFilters(user: IAuthUser) {
    const query = await this.getTenantQuery(user);
    const tenant = await this.tenantService.findOneBy(query);
    return tenant;
  }

  async searchStudents(user: IAuthUser, search: string) {
    const students = await this.studentService.findBy({
      where: this.getStudentSearchFields(search).map((property) => ({
        user: {
          ...property,
        },
        assignment_periods: {
          assignment: {
            teacher: { user },
          },
        },
      })),
      take: 10,
    });
    return students;
  }

  private getStudentSearchFields(search: string) {
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

  private async getTenantQuery(user: IAuthUser) {
    const academicYears =
      await this.academicYearService.findCurrentAcademicYears();
    const query: FindOptionsWhere<TenantEntity> = {
      tracks: {
        learningPeriods: {
          academicYear: {
            id: In(academicYears.map((academicYear) => academicYear.id)),
          },
          start_date: LessThanOrEqual(new Date()),
        },
      },
    };

    if (user.role === RolesEnum.TEACHER) {
      query.schools = { assignments: { teacher: { user } } };
    } else if (user.role === RolesEnum.ADMIN) {
      query.admins = { user };
    } else if (user.role === RolesEnum.DIRECTOR) {
      query.schools = { directors: { user } };
    } else {
      // TODO: remove comment after testing
      // throw new BadRequestException('User role not found');
      query.id = 1;
    }
    return query;
  }
}
