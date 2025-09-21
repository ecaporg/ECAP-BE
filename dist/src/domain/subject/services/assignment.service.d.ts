import { Repository } from 'typeorm';
import { BaseService } from '../../../core';
import { AssignmentEntity } from '../entities/assignment.entity';
export declare class CourseAssignmentService extends BaseService<AssignmentEntity> {
    private assignmentRepository;
    constructor(assignmentRepository: Repository<AssignmentEntity>);
}
