import { Controller, Get, Param, Query } from '@nestjs/common';
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
import { CourseEntity } from '@/course/entities/course.entity';
import { TeacherEntity } from '@/staff/entities/staff.entity';
import { TenantEntity } from '@/tenant/entities/tenant.entity';
import { RolesEnum } from '@/users/enums/roles.enum';

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
  @ApiPaginatedCrudResponse(CourseEntity)
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
