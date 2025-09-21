import { Repository } from 'typeorm';
import { BaseService } from '../../../core';
import { StudentLPEnrollmentEntity } from '../entities/student-enrollment.entity';
export declare class StudentLPEnrollmentService extends BaseService<StudentLPEnrollmentEntity> {
    private readonly studentLPEnrollmentRepository;
    constructor(studentLPEnrollmentRepository: Repository<StudentLPEnrollmentEntity>);
    findAllWithCompletedCount(options: Parameters<typeof this.findAll>[0], relations: Parameters<typeof this.findAll>[1]): Promise<import("ecap-lib/dist/types").PaginatedResult<StudentLPEnrollmentEntity, any>>;
    getRepository(): Repository<StudentLPEnrollmentEntity>;
}
