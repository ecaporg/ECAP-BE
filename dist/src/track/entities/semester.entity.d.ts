import { GenericEntity } from 'src/core';
import { TrackEntity } from './track.entity';
export declare class SemesterEntity extends GenericEntity {
    track_id: number;
    name: string;
    start_date: Date;
    end_date: Date;
    track: TrackEntity;
}
