import { Repository } from 'typeorm';
import { BaseService } from '../../../core';
import { SemesterEntity } from '../../track/entities/semester.entity';
export declare class SemesterService extends BaseService<SemesterEntity> {
    private semesterRepository;
    constructor(semesterRepository: Repository<SemesterEntity>);
}
