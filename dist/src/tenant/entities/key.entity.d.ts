import { DatedGenericEntity } from 'src/core';
import { TenantEntity } from './tenant.entity';
export declare class KeyEntity extends DatedGenericEntity {
    id: number;
    access_token: string;
    session_token: string;
    url: string;
    tenant: TenantEntity;
}
