import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StaffModule } from '../staff/staff.module';

import { AssignmentEntity } from './entities/assignment.entity';
import { CourseEntity } from './entities/course.entity';
import { SubjectEntity } from './entities/subject.entity';
import { SubjectService } from './services/subject.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubjectEntity, CourseEntity, AssignmentEntity]),
    StaffModule,
  ],
  controllers: [],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
