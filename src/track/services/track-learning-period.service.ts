import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core';

import { TrackLearningPeriodEntity } from '../entities/track-learning-period.entity';

@Injectable()
export class TrackLearningPeriodService extends BaseService<TrackLearningPeriodEntity> {
  constructor(
    @InjectRepository(TrackLearningPeriodEntity)
    private trackLearningPeriodRepository: Repository<TrackLearningPeriodEntity>,
  ) {
    super(trackLearningPeriodRepository, {
      defaultRelations: ['track'],
    });
  }

  getRepository(): Repository<TrackLearningPeriodEntity> {
    return this.trackLearningPeriodRepository;
  }
}
