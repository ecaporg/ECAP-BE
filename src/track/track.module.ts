import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StaffModule } from '@/staff/staff.module';

import { TrackController } from './controllers/track.controller';
import { SubjectEntity } from './entities/subject.entity';
import { TrackEntity } from './entities/track.entity';
import { TrackCalendarEntity } from './entities/track-calendar.entity';
import { TrackLearningPeriodEntity } from './entities/track-learning-period.entity';
import { SubjectService } from './services/subject.service';
import { TrackService } from './services/track.service';
import { TrackCalendarService } from './services/track-calendar.service';
import { TrackLearningPeriodService } from './services/track-learning-period.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrackEntity,
      TrackCalendarEntity,
      TrackLearningPeriodEntity,
      SubjectEntity,
    ]),
    StaffModule,
  ],
  controllers: [TrackController],
  providers: [
    TrackService,
    TrackCalendarService,
    TrackLearningPeriodService,
    SubjectService,
  ],
  exports: [
    TrackService,
    TrackCalendarService,
    TrackLearningPeriodService,
    SubjectService,
  ],
})
export class TrackModule {}
