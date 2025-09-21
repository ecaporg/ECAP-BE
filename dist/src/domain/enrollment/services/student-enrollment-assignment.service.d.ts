import { Repository } from 'typeorm';
import { BaseService } from '../../../core';
import { StudentLPEnrollmentAssignmentEntity } from '../entities/student-enrollment-assignment.entity';
export declare class StudentLPEnrollmentAssignmentService extends BaseService<StudentLPEnrollmentAssignmentEntity, 'assignment_id' | 'student_lp_enrollment_id'> {
    private readonly studentLPEnrollmentAssignmentRepository;
    constructor(studentLPEnrollmentAssignmentRepository: Repository<StudentLPEnrollmentAssignmentEntity>);
    getRepository(): Repository<StudentLPEnrollmentAssignmentEntity>;
}
