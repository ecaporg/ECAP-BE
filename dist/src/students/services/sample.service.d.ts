import { DeepPartial, Repository } from 'typeorm';
import { BaseService } from 'src/core';
import { FlaggedSamplesFilterDto } from '../dto/filters.dto';
import { CreateSampleFlagCompletedDto, CreateSampleFlagErrorDto, CreateSampleFlagMissingWorkDto, CreateSampleFlagRejectedDto } from '../dto/sample.dto';
import { SampleEntity } from '../entities/sample.entity';
import { SampleFlagCompletedService, SampleFlagErrorService, SampleFlagMissingWorkService, SampleFlagRejectedService } from './sample-flag.service';
export declare class SampleService extends BaseService<SampleEntity> {
    private sampleRepository;
    private sampleFlagErrorService;
    private sampleFlagMissingWorkService;
    private sampleFlagRejectedService;
    private sampleFlagCompletedService;
    constructor(sampleRepository: Repository<SampleEntity>, sampleFlagErrorService: SampleFlagErrorService, sampleFlagMissingWorkService: SampleFlagMissingWorkService, sampleFlagRejectedService: SampleFlagRejectedService, sampleFlagCompletedService: SampleFlagCompletedService);
    updateSample(id: number, data: DeepPartial<SampleEntity>): Promise<import("typeorm").UpdateResult>;
    flagError(id: number, user_id: number, createDto: CreateSampleFlagErrorDto): Promise<import("../entities/sample-flag.entity").SampleFlagErrorEntity>;
    flagMissingWork(id: number, user_id: number, createDto: CreateSampleFlagMissingWorkDto): Promise<import("../entities/sample-flag.entity").SampleFlagMissingWorkEntity>;
    flagRejected(id: number, user_id: number, createDto: CreateSampleFlagRejectedDto): Promise<import("../entities/sample-flag.entity").SampleFlagRejectedEntity>;
    flagCompleted(id: number, user_id: number, createDto: CreateSampleFlagCompletedDto): Promise<import("../entities/sample-flag.entity").SampleFlagCompletedEntity>;
    getFlaggedSamples(options?: FlaggedSamplesFilterDto): Promise<import("src/core").PaginatedResult<SampleEntity, any>>;
    uploadToStudentPathway(id: number): Promise<SampleEntity>;
}
