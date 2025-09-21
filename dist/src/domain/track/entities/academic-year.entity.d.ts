import { IAcademicYear } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { IDGenericEntity } from '../../../core';
import { TeacherEnrollmentEntity } from '../../enrollment/entities/teacher-enrollment.entity';
import { TrackEntity } from '../../track/entities/track.entity';
export declare class AcademicYearEntity extends IDGenericEntity implements IAcademicYear {
    from: number;
    to: number;
    tracks: Relation<TrackEntity[]>;
    teacher_enrollments: Relation<TeacherEnrollmentEntity[]>;
}
