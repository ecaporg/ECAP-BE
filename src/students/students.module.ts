import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SampleController } from './controllers/sample.controller';
import { SampleEntity } from './entities/sample.entity';
import {
  SampleFlagCompletedEntity,
  SampleFlagErrorEntity,
  SampleFlagMissingWorkEntity,
  SampleFlagRejectedEntity,
} from './entities/sample-flag.entity';
import { StudentEntity } from './entities/student.entity';
import { SampleService } from './services/sample.service';
import {
  SampleFlagCompletedService,
  SampleFlagErrorService,
  SampleFlagMissingWorkService,
  SampleFlagRejectedService,
} from './services/sample-flag.service';
import { StudentService } from './services/student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentEntity,
      SampleEntity,
      SampleFlagErrorEntity,
      SampleFlagMissingWorkEntity,
      SampleFlagRejectedEntity,
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
    SampleFlagRejectedService,
  ],
  exports: [
    StudentService,
    SampleService,
    SampleFlagErrorService,
    SampleFlagMissingWorkService,
    SampleFlagCompletedService,
    SampleFlagRejectedService,
  ],
})
export class StudentsModule {}
