import { GenericEntity } from 'src/core';
import { DirectorEntity } from 'src/staff/entities/staff.entity';
import { TenantEntity } from 'src/tenant/entities/tenant.entity';
export declare class AcademyEntity extends GenericEntity {
    name: string;
    tenant_id: number;
    tenant: TenantEntity;
    directors: DirectorEntity[];
}
