import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core/generic-entity';

import { TenantEntity } from './tenant.entity';

@Entity({ name: 'academies' })
export class AcademyEntity extends GenericEntity {
  @ApiProperty({ description: 'Academy name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({
    description: 'Tenant associated with this academy',
    type: () => TenantEntity,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.academies)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;
}
