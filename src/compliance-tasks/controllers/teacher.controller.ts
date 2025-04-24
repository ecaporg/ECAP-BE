import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { IAuthUser } from '@/auth/types/auth-user';
import {
  ApiCrudResponse,
  ApiErrorResponses,
  ApiPaginatedCrudResponse,
  CurrentUser,
  Roles,
} from '@/core';
import { AssignmentPeriodEntity } from '@/school/entities/subject-assignment.entity';
import { TenantEntity } from '@/school/entities/tenant.entity';
import { RolesEnum } from '@/users/enums/roles.enum';

import {
  StudentSamplesFilterDto,
  StudentsTableFilterDto,
} from '../dto/filters.dto';
import { TeacherFilterInterceptor } from '../interceptors/teacher-filter.interceptor';
import { TeacherComplianceTaskService } from '../services/teacher.service';

@ApiTags('Teacher Compliance Tasks')
@Controller('students-table')
@Roles(
  RolesEnum.ADMIN,
  RolesEnum.TEACHER,
  RolesEnum.DIRECTOR,
  RolesEnum.SUPER_ADMIN,
)
export class TeacherComplianceTaskController {
  constructor(
    private readonly teacherComplianceTaskService: TeacherComplianceTaskService,
  ) {}

  @Get()
  @UseInterceptors(TeacherFilterInterceptor)
  @ApiOperation({ summary: 'Get table with students' })
  @ApiPaginatedCrudResponse(AssignmentPeriodEntity)
  async getStudents(@Query() filters: StudentsTableFilterDto) {
    return this.teacherComplianceTaskService.getStudents(filters);
  }

  @Get('filters')
  @ApiOperation({ summary: 'Get available filters for students table' })
  @ApiErrorResponses()
  @ApiCrudResponse(TenantEntity)
  async getFilters(@CurrentUser() user: IAuthUser) {
    return this.teacherComplianceTaskService.getFilters(user);
  }

  @Get('subjects')
  @UseInterceptors(TeacherFilterInterceptor)
  @ApiOperation({ summary: 'Get table with student samples' })
  @ApiPaginatedCrudResponse(AssignmentPeriodEntity)
  async getStudentSamples(@Query() filters: StudentSamplesFilterDto) {
    return this.teacherComplianceTaskService.getStudentSamples(filters);
  }
}
