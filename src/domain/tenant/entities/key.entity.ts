import { IKey } from 'ecap-lib/dist/domain';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';

import { DatedGenericEntity } from '../../../core';

import { TenantEntity } from './tenant.entity';

@Entity({ name: 'keys' })
export class KeyEntity extends DatedGenericEntity implements IKey {
  @PrimaryColumn()
  id: number;

  @Column({ length: 512, nullable: true, default: null })
  access_token: string;

  @Column({ length: 1024, nullable: true, default: null })
  session_token: string;

  @Column({ length: 512, default: null })
  url: string;

  @OneToOne(() => TenantEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  tenant: Relation<TenantEntity>;
}
