import { ISchool } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { TenantGenericEntity } from '../../../core';
import { StudentEntity } from '../../students/entities/student.entity';
import { TenantEntity } from '../../tenant/entities/tenant.entity';
export declare class SchoolEntity extends TenantGenericEntity implements ISchool {
    name: string;
    tenant: Relation<TenantEntity>;
    students: Relation<StudentEntity[]>;
}
