import { Repository } from 'typeorm';
import { BaseService } from 'src/core';
import { TrackLearningPeriodEntity } from '../entities/track-learning-period.entity';
export declare class TrackLearningPeriodService extends BaseService<TrackLearningPeriodEntity> {
    private trackLearningPeriodRepository;
    constructor(trackLearningPeriodRepository: Repository<TrackLearningPeriodEntity>);
    getRepository(): Repository<TrackLearningPeriodEntity>;
}
