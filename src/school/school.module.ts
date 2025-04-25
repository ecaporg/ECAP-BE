import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseModule } from '@/course/course.module';
import { StaffModule } from '@/staff/staff.module';
import { StudentsModule } from '@/students/students.module';
import { TenantModule } from '@/tenant/tenant.module';
import { TrackModule } from '@/track/track.module';

import { AcademicYearEntity } from './entities/academic-year.entity';
import { AcademyEntity } from './entities/academy.entity';
import { AssignmentPeriodEntity } from './entities/assignment.entity';
import { SchoolEntity } from './entities/school.entity';
import { SemesterEntity } from './entities/semester.entity';
import { AcademicYearService } from './services/academic-year.service';
import { AcademyService } from './services/academy.service';
import { SchoolService } from './services/school.service';
import { SemesterService } from './services/semester.service';
import { AssignmentPeriodService } from './services/subject-assignment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SchoolEntity,
      SemesterEntity,
      AcademyEntity,
      AcademicYearEntity,
      AssignmentPeriodEntity,
    ]),
    StudentsModule,
    StaffModule,
    TrackModule,
    TenantModule,
    CourseModule,
  ],
  providers: [
    SchoolService,
    SemesterService,
    AcademyService,
    AcademicYearService,
    AssignmentPeriodService,
  ],
  exports: [
    SchoolService,
    SemesterService,
    AcademyService,
    StudentsModule,
    StaffModule,
    AcademicYearService,
    AssignmentPeriodService,
    TrackModule,
    TenantModule,
    CourseModule,
  ],
})
export class SchoolModule {}
