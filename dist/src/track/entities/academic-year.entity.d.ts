import { GenericEntity } from 'src/core';
import { TeacherSchoolYearEnrollmentEntity } from 'src/enrollment/entities/teacher-enrollment.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
export declare class AcademicYearEntity extends GenericEntity {
    from: number;
    to: number;
    tracks: TrackEntity[];
    teacher_school_year_enrollments: TeacherSchoolYearEnrollmentEntity[];
}
