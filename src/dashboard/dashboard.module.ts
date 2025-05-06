import { Module } from '@nestjs/common';

import { SchoolModule } from '@/school/school.module';
import { TrackLearningPeriodService } from '@/track/services/track-learning-period.service';

import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './services/dashboard.service';

@Module({
  imports: [SchoolModule],
  controllers: [DashboardController],
  providers: [DashboardService, TrackLearningPeriodService],
  exports: [DashboardService],
})
export class DashboardModule {}
