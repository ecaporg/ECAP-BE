import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TenantModule } from 'src/tenant/tenant.module';
import { TrackModule } from 'src/track/track.module';

import { StudentLPEnrollmentEntity } from './entities/student-enrollment.entity';
import { TeacherSchoolYearEnrollmentEntity } from './entities/teacher-enrollment.entity';
import { StudentLPEnrollmentService } from './services/student-enrollment.service';
import { TeacherSchoolYearEnrollmentService } from './services/teacher-enrollment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeacherSchoolYearEnrollmentEntity,
      StudentLPEnrollmentEntity,
    ]),
    TenantModule,
    TrackModule,
  ],
  providers: [TeacherSchoolYearEnrollmentService, StudentLPEnrollmentService],
  exports: [TeacherSchoolYearEnrollmentService, StudentLPEnrollmentService],
})
export class EnrollmentModule {}
