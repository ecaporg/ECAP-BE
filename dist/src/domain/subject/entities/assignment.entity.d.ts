import { IAssignment } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { IDCanvasGenericEntity } from '../../../core';
import { StudentLPEnrollmentAssignmentEntity } from '../../enrollment/entities/student-enrollment-assignment.entity';
import { CourseEntity } from './course.entity';
export declare class AssignmentEntity extends IDCanvasGenericEntity implements IAssignment {
    course_id: number;
    name: string;
    due_at: Date;
    course: Relation<CourseEntity>;
    enrollmentAssignments: Relation<StudentLPEnrollmentAssignmentEntity[]>;
}
