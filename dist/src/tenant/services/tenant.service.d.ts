import { Repository } from 'typeorm';
import { BaseService } from 'src/core';
import { TenantEntity } from '../entities/tenant.entity';
export declare class TenantService extends BaseService<TenantEntity> {
    private tenantRepository;
    constructor(tenantRepository: Repository<TenantEntity>);
}
