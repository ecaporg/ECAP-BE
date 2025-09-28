import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { RolesEnum } from '../../../auth/enums/roles.enum';
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
import { TeacherEnrollmentEntity } from '../../../domain/enrollment/entities/teacher-enrollment.entity';
import { TeacherEntity } from '../../../domain/staff/entities/staff.entity';
import { TenantEntity } from '../../../domain/tenant/entities/tenant.entity';
import {
  assignmentFilterMapping,
  TeacherSearchFilterDto,
  TeachersTableFilterDto,
} from '../dto/filters.dto';
import { AdminComplianceService } from '../services/admin.service';
import { TeacherSearchFilterInterceptor } from '../interceptors/teacher-search-filter.interceptor';

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
      sortBy: 'teacher_name',
    } as Partial<{ [key in keyof TeachersTableFilterDto]: any }> as any),
  )
  @ApiOperation({ summary: 'Get table with teachers' })
  @ApiPaginatedCrudResponse(TeacherEnrollmentEntity)
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
  @UseInterceptors(TeacherSearchFilterInterceptor)
  @ApiOperation({ summary: 'Search teachers' })
  @ApiErrorResponses()
  @ApiArrayResponse(TeacherEntity)
  async searchTeachers(
    @Param('search') search: string,
    @Query() filters: TeacherSearchFilterDto,
  ) {
    return this.adminComplianceService.searchTeachers(search, filters);
  }
}
