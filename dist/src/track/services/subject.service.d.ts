import { Repository } from 'typeorm';
import { BaseService } from 'src/core';
import { SubjectEntity } from '../entities/subject.entity';
export declare class SubjectService extends BaseService<SubjectEntity> {
    private subjectRepository;
    constructor(subjectRepository: Repository<SubjectEntity>);
    findByTrackId(trackId: number): Promise<SubjectEntity[]>;
}
