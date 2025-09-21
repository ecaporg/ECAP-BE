import { EntityId, PaginatedResult, PaginationOptions } from '../../../core';
import { UserEntity } from '../../../auth/entities/user.entity';
import { FlaggedSamplesFilterDto } from '../dto/filters.dto';
import { CreateSampleDto, CreateSampleFlagCompletedDto, CreateSampleFlagErrorDto, CreateSampleFlagMissingWorkDto, CreateSampleFlagRejectedDto, UpdateSampleDto } from '../dto/sample.dto';
import { SampleEntity } from '../entities/sample.entity';
import { SampleFlagCompletedEntity, SampleFlagErrorEntity, SampleFlagMissingWorkEntity, SampleFlagRejectedEntity } from '../entities/sample-flag.entity';
import { SampleService } from '../services/sample.service';
export declare class SampleController {
    private readonly sampleService;
    constructor(sampleService: SampleService);
    findAll(options?: PaginationOptions): Promise<PaginatedResult<SampleEntity>>;
    getFlaggedSamples(options?: FlaggedSamplesFilterDto): Promise<PaginatedResult<SampleEntity, any>>;
    findOne(id: EntityId): Promise<SampleEntity>;
    create(createDto: CreateSampleDto): Promise<SampleEntity>;
    update(id: EntityId, updateDto: UpdateSampleDto): Promise<SampleEntity>;
    delete(id: EntityId): Promise<void>;
    flagError(user_id: UserEntity['id'], id: SampleFlagErrorEntity['id'], createDto: CreateSampleFlagErrorDto): Promise<SampleFlagErrorEntity>;
    flagMissingWork(user_id: UserEntity['id'], id: SampleFlagMissingWorkEntity['id'], createDto: CreateSampleFlagMissingWorkDto): Promise<SampleFlagMissingWorkEntity>;
    flagRejected(user_id: UserEntity['id'], id: SampleFlagRejectedEntity['id'], createDto: CreateSampleFlagRejectedDto): Promise<SampleFlagRejectedEntity>;
    flagCompleted(user_id: UserEntity['id'], id: SampleFlagCompletedEntity['id'], createDto: CreateSampleFlagCompletedDto): Promise<SampleFlagCompletedEntity>;
}
