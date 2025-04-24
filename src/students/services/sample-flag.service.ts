import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core/services/base.service';

import {
  SampleFlagErrorEntity,
  SampleFlagMissingWorkEntity,
} from '../entities/sample-flag.entity';

@Injectable()
export class SampleFlagErrorService extends BaseService<SampleFlagErrorEntity> {
  constructor(
    @InjectRepository(SampleFlagErrorEntity)
    private sampleFlagErrorRepository: Repository<SampleFlagErrorEntity>,
  ) {
    super(sampleFlagErrorRepository);
  }
}

@Injectable()
export class SampleFlagMissingWorkService extends BaseService<SampleFlagMissingWorkEntity> {
  constructor(
    @InjectRepository(SampleFlagMissingWorkEntity)
    private sampleFlagMissingWorkRepository: Repository<SampleFlagMissingWorkEntity>,
  ) {
    super(sampleFlagMissingWorkRepository);
  }
}
