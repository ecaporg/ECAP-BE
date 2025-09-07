import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TenantModule } from '../tenant/tenant.module';
import { TrackModule } from '../track/track.module';

import { StudentLPEnrollmentEntity } from './entities/student-enrollment.entity';
import { StudentLPEnrollmentAssignmentEntity } from './entities/student-enrollment-assignment.entity';
import { TeacherSchoolYearEnrollmentEntity } from './entities/teacher-enrollment.entity';
import { StudentLPEnrollmentService } from './services/student-enrollment.service';
import { StudentLPEnrollmentAssignmentService } from './services/student-enrollment-assignment.service';
import { TeacherSchoolYearEnrollmentService } from './services/teacher-enrollment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeacherSchoolYearEnrollmentEntity,
      StudentLPEnrollmentEntity,
      StudentLPEnrollmentAssignmentEntity,
    ]),
    TenantModule,
    TrackModule,
  ],
  providers: [
    TeacherSchoolYearEnrollmentService,
    StudentLPEnrollmentService,
    StudentLPEnrollmentAssignmentService,
  ],
  exports: [
    TeacherSchoolYearEnrollmentService,
    StudentLPEnrollmentService,
    StudentLPEnrollmentAssignmentService,
  ],
})
export class EnrollmentModule {}
