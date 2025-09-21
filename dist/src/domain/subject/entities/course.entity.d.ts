import { ICourse } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { IDCanvasGenericEntity } from '../../../core';
import { TenantEntity } from '../../tenant/entities/tenant.entity';
import { AssignmentEntity } from './assignment.entity';
export declare class CourseEntity extends IDCanvasGenericEntity implements ICourse {
    name: string;
    assignments: Relation<AssignmentEntity[]>;
    tenant_id: number;
    tenant: Relation<TenantEntity>;
}
