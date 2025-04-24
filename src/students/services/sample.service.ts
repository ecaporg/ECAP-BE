import { DeepPartial, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core/services/base.service';

import {
  CreateSampleFlagErrorDto,
  CreateSampleFlagMissingWorkDto,
} from '../dto/sample.dto';
import { SampleEntity, SampleStatus } from '../entities/sample.entity';

import {
  SampleFlagErrorService,
  SampleFlagMissingWorkService,
} from './sample-flag.service';

@Injectable()
export class SampleService extends BaseService<SampleEntity> {
  constructor(
    @InjectRepository(SampleEntity)
    private sampleRepository: Repository<SampleEntity>,
    private sampleFlagErrorService: SampleFlagErrorService,
    private sampleFlagMissingWorkService: SampleFlagMissingWorkService,
  ) {
    super(sampleRepository);
  }

  async updateSample(id: number, data: DeepPartial<SampleEntity>) {
    if (data.status && data.status !== SampleStatus.FLAGGED_TO_ADMIN) {
      await this.sampleFlagErrorService.delete(id).catch(() => {});
      await this.sampleFlagMissingWorkService.delete(id).catch(() => {});
    }
    return this.sampleRepository.update(id, data);
  }

  async flagError(
    id: number,
    user_id: number,
    createDto: CreateSampleFlagErrorDto,
  ) {
    await this.update(id, {
      status: SampleStatus.FLAGGED_TO_ADMIN,
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
    });
    return this.sampleFlagMissingWorkService.create({
      ...createDto,
      id,
      user_id,
    });
  }
}
