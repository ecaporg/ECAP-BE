import { Repository } from 'typeorm';
import { BaseService } from 'src/core';
import { KeyEntity } from '../entities/key.entity';
import { TenantEntity } from '../entities/tenant.entity';
export declare class KeyService extends BaseService<KeyEntity> {
    private keyRepository;
    constructor(keyRepository: Repository<KeyEntity>);
    refreshSessionToken(tenant: TenantEntity, newSessionToken?: string): Promise<KeyEntity>;
}
