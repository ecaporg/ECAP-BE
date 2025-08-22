import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../core';

import {
  SampleFlagCompletedEntity,
  SampleFlagErrorEntity,
  SampleFlagMissingWorkEntity,
  SampleFlagRejectedEntity,
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

@Injectable()
export class SampleFlagCompletedService extends BaseService<SampleFlagCompletedEntity> {
  constructor(
    @InjectRepository(SampleFlagCompletedEntity)
    private sampleFlagCompletedRepository: Repository<SampleFlagCompletedEntity>,
  ) {
    super(sampleFlagCompletedRepository);
  }
}

@Injectable()
export class SampleFlagRejectedService extends BaseService<SampleFlagRejectedEntity> {
  constructor(
    @InjectRepository(SampleFlagRejectedEntity)
    private sampleFlagRejectedRepository: Repository<SampleFlagRejectedEntity>,
  ) {
    super(sampleFlagRejectedRepository);
  }
}
