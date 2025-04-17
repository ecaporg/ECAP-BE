import { Column, Entity, OneToMany } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';
import { AdminEntity } from '@/staff/entities/staff.entity';
import { TrackEntity } from '@/track/entities/track.entity';

import { AcademyEntity } from './academy.entity';
import { SchoolEntity } from './school.entity';
import { SemesterEntity } from './semester.entity';

@Entity({ name: 'tenants' })
export class TenantEntity extends GenericEntity {
  @Column({ length: 250, nullable: true, default: null })
  name: string;

  @OneToMany(() => SchoolEntity, (school) => school.tenant)
  schools: SchoolEntity[];

  @OneToMany(() => AdminEntity, (admin) => admin.tenant)
  admins: AdminEntity[];

  @OneToMany(() => AcademyEntity, (academy) => academy.tenant)
  academies: AcademyEntity[];

  @OneToMany(() => TrackEntity, (track) => track.tenant)
  tracks: TrackEntity[];

  @OneToMany(() => SemesterEntity, (semester) => semester.tenant)
  semesters: SemesterEntity[];
}
