import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StaffModule } from '@/staff/staff.module';
import { StudentsModule } from '@/students/students.module';
import { TrackModule } from '@/track/track.module';

import { AcademicYearEntity } from './entities/academic-year.entity';
import { AcademyEntity } from './entities/academy.entity';
import { SchoolEntity } from './entities/school.entity';
import { SemesterEntity } from './entities/semester.entity';
import {
  AssignmentEntity,
  AssignmentPeriodEntity,
} from './entities/subject-assignment.entity';
import { TenantEntity } from './entities/tenant.entity';
import { AcademicYearService } from './services/academic-year.service';
import { AcademyService } from './services/academy.service';
import { SchoolService } from './services/school.service';
import { SemesterService } from './services/semester.service';
import {
  AssignmentPeriodService,
  AssignmentService,
} from './services/subject-assignment.service';
import { TenantService } from './services/tenant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SchoolEntity,
      SemesterEntity,
      TenantEntity,
      AcademyEntity,
      AcademicYearEntity,
      AssignmentEntity,
      AssignmentPeriodEntity,
    ]),
    StudentsModule,
    StaffModule,
    TrackModule,
  ],
  providers: [
    SchoolService,
    SemesterService,
    TenantService,
    AcademyService,
    AcademicYearService,
    AssignmentService,
    AssignmentPeriodService,
  ],
  exports: [
    SchoolService,
    SemesterService,
    TenantService,
    AcademyService,
    StudentsModule,
    StaffModule,
    AcademicYearService,
    AssignmentService,
    AssignmentPeriodService,
    TrackModule,
  ],
})
export class SchoolModule {}
