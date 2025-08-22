import { AttachUserIdInterceptor } from 'src/core';
import { TenantEntity } from '../entities/tenant.entity';
export declare class TenantKeyFilterInterceptor extends AttachUserIdInterceptor<TenantEntity> {
    constructor();
}
