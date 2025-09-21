import { Repository } from 'typeorm';
import { BaseService } from '../../../core';
import { TeacherEnrollmentEntity } from '../entities/teacher-enrollment.entity';
export declare class TeacherEnrollmentService extends BaseService<TeacherEnrollmentEntity> {
    private courseRepository;
    constructor(courseRepository: Repository<TeacherEnrollmentEntity>);
}
