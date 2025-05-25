import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { DatedGenericEntity } from '@/core';

import { TenantEntity } from './tenant.entity';

@Entity({ name: 'keys' })
export class KeyEntity extends DatedGenericEntity {
  @PrimaryColumn()
  id: number;

  @Column({ length: 512, nullable: true, default: null })
  access_token: string;

  @Column({ length: 512, nullable: true, default: null })
  session_token: string;

  @Column({ length: 512, default: null })
  url: string;

  @OneToOne(() => TenantEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  tenant: TenantEntity;
}
