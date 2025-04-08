import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../core/services/base.service';
import { TrackLearningPeriodEntity } from '../entities/track-learning-period.entity';

@Injectable()
export class TrackLearningPeriodService extends BaseService<TrackLearningPeriodEntity> {
  constructor(
    @InjectRepository(TrackLearningPeriodEntity)
    private trackLearningPeriodRepository: Repository<TrackLearningPeriodEntity>,
  ) {
    super(trackLearningPeriodRepository);
  }

  async findByTrackId(trackId: number): Promise<TrackLearningPeriodEntity[]> {
    return this.repository.find({
      where: { track_id: trackId },
      relations: ['track'],
    });
  }
}
