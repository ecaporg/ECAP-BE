import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  ApiCrudResponse,
  AttachUserIdInterceptor,
  CurrentUser,
  Roles,
} from '@/core';
import { UserEntity } from '@/users/entities/user.entity';
import { RolesEnum } from '@/users/enums/roles.enum';

import { DashboardStatsResponseDto } from '../dto/dashboard-stats.dto';
import { DashboardFilterDto } from '../dto/filters.dto';
import { DashboardService } from '../services/dashboard.service';

const interceptor = new AttachUserIdInterceptor<DashboardFilterDto>([
  {
    role: RolesEnum.TEACHER,
    path: 'assignment_periods.course.teacher_id' as keyof DashboardFilterDto,
  },
  {
    role: RolesEnum.DIRECTOR,
    path: 'assignment_periods.student.academy_id' as keyof DashboardFilterDto,
    map: (user) => user.director?.academy?.id,
  },
  {
    role: RolesEnum.ADMIN,
    path: 'track.tenant.admins.id' as keyof DashboardFilterDto,
  },
  {
    role: RolesEnum.SUPER_ADMIN,
    path: 'track.tenant.admins.id' as keyof DashboardFilterDto,
  },
]);

@ApiTags('Dashboard')
@Controller('dashboard')
@Roles(
  RolesEnum.SUPER_ADMIN,
  RolesEnum.ADMIN,
  RolesEnum.DIRECTOR,
  RolesEnum.TEACHER,
)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get entity by ID' })
  @ApiCrudResponse(DashboardStatsResponseDto)
  @UseInterceptors(interceptor)
  async getDashboardStats(
    @Query() options: DashboardFilterDto,
    @CurrentUser() user: UserEntity,
  ): Promise<DashboardStatsResponseDto> {
    return this.dashboardService.getDashboardStats(options, user);
  }
}
