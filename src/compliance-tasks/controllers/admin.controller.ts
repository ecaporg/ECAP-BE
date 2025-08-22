import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthUser } from 'src/auth/types/auth-user';
import {
  ApiArrayResponse,
  ApiCrudResponse,
  ApiErrorResponses,
  ApiPaginatedCrudResponse,
  CurrentUser,
  Roles,
} from 'src/core';
import { TeacherSchoolYearEnrollmentEntity } from 'src/enrollment/entities/teacher-enrollment.entity';
import { TeacherEntity } from 'src/staff/entities/staff.entity';
import { TenantEntity } from 'src/tenant/entities/tenant.entity';
import { RolesEnum } from 'src/users/enums/roles.enum';

import { TeachersTableFilterDto } from '../dto/filters.dto';
import { AdminComplianceService } from '../services/admin.service';

@ApiTags('Admin Compliance Tasks')
@Controller('teachers-table')
@Roles(RolesEnum.ADMIN, RolesEnum.DIRECTOR, RolesEnum.SUPER_ADMIN)
export class AdminComplianceController {
  constructor(
    private readonly adminComplianceService: AdminComplianceService,
  ) {}

  @Get()
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
