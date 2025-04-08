import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SchoolModule } from '../school/school.module';

import { SampleEntity } from './entities/sample.entity';
import { StudentEntity } from './entities/student.entity';
import { SampleService } from './services/sample.service';
import { StudentService } from './services/student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity, SampleEntity]),
    SchoolModule,
  ],
  providers: [StudentService, SampleService],
  exports: [StudentService, SampleService],
})
export class StudentsModule {}
