import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseModule } from '@/course/course.module';
import { StaffModule } from '@/staff/staff.module';
import { StudentsModule } from '@/students/students.module';
import { TenantModule } from '@/tenant/tenant.module';
import { TrackModule } from '@/track/track.module';

import { AcademyController } from './controllers/academy.controller';
import { SchoolController } from './controllers/school.controller';
import { AcademyEntity } from './entities/academy.entity';
import { AssignmentPeriodEntity } from './entities/assignment.entity';
import { SchoolEntity } from './entities/school.entity';
import { AcademyService } from './services/academy.service';
import { AssignmentPeriodService } from './services/assignment.service';
import { SchoolService } from './services/school.service';

@Module({
  controllers: [SchoolController, AcademyController],
  imports: [
    TypeOrmModule.forFeature([
      SchoolEntity,
      AcademyEntity,
      AssignmentPeriodEntity,
    ]),
    StudentsModule,
    StaffModule,
    TrackModule,
    TenantModule,
    CourseModule,
  ],
  providers: [SchoolService, AcademyService, AssignmentPeriodService],
  exports: [
    SchoolService,
    AcademyService,
    StudentsModule,
    StaffModule,
    AssignmentPeriodService,
    TrackModule,
    TenantModule,
    CourseModule,
  ],
})
export class SchoolModule {}
