import { FindOptionsWhere, LessThan } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { IAuthUser } from '@/auth/types/auth-user';
import { extractPaginationOptions } from '@/core/utils/pagination.utils';
import { TenantEntity } from '@/school/entities/tenant.entity';
import { AcademicYearService } from '@/school/services/academic-year.service';
import { AssignmentService } from '@/school/services/subject-assignment.service';
import { TenantService } from '@/school/services/tenant.service';
import { StudentService } from '@/students/services/student.service';
import { RolesEnum } from '@/users/enums/roles.enum';

import { StudentsTableFilterDto } from '../dto/filters.dto';

@Injectable()
export class TeacherComplianceTaskService {
  constructor(
    private readonly studentService: StudentService,
    private readonly assignmentService: AssignmentService,
    private readonly academicYearService: AcademicYearService,
    private readonly tenantService: TenantService,
  ) {}

  async getStudents(filterDTO: StudentsTableFilterDto, user: IAuthUser) {
    filterDTO['assignment_periods.learning_period_id'] =
      filterDTO.learning_period_id;
    delete filterDTO.learning_period_id;
    if (user.role === RolesEnum.TEACHER) {
      filterDTO['teacher_id'] = user.id;
    }

    const paginationOptions = extractPaginationOptions(filterDTO);


    const subjectAssignments = await this.assignmentService.findAll(
      paginationOptions,
      {
        subject: true,
        teacher: true,
        assignment_periods: {
          learning_period: true,
          samples: true,
          student: {
            academy: true,
            track: true,
            school: true,
            user: true,
          },
        },
      },
    );

    return subjectAssignments;
  }

  async getFilters(user: IAuthUser) {
    const query = this.getTenantQuery(user);
    const tenant = await this.tenantService.findOneBy(query);
    console.log(tenant);
    return tenant;
  }

  private getTenantQuery(user: IAuthUser) {
    const query: FindOptionsWhere<TenantEntity> = {
      tracks: {
        start_date: LessThan(new Date()),
      },
    };
    if (user.role === RolesEnum.TEACHER) {
      query.schools = { teachers: { user } };
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
