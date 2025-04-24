import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SampleController } from './controllers/sample.controller';
import { SampleEntity } from './entities/sample.entity';
import {
  SampleFlagErrorEntity,
  SampleFlagMissingWorkEntity,
} from './entities/sample-flag.entity';
import { StudentEntity } from './entities/student.entity';
import { SampleService } from './services/sample.service';
import {
  SampleFlagErrorService,
  SampleFlagMissingWorkService,
} from './services/sample-flag.service';
import { StudentService } from './services/student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentEntity,
      SampleEntity,
      SampleFlagErrorEntity,
      SampleFlagMissingWorkEntity,
    ]),
  ],
  controllers: [SampleController],
  providers: [
    StudentService,
    SampleService,
    SampleFlagErrorService,
    SampleFlagMissingWorkService,
  ],
  exports: [
    StudentService,
    SampleService,
    SampleFlagErrorService,
    SampleFlagMissingWorkService,
  ],
})
export class StudentsModule {}
