import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StaffModule } from '@/staff/staff.module';
import { StudentsModule } from '@/students/students.module';
import { TrackModule } from '@/track/track.module';

import { SchoolEntity } from './entities/school.entity';
import { SemesterEntity } from './entities/semester.entity';
import { SchoolService } from './services/school.service';
import { SemesterService } from './services/semester.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolEntity, SemesterEntity]),
    StudentsModule,
    StaffModule,
    TrackModule,
  ],
  providers: [SchoolService, SemesterService],
  exports: [
    SchoolService,
    SemesterService,
    StudentsModule,
    StaffModule,
    TrackModule,
  ],
})
export class SchoolModule {}
