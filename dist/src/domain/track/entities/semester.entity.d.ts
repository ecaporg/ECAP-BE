import { ISemester } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { IDGenericEntity } from '../../../core';
import { TrackEntity } from './track.entity';
export declare class SemesterEntity extends IDGenericEntity implements ISemester {
    track_id: number;
    name: string;
    start_date: Date;
    end_date: Date;
    track: Relation<TrackEntity>;
}
