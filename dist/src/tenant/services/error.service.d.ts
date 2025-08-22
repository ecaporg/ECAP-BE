import { Repository } from 'typeorm';
import { BaseService } from 'src/core';
import { ErrorEntity } from '../entities/error.entity';
export declare class ErrorService extends BaseService<ErrorEntity> {
    private errorRepository;
    constructor(errorRepository: Repository<ErrorEntity>);
}
