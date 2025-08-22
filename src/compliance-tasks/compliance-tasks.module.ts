import { Module } from '@nestjs/common';

import { SchoolModule } from '../school/school.module';

import { AdminComplianceController } from './controllers/admin.controller';
import { TeacherComplianceTaskController } from './controllers/teacher.controller';
import { TeacherFilterInterceptor } from './interceptors/teacher-filter.interceptor';
import { AdminComplianceService } from './services/admin.service';
import { TeacherComplianceTaskService } from './services/teacher.service';

@Module({
  imports: [SchoolModule],
  controllers: [TeacherComplianceTaskController, AdminComplianceController],
  providers: [
    TeacherComplianceTaskService,
    AdminComplianceService,
    TeacherFilterInterceptor,
  ],
  exports: [TeacherComplianceTaskService, AdminComplianceService],
})
export class ComplianceTasksModule {}
