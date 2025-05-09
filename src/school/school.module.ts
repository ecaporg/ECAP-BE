import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseModule } from '@/course/course.module';
import { AdminService } from '@/staff/services/staff.service';
import { StaffModule } from '@/staff/staff.module';
import { StudentsModule } from '@/students/students.module';
import { TenantModule } from '@/tenant/tenant.module';
import { TrackModule } from '@/track/track.module';

import { SchoolController } from './controllers/school.controller';
import { AcademicYearEntity } from './entities/academic-year.entity';
import { AcademyEntity } from './entities/academy.entity';
import { AssignmentPeriodEntity } from './entities/assignment.entity';
import { SchoolEntity } from './entities/school.entity';
import { SemesterEntity } from './entities/semester.entity';
import { AcademicYearService } from './services/academic-year.service';
import { AcademyService } from './services/academy.service';
import { AssignmentPeriodService } from './services/assignment.service';
import { SchoolService } from './services/school.service';
import { SemesterService } from './services/semester.service';

@Module({
  controllers: [SchoolController],
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
