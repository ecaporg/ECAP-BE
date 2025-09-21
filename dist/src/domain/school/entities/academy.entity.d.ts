import { IAcademy } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { TenantGenericEntity } from '../../../core';
import { DirectorEntity } from '../../staff/entities/staff.entity';
import { TenantEntity } from '../../tenant/entities/tenant.entity';
export declare class AcademyEntity extends TenantGenericEntity implements IAcademy {
    name: string;
    tenant: Relation<TenantEntity>;
    directors: Relation<DirectorEntity[]>;
}
