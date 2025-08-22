import { GenericEntity } from 'src/core';
import { TenantEntity } from './tenant.entity';
export declare class ErrorEntity extends GenericEntity {
    message: string;
    tenant_id: number;
    tenant: TenantEntity;
}
