import { IStudentLPEnrollmentAssignment } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { AssignmentEntity } from '../../../domain/subject/entities/assignment.entity';
import { SampleEntity } from '../../students/entities/sample.entity';
import { StudentLPEnrollmentEntity } from './student-enrollment.entity';
export declare class StudentLPEnrollmentAssignmentEntity implements IStudentLPEnrollmentAssignment {
    id: string;
    student_lp_enrollment_id: number;
    assignment_id: number;
    sample_id?: number;
    assignment: Relation<AssignmentEntity>;
    sample: Relation<SampleEntity>;
    student_lp_enrollment: Relation<StudentLPEnrollmentEntity>;
}
