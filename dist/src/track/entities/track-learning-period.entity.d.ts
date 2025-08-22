import { GenericEntity } from 'src/core';
import { StudentLPEnrollmentEntity } from 'src/enrollment/entities/student-enrollment.entity';
import { TrackEntity } from './track.entity';
export declare class TrackLearningPeriodEntity extends GenericEntity {
    track_id: number;
    name: string;
    start_date: Date;
    end_date: Date;
    track: TrackEntity;
    student_lp_enrollments: StudentLPEnrollmentEntity[];
}
