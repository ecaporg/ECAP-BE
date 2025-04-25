import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SampleController } from './controllers/sample.controller';
import { SampleEntity } from './entities/sample.entity';
import {
  SampleFlagCompletedEntity,
  SampleFlagErrorEntity,
  SampleFlagMissingWorkEntity,
} from './entities/sample-flag.entity';
import { StudentEntity } from './entities/student.entity';
import { SampleService } from './services/sample.service';
import {
  SampleFlagCompletedService,
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
      SampleFlagCompletedEntity,
    ]),
  ],
  controllers: [SampleController],
  providers: [
    StudentService,
    SampleService,
    SampleFlagErrorService,
    SampleFlagMissingWorkService,
    SampleFlagCompletedService,
  ],
  exports: [
    StudentService,
    SampleService,
    SampleFlagErrorService,
    SampleFlagMissingWorkService,
    SampleFlagCompletedService,
  ],
})
export class StudentsModule {}
