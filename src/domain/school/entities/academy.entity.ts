import { IAcademy } from 'ecap-lib/dist/domain';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { TenantGenericEntity } from '../../../core';
import { DirectorEntity } from '../../staff/entities/staff.entity';
import { TenantEntity } from '../../tenant/entities/tenant.entity';

@Entity({ name: 'academies' })
export class AcademyEntity extends TenantGenericEntity implements IAcademy {
  @ApiProperty({ description: 'Academy name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({
    description: 'Tenant associated with this academy',
    type: () => TenantEntity,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.academies, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Relation<TenantEntity>;

  @ApiProperty({
    description: 'Directors associated with this academy',
    type: () => [{}],
  })
  @OneToMany(() => DirectorEntity, (director) => director.academy)
  directors: Relation<DirectorEntity[]>;
}
