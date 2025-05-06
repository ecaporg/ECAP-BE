import { LessThan, MoreThan } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { TrackLearningPeriodService } from '@/track/services/track-learning-period.service';

import { DashboardStatsDto } from '../dto/dashboard-stats.dto';
import { DashboardFilterDto } from '../dto/filters.dto';

@Injectable()
export class DashboardService {
  constructor(private trackLearningPeriodService: TrackLearningPeriodService) {}

  async getDashboardStats(
    options: DashboardFilterDto,
  ): Promise<DashboardStatsDto> {
    const now = new Date();

    // Get current learning periods (those that include today's date)
    const currentLP = await this.trackLearningPeriodService.findBy({
      where: {
        start_date: LessThan(now),
        end_date: MoreThan(now),
      },
      relations: ['track'],
    });

    // Get upcoming learning periods (those that start after today)
    const upcomingLP = await this.trackLearningPeriodService.findBy({
      where: {
        start_date: MoreThan(now),
      },
      order: {
        start_date: 'ASC',
      },
      relations: ['track'],
    });

    // Get previous learning periods (those that ended before today)
    const allPreviousLP = await this.trackLearningPeriodService.findBy({
      where: {
        end_date: LessThan(now),
      },
      order: {
        end_date: 'DESC',
      },
      relations: ['track'],
    });

    // Separate previous learning periods into two categories
    const previousLP = allPreviousLP.slice(
      0,
      Math.min(allPreviousLP.length, 5),
    );
    const beforeThePreviousOne =
      allPreviousLP.length > 5 ? allPreviousLP.slice(5) : undefined;

    return {
      currentLP,
      upcomingLP,
      previousLP: previousLP.length > 0 ? previousLP : undefined,
      beforeThePreviousOne,
    };
  }
}
