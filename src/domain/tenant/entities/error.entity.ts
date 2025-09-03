import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '../../../core';

import { TenantEntity } from './tenant.entity';

interface IErrorEntity {
  message: string;

  tenant: Relation<TenantEntity>;
  tenant_id: number;
}

@Entity({ name: 'errors' })
export class ErrorEntity extends GenericEntity implements IErrorEntity {
  @ApiProperty({
    description: 'Error message',
    type: 'string',
  })
  @Column({ type: 'text' })
  message: string;

  @ApiProperty({
    description: 'Tenant ID this error belongs to',
  })
  @Column()
  tenant_id: number;

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
