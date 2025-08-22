import { EntityId, PaginatedResult } from 'src/core';
import { TrackLearningPeriodFilterDto } from '../dto/filters.dto';
import { CreateTrackLearningPeriodDto, UpdateTrackLearningPeriodDto } from '../dto/track-learning-period.dto';
import { TrackLearningPeriodEntity } from '../entities/track-learning-period.entity';
import { TrackLearningPeriodService } from '../services/track-learning-period.service';
export declare class TrackLearningPeriodController {
    private readonly trackLearningPeriodService;
    constructor(trackLearningPeriodService: TrackLearningPeriodService);
    findAll(options?: TrackLearningPeriodFilterDto): Promise<PaginatedResult<TrackLearningPeriodEntity>>;
    findOne(id: EntityId): Promise<TrackLearningPeriodEntity>;
    create(createTrackLearningPeriodDto: CreateTrackLearningPeriodDto): Promise<TrackLearningPeriodEntity>;
    patch(id: EntityId, updateTrackLearningPeriodDto: UpdateTrackLearningPeriodDto): Promise<TrackLearningPeriodEntity>;
    put(id: EntityId, updateTrackLearningPeriodDto: UpdateTrackLearningPeriodDto): Promise<TrackLearningPeriodEntity>;
    delete(id: EntityId): Promise<void>;
}
