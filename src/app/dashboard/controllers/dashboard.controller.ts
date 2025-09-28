import { CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserEntity } from '../../../auth/entities/user.entity';
import { RolesEnum } from '../../../auth/enums/roles.enum';
import {
  ApiCrudResponse,
  AttachUserIdInterceptor,
  CurrentUser,
  RoleCache,
  Roles,
} from '../../../core';
import { TrackLearningPeriodEntity } from '../../../domain/track/entities/track-learning-period.entity';
import { DashboardStatsResponseDto } from '../dto/dashboard-stats.dto';
import { DashboardFilterDto } from '../dto/filters.dto';
import { DashboardService } from '../services/dashboard.service';

const interceptor = new AttachUserIdInterceptor<TrackLearningPeriodEntity>([
  {
    role: RolesEnum.TEACHER,
    path: 'student_lp_enrollments.teacher_enrollments.teacher_id',
  },
  {
    role: RolesEnum.DIRECTOR,
    path: 'student_lp_enrollments.student.academy_id',
    map: (user) => user.director?.academy?.id,
  },
  {
    role: RolesEnum.ADMIN,
    path: 'track.tenant.admins.id',
  },
  {
    role: RolesEnum.SUPER_ADMIN,
    path: 'track.tenant.admins.id',
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
  @RoleCache()
  @CacheTTL(60 * 60 * 6) // Cache for 6 hours
  async getDashboardStats(
    @Query() options: DashboardFilterDto,
    @CurrentUser() user: UserEntity,
  ): Promise<DashboardStatsResponseDto> {
    return this.dashboardService.getDashboardStats(options, user);
  }
}
