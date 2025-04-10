import { Column, Entity, OneToMany } from 'typeorm';

import { GenericEntity } from '../../core/generic-entity';

import { AcademyEntity } from './academy.entity';
import { SchoolEntity } from './school.entity';
import { AdminEntity } from './staff.entity';

@Entity({ name: 'tenants' })
export class TenantEntity extends GenericEntity {
  @Column({ length: 50, nullable: true, default: null })
  name: string;

  @OneToMany(() => SchoolEntity, (school) => school.tenant)
  schools: SchoolEntity[];

  @OneToMany(() => AdminEntity, (admin) => admin.tenant)
  admins: AdminEntity[];

  @OneToMany(() => AcademyEntity, (academy) => academy.tenant)
  academies: AcademyEntity[];
}
