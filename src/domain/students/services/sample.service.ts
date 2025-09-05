import { DeepPartial, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { extractPaginationOptions } from '../../../core';
import { BaseService } from '../../../core';
import { FlaggedSamplesFilterDto } from '../dto/filters.dto';
import {
  CreateSampleFlagCompletedDto,
  CreateSampleFlagErrorDto,
  CreateSampleFlagMissingWorkDto,
  CreateSampleFlagRejectedDto,
} from '../dto/sample.dto';
import {
  SampleEntity,
  SampleFlagCategory,
  SampleStatus,
} from '../entities/sample.entity';

import {
  SampleFlagCompletedService,
  SampleFlagErrorService,
  SampleFlagMissingWorkService,
  SampleFlagRejectedService,
} from './sample-flag.service';

@Injectable()
export class SampleService extends BaseService<SampleEntity> {
  constructor(
    @InjectRepository(SampleEntity)
    private sampleRepository: Repository<SampleEntity>,
    private sampleFlagErrorService: SampleFlagErrorService,
    private sampleFlagMissingWorkService: SampleFlagMissingWorkService,
    private sampleFlagRejectedService: SampleFlagRejectedService,
    private sampleFlagCompletedService: SampleFlagCompletedService,
  ) {
    super(sampleRepository, {
      defaultRelations: {
        student_lp_enrollment_assignment: {
          assignment: {
            course: true,
          },
          student_lp_enrollment: {
            learning_period: {
              track: true,
            },
            student: {
              user: true,
            },
          },
        },
        done_by: true,
        flag_errors: { user: true },
        flag_missing_work: { user: true },
        flag_rejected: { user: true },
        flag_completed: { user: true },
      },
    });
  }

  async updateSample(id: number, data: DeepPartial<SampleEntity>) {
    return this.sampleRepository.update(id, data);
  }

  async flagError(
    id: number,
    user_id: number,
    createDto: CreateSampleFlagErrorDto,
  ) {
    await this.update(id, {
      status: SampleStatus.FLAGGED_TO_ADMIN,
      flag_category: SampleFlagCategory.ERROR_IN_SAMPLE,
    });
    return this.sampleFlagErrorService.create({
      ...createDto,
      id,
      user_id,
    });
  }

  async flagMissingWork(
    id: number,
    user_id: number,
    createDto: CreateSampleFlagMissingWorkDto,
  ) {
    await this.update(id, {
      status: SampleStatus.FLAGGED_TO_ADMIN,
      flag_category: SampleFlagCategory.MISSING_SAMPLE,
    });
    return this.sampleFlagMissingWorkService.create({
      ...createDto,
      id,
      user_id,
    });
  }

  async flagRejected(
    id: number,
    user_id: number,
    createDto: CreateSampleFlagRejectedDto,
  ) {
    await this.update(id, {
      status: SampleStatus.REASON_REJECTED,
      flag_category: SampleFlagCategory.REASON_REJECTED,
    });
    return this.sampleFlagRejectedService.create({
      ...createDto,
      id,
      user_id,
    });
  }

  async flagCompleted(
    id: number,
    user_id: number,
    createDto: CreateSampleFlagCompletedDto,
  ) {
    return this.sampleFlagCompletedService.create({
      ...createDto,
      id,
      user_id,
    });
  }

  async getFlaggedSamples(options?: FlaggedSamplesFilterDto) {
    const paginationOptions = extractPaginationOptions(options);
    return this.findAll(paginationOptions);
  }

  async uploadToStudentPathway(id: number) {
    const sample = await this.findOneBy({ id });

    return sample;
  }
}
