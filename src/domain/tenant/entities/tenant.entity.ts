import { ITenant } from 'ecap-lib/dist/domain';
import { Column, Entity, OneToMany, OneToOne, Relation } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '../../../core';
import { AcademyEntity } from '../../school/entities/academy.entity';
import { SchoolEntity } from '../../school/entities/school.entity';
import {
  AdminEntity,
  DirectorEntity,
  TeacherEntity,
} from '../../staff/entities/staff.entity';
import { CourseEntity } from '../../subject/entities/course.entity';
import { TrackEntity } from '../../track/entities/track.entity';

import { KeyEntity } from './key.entity';

@Entity({ name: 'tenants' })
export class TenantEntity extends GenericEntity implements ITenant {
  @ApiProperty({ description: 'Tenant name', maxLength: 250, nullable: true })
  @Column({ length: 250, nullable: true, default: null })
  name: string;

  @ApiProperty({
    description: 'Schools associated with this tenant',
    type: () => [{}],
  })
  @OneToMany(() => SchoolEntity, (school) => school.tenant)
  schools: Relation<SchoolEntity[]>;

  @ApiProperty({
    description: 'Admins associated with this tenant',
    type: () => [{}],
  })
  @OneToMany(() => AdminEntity, (admin) => admin.tenant)
  admins: Relation<AdminEntity[]>;

  @ApiProperty({
    description: 'Teachers associated with this tenant',
    type: () => [{}],
  })
  @OneToMany(() => TeacherEntity, (teacher) => teacher.tenant)
  teachers: Relation<TeacherEntity[]>;

  @ApiProperty({
    description: 'Academies associated with this tenant',
    type: () => [{}],
  })
  @OneToMany(() => AcademyEntity, (academy) => academy.tenant)
  academies: Relation<AcademyEntity[]>;

  @ApiProperty({
    description: 'Tracks associated with this tenant',
    type: () => [{}],
  })
  @OneToMany(() => TrackEntity, (track) => track.tenant)
  tracks: Relation<TrackEntity[]>;

  @ApiProperty({
    description: 'Directors associated with this tenant',
    type: () => [{}],
  })
  @OneToMany(() => DirectorEntity, (director) => director.tenant)
  directors: Relation<DirectorEntity[]>;

  @ApiProperty({
    description: 'Keys associated with this tenant',
    type: () => [{}],
  })
  @OneToOne(() => KeyEntity, (key) => key.tenant)
  key: Relation<KeyEntity>;

  @ApiProperty({
    description: 'Courses associated with this tenant',
    type: () => [{}],
  })
  @OneToMany(() => CourseEntity, (course) => course.tenant)
  courses: Relation<CourseEntity[]>;
}
