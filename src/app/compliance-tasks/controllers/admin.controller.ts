import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../../auth/types/auth-user';
import {
  ApiArrayResponse,
  ApiCrudResponse,
  ApiErrorResponses,
  ApiPaginatedCrudResponse,
  CurrentUser,
  QueryParamMapperInterceptor,
  Roles,
} from '../../../core';
import { TeacherSchoolYearEnrollmentEntity } from '../../../domain/enrollment/entities/teacher-enrollment.entity';
import { TeacherEntity } from '../../../domain/staff/entities/staff.entity';
import { TenantEntity } from '../../../domain/tenant/entities/tenant.entity';
import { RolesEnum } from '../../../domain/users/enums/roles.enum';
import {
  assignmentFilterMapping,
  TeachersTableFilterDto,
} from '../dto/filters.dto';
import { AdminComplianceService } from '../services/admin.service';

@ApiTags('Admin Compliance Tasks')
@Controller('teachers-table')
@Roles(RolesEnum.ADMIN, RolesEnum.DIRECTOR, RolesEnum.SUPER_ADMIN)
export class AdminComplianceController {
  constructor(
    private readonly adminComplianceService: AdminComplianceService,
  ) {}

  @Get()
  @UseInterceptors(
    new QueryParamMapperInterceptor(assignmentFilterMapping, {
      sortBy:
        'student_lp_enrollment.teacher_school_year_enrollments.teacher.name',
      sortDirection: 'DESC',
    } as Partial<{ [key in keyof TeachersTableFilterDto]: any }> as any),
  )
  @ApiOperation({ summary: 'Get table with teachers' })
  @ApiPaginatedCrudResponse(TeacherSchoolYearEnrollmentEntity)
  async getTeachers(
    @Query() filters: TeachersTableFilterDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.adminComplianceService.getTeachers(filters, user);
  }

  @Get('filters')
  @ApiOperation({ summary: 'Get available filters for students table' })
  @ApiCrudResponse(TenantEntity)
  async getFilters(@CurrentUser() user: AuthUser) {
    return this.adminComplianceService.getFilters(user);
  }

  @Get('teachers/:search')
  @ApiOperation({ summary: 'Search teachers' })
  @ApiErrorResponses()
  @ApiArrayResponse(TeacherEntity)
  async searchTeachers(
    @CurrentUser() user: AuthUser,
    @Param('search') search: string,
  ) {
    return this.adminComplianceService.searchTeachers(user, search);
  }
}
