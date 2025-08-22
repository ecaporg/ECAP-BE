import { Repository } from 'typeorm';
import { BaseService } from 'src/core';
import { SampleFlagCompletedEntity, SampleFlagErrorEntity, SampleFlagMissingWorkEntity, SampleFlagRejectedEntity } from '../entities/sample-flag.entity';
export declare class SampleFlagErrorService extends BaseService<SampleFlagErrorEntity> {
    private sampleFlagErrorRepository;
    constructor(sampleFlagErrorRepository: Repository<SampleFlagErrorEntity>);
}
export declare class SampleFlagMissingWorkService extends BaseService<SampleFlagMissingWorkEntity> {
    private sampleFlagMissingWorkRepository;
    constructor(sampleFlagMissingWorkRepository: Repository<SampleFlagMissingWorkEntity>);
}
export declare class SampleFlagCompletedService extends BaseService<SampleFlagCompletedEntity> {
    private sampleFlagCompletedRepository;
    constructor(sampleFlagCompletedRepository: Repository<SampleFlagCompletedEntity>);
}
export declare class SampleFlagRejectedService extends BaseService<SampleFlagRejectedEntity> {
    private sampleFlagRejectedRepository;
    constructor(sampleFlagRejectedRepository: Repository<SampleFlagRejectedEntity>);
}
