import { IStudentLPEnrollment } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { IDGenericEntity } from '../../../core';
import { TeacherEnrollmentEntity } from '../../enrollment/entities/teacher-enrollment.entity';
import { StudentEntity } from '../../students/entities/student.entity';
import { TrackLearningPeriodEntity } from '../../track/entities/track-learning-period.entity';
import { StudentLPEnrollmentAssignmentEntity } from './student-enrollment-assignment.entity';
export declare class StudentLPEnrollmentEntity extends IDGenericEntity implements IStudentLPEnrollment {
    student_id: number;
    student_grade: string;
    learning_period_id: number;
    completed: boolean;
    percentage: number;
    learning_period: Relation<TrackLearningPeriodEntity>;
    teacher_enrollments: Relation<TeacherEnrollmentEntity[]>;
    student: Relation<StudentEntity>;
    assignments: Relation<StudentLPEnrollmentAssignmentEntity[]>;
}
