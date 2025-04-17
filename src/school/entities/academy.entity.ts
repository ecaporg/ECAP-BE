import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';

import { TenantEntity } from './tenant.entity';

@Entity({ name: 'academies' })
export class AcademyEntity extends GenericEntity {
  @Column({ length: 250 })
  name: string;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.academies)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;
}
