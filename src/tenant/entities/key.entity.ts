import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { DatedGenericEntity } from '@/core';

import { TenantEntity } from './tenant.entity';

@Entity({ name: 'developer_keys' })
export class KeyEntity extends DatedGenericEntity {
  @Column({ length: 255 })
  key: string;

  @PrimaryColumn()
  id: number;

  @OneToOne(() => TenantEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  tenant: TenantEntity;
}
