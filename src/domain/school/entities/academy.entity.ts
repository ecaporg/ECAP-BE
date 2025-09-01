import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '../../../core';
import { DirectorEntity } from '../../staff/entities/staff.entity';
import { TenantEntity } from '../../tenant/entities/tenant.entity';

@Entity({ name: 'academies' })
export class AcademyEntity extends GenericEntity {
  @ApiProperty({ description: 'Academy name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({
    description: 'Tenant id associated with this academy',
  })
  @Column()
  tenant_id: number;

  @ApiProperty({
    description: 'Tenant associated with this academy',
    type: () => TenantEntity,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.academies, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;

  @ApiProperty({
    description: 'Directors associated with this academy',
    type: () => [{}],
  })
  @OneToMany(() => DirectorEntity, (director) => director.academy)
  directors: DirectorEntity[];
}
