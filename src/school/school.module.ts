import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SchoolEntity } from './entities/school.entity';
import { SemesterEntity } from './entities/semester.entity';
import {
  AdminEntity,
  DirectorEntity,
  TeacherEntity,
} from './entities/staff.entity';
import { SubjectEntity } from './entities/subject.entity';
import { TrackEntity } from './entities/track.entity';
import { TrackCalendarEntity } from './entities/track-calendar.entity';
import { TrackLearningPeriodEntity } from './entities/track-learning-period.entity';
import { SchoolService } from './services/school.service';
import { SemesterService } from './services/semester.service';
import { StaffService } from './services/staff.service';
import { SubjectService } from './services/subject.service';
import { TrackService } from './services/track.service';
import { TrackCalendarService } from './services/track-calendar.service';
import { TrackLearningPeriodService } from './services/track-learning-period.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SchoolEntity,
      TrackEntity,
      TrackCalendarEntity,
      SubjectEntity,
      TrackLearningPeriodEntity,
      SemesterEntity,
      TeacherEntity,
      AdminEntity,
      DirectorEntity,
    ]),
  ],
  providers: [
    SchoolService,
    TrackService,
    TrackCalendarService,
    SubjectService,
    TrackLearningPeriodService,
    SemesterService,
    StaffService,
  ],
  exports: [
    SchoolService,
    TrackService,
    TrackCalendarService,
    SubjectService,
    TrackLearningPeriodService,
    SemesterService,
    StaffService,
  ],
})
export class SchoolModule {}
