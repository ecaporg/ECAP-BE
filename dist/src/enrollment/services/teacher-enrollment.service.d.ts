import { Repository } from 'typeorm';
import { BaseService } from 'src/core';
import { TeacherSchoolYearEnrollmentEntity } from '../entities/teacher-enrollment.entity';
export declare class TeacherSchoolYearEnrollmentService extends BaseService<TeacherSchoolYearEnrollmentEntity> {
    private courseRepository;
    constructor(courseRepository: Repository<TeacherSchoolYearEnrollmentEntity>);
}
