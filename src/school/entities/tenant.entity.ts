import { Column, Entity, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core/generic-entity';
import { AdminEntity } from '@/staff/entities/staff.entity';
import { TrackEntity } from '@/track/entities/track.entity';

import { AcademyEntity } from './academy.entity';
import { SchoolEntity } from './school.entity';
import { SemesterEntity } from './semester.entity';

@Entity({ name: 'tenants' })
export class TenantEntity extends GenericEntity {
  @ApiProperty({ description: 'Tenant name', maxLength: 250, nullable: true })
  @Column({ length: 250, nullable: true, default: null })
  name: string;

  @ApiProperty({
    description: 'Schools associated with this tenant',
    type: () => [SchoolEntity],
  })
  @OneToMany(() => SchoolEntity, (school) => school.tenant)
  schools: SchoolEntity[];

  @ApiProperty({
    description: 'Admins associated with this tenant',
    type: () => [AdminEntity],
  })
  @OneToMany(() => AdminEntity, (admin) => admin.tenant)
  admins: AdminEntity[];

  @ApiProperty({
    description: 'Academies associated with this tenant',
    type: () => [AcademyEntity],
  })
  @OneToMany(() => AcademyEntity, (academy) => academy.tenant)
  academies: AcademyEntity[];

  @ApiProperty({
    description: 'Tracks associated with this tenant',
    type: () => [TrackEntity],
  })
  @OneToMany(() => TrackEntity, (track) => track.tenant)
  tracks: TrackEntity[];

  @ApiProperty({
    description: 'Semesters associated with this tenant',
    type: () => [SemesterEntity],
  })
  @OneToMany(() => SemesterEntity, (semester) => semester.tenant)
  semesters: SemesterEntity[];
}
