import { Repository } from 'typeorm';
import { BaseService } from 'src/core';
import { StudentLPEnrollmentEntity } from '../entities/student-enrollment.entity';
export declare class StudentLPEnrollmentService extends BaseService<StudentLPEnrollmentEntity> {
    private readonly studentLPEnrollmentRepository;
    constructor(studentLPEnrollmentRepository: Repository<StudentLPEnrollmentEntity>);
    findAllWithCompletedCount(options: Parameters<typeof this.findAll>[0], relations: Parameters<typeof this.findAll>[1]): Promise<import("src/core").PaginatedResult<StudentLPEnrollmentEntity, any>>;
    getRepository(): Repository<StudentLPEnrollmentEntity>;
}
