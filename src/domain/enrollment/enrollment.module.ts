import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TenantModule } from '../tenant/tenant.module';
import { TrackModule } from '../track/track.module';

import { StudentLPEnrollmentEntity } from './entities/student-enrollment.entity';
import { StudentLPEnrollmentAssignmentEntity } from './entities/student-enrollment-assignment.entity';
import { TeacherEnrollmentEntity } from './entities/teacher-enrollment.entity';
import { StudentLPEnrollmentService } from './services/student-enrollment.service';
import { StudentLPEnrollmentAssignmentService } from './services/student-enrollment-assignment.service';
import { TeacherEnrollmentService } from './services/teacher-enrollment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeacherEnrollmentEntity,
      StudentLPEnrollmentEntity,
      StudentLPEnrollmentAssignmentEntity,
    ]),
    TenantModule,
    TrackModule,
  ],
  providers: [
    TeacherEnrollmentService,
    StudentLPEnrollmentService,
    StudentLPEnrollmentAssignmentService,
  ],
  exports: [
    TeacherEnrollmentService,
    StudentLPEnrollmentService,
    StudentLPEnrollmentAssignmentService,
  ],
})
export class EnrollmentModule {}
