import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SampleEntity } from './entities/sample.entity';
import { StudentEntity } from './entities/student.entity';
import { SampleService } from './services/sample.service';
import { StudentService } from './services/student.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity, SampleEntity])],
  providers: [StudentService, SampleService],
  exports: [StudentService, SampleService],
})
export class StudentsModule {}
