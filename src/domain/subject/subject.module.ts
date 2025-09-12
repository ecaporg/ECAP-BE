import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StaffModule } from '../staff/staff.module';

import { AssignmentEntity } from './entities/assignment.entity';
import { CourseEntity } from './entities/course.entity';
import { CourseAssignmentService } from './services/assignment.service';
import { CourseService } from './services/course.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity, AssignmentEntity]),
    StaffModule,
  ],
  controllers: [],
  providers: [CourseService, CourseAssignmentService],
  exports: [CourseService, CourseAssignmentService],
})
export class SubjectModule {}
