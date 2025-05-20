import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '@/auth/types/auth-user';
import {
  ApiArrayResponse,
  ApiCrudResponse,
  ApiErrorResponses,
  ApiPaginatedCrudResponse,
  CurrentUser,
  Roles,
} from '@/core';
import { StudentLPEnrollmentEntity } from '@/enrollment/entities/student-enrollment.entity';
import { StudentEntity } from '@/students/entities/student.entity';
import { TenantEntity } from '@/tenant/entities/tenant.entity';
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
  @ApiPaginatedCrudResponse(StudentLPEnrollmentEntity)
  async getStudents(@Query() filters: StudentsTableFilterDto) {
    return this.teacherComplianceTaskService.getStudents(filters);
  }

  @Get('filters')
  @ApiOperation({ summary: 'Get available filters for students table' })
  @ApiCrudResponse(TenantEntity)
  async getFilters(@CurrentUser() user: AuthUser) {
    return this.teacherComplianceTaskService.getFilters(user);
  }

  @Get('subjects')
  @UseInterceptors(TeacherFilterInterceptor)
  @ApiOperation({ summary: 'Get table with student samples' })
  @ApiPaginatedCrudResponse(StudentLPEnrollmentEntity)
  async getStudentSamples(@Query() filters: StudentSamplesFilterDto) {
    return this.teacherComplianceTaskService.getStudentSamples(filters);
  }

  @Get('students/:search')
  @ApiOperation({ summary: 'Search students' })
  @ApiErrorResponses()
  @ApiArrayResponse(StudentEntity)
  async searchStudents(
    @CurrentUser() user: AuthUser,
    @Param('search') search: string,
  ) {
    return this.teacherComplianceTaskService.searchStudents(user, search);
  }
}
