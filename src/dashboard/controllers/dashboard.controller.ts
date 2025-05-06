import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiCrudResponse, AttachUserIdInterceptor } from '@/core';
import { RolesEnum } from '@/users/enums/roles.enum';

import { DashboardStatsDto } from '../dto/dashboard-stats.dto';
import { DashboardFilterDto } from '../dto/filters.dto';
import { DashboardService } from '../services/dashboard.service';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get entity by ID' })
  @ApiCrudResponse(DashboardStatsDto)
  @UseInterceptors(
    new AttachUserIdInterceptor<DashboardFilterDto>([
      {
        role: RolesEnum.DIRECTOR,
        path: 'course.teacher_id' as keyof DashboardFilterDto,
      },
      {
        role: RolesEnum.TEACHER,
        path: 'student.academy.directors.id' as keyof DashboardFilterDto,
      },
    ]),
  )
  async getDashboardStats(
    @Query() options?: DashboardFilterDto,
  ): Promise<DashboardStatsDto> {
    return this.dashboardService.getDashboardStats(options);
  }
}
