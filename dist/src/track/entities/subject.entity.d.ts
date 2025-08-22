import { GenericEntity } from 'src/core';
import { SampleEntity } from 'src/students/entities/sample.entity';
import { TrackEntity } from './track.entity';
export declare class SubjectEntity extends GenericEntity {
    track_id: number;
    canvas_course_id?: string;
    canvas_additional_info?: Record<string, any>;
    name: string;
    track: TrackEntity;
    samples: SampleEntity[];
}
