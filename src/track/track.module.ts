import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StaffModule } from '@/staff/staff.module';

import { TrackController } from './controllers/track.controller';
import { TrackCalendarController } from './controllers/track-calendar.controller';
import { AcademicYearEntity } from './entities/academic-year.entity';
import { SemesterEntity } from './entities/semester.entity';
import { SubjectEntity } from './entities/subject.entity';
import { TrackEntity } from './entities/track.entity';
import { TrackCalendarEntity } from './entities/track-calendar.entity';
import { TrackLearningPeriodEntity } from './entities/track-learning-period.entity';
import { AcademicYearService } from './services/academic-year.service';
import { SemesterService } from './services/semester.service';
import { SubjectService } from './services/subject.service';
import { TrackService } from './services/track.service';
import { TrackCalendarService } from './services/track-calendar.service';
import { TrackLearningPeriodService } from './services/track-learning-period.service';
import { TrackCalendarSubscriber } from './subscribers/track-calendar.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrackEntity,
      TrackCalendarEntity,
      TrackLearningPeriodEntity,
      SubjectEntity,
      AcademicYearEntity,
      SemesterEntity,
    ]),
    StaffModule,
  ],
  controllers: [TrackController, TrackCalendarController],
  providers: [
    TrackService,
    TrackCalendarService,
    TrackLearningPeriodService,
    SubjectService,
    AcademicYearService,
    SemesterService,
    TrackCalendarSubscriber,
  ],
  exports: [
    TrackService,
    TrackCalendarService,
    TrackLearningPeriodService,
    SubjectService,
    AcademicYearService,
    SemesterService,
  ],
})
export class TrackModule {}
