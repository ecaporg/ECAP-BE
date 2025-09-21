import { IKey } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { DatedGenericEntity } from '../../../core';
import { TenantEntity } from './tenant.entity';
export declare class KeyEntity extends DatedGenericEntity implements IKey {
    id: number;
    access_token: string;
    session_token: string;
    url: string;
    tenant: Relation<TenantEntity>;
}
