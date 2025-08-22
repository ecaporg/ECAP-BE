import { TrackLearningPeriodEntity } from '../entities/track-learning-period.entity';
interface TrackLearningPeriod extends TrackLearningPeriodEntity {
}
export declare class CreateTrackLearningPeriodDto implements Pick<TrackLearningPeriod, 'track_id' | 'start_date' | 'end_date' | 'name'> {
    name: string;
    track_id: number;
    start_date: Date;
    end_date: Date;
}
declare const UpdateTrackLearningPeriodDto_base: import("@nestjs/common").Type<Partial<CreateTrackLearningPeriodDto>>;
export declare class UpdateTrackLearningPeriodDto extends UpdateTrackLearningPeriodDto_base {
}
export {};
