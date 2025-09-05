import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { TenantGenericEntity } from '../../../core';

import { TenantEntity } from './tenant.entity';

interface IErrorEntity {
  message: string;

  tenant: Relation<TenantEntity>;
  tenant_id: number;
}

@Entity({ name: 'errors' })
export class ErrorEntity extends TenantGenericEntity implements IErrorEntity {
  @ApiProperty({
    description: 'Error message',
    type: 'string',
  })
  @Column({ type: 'text' })
  message: string;

  @ApiProperty({
    description: 'Tenant this error belongs to',
    type: () => TenantEntity,
  })
  @ManyToOne(() => TenantEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Relation<TenantEntity>;
}
