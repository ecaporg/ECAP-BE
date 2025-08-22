import { GenericEntity } from 'src/core';
import { TeacherSchoolYearEnrollmentEntity } from 'src/enrollment/entities/teacher-enrollment.entity';
import { SampleEntity } from 'src/students/entities/sample.entity';
import { StudentEntity } from 'src/students/entities/student.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { TrackLearningPeriodEntity } from 'src/track/entities/track-learning-period.entity';
export declare class StudentLPEnrollmentEntity extends GenericEntity {
    teacher_school_year_enrollment_id: number;
    student_id: number;
    student_grade: string;
    learning_period_id: number;
    completed: boolean;
    percentage: number;
    track_id: number;
    track: TrackEntity;
    learning_period: TrackLearningPeriodEntity;
    teacher_school_year_enrollment: TeacherSchoolYearEnrollmentEntity;
    student: StudentEntity;
    samples: SampleEntity[];
}
