import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core';
import { AcademyEntity } from '@/school/entities/academy.entity';
import { SchoolEntity } from '@/school/entities/school.entity';
import { AdminEntity, DirectorEntity } from '@/staff/entities/staff.entity';
import { TrackEntity } from '@/track/entities/track.entity';

import { KeyEntity } from './key.entity';

@Entity({ name: 'tenants' })
export class TenantEntity extends GenericEntity {
  @ApiProperty({ description: 'Tenant name', maxLength: 250, nullable: true })
  @Column({ length: 250, nullable: true, default: null })
  name: string;

  @ApiProperty({
    description: 'Schools associated with this tenant',
    type: () => [{}],
  })
  @OneToMany(() => SchoolEntity, (school) => school.tenant)
  schools: SchoolEntity[];

  @ApiProperty({
    description: 'Admins associated with this tenant',
    type: () => [{}],
  })
  @OneToMany(() => AdminEntity, (admin) => admin.tenant)
  admins: AdminEntity[];

  @ApiProperty({
    description: 'Academies associated with this tenant',
    type: () => [{}],
  })
  @OneToMany(() => AcademyEntity, (academy) => academy.tenant)
  academies: AcademyEntity[];

  @ApiProperty({
    description: 'Tracks associated with this tenant',
    type: () => [{}],
  })
  @OneToMany(() => TrackEntity, (track) => track.tenant)
  tracks: TrackEntity[];

  @ApiProperty({
    description: 'Directors associated with this tenant',
    type: () => [{}],
  })
  @OneToMany(() => DirectorEntity, (director) => director.tenant)
  directors: DirectorEntity[];

  @ApiProperty({
    description: 'Keys associated with this tenant',
    type: () => [{}],
  })
  @OneToOne(() => KeyEntity, (key) => key.tenant)
  key: KeyEntity;
}
