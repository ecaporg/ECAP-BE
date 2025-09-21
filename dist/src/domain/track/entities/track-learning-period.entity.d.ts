import { ITrackLearningPeriod } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { IDGenericEntity } from '../../../core';
import { StudentLPEnrollmentEntity } from '../../enrollment/entities/student-enrollment.entity';
import { TrackEntity } from './track.entity';
export declare class TrackLearningPeriodEntity extends IDGenericEntity implements ITrackLearningPeriod {
    track_id: number;
    name: string;
    start_date: Date;
    end_date: Date;
    track: Relation<TrackEntity>;
    student_lp_enrollments: Relation<StudentLPEnrollmentEntity[]>;
}
