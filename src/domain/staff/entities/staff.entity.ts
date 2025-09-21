import { IAdmin, IDirector, IStaff, ITeacher } from 'ecap-lib/dist/domain';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '../../../auth/entities/user.entity';
import { TenantGenericEntity } from '../../../core';
import { TeacherEnrollmentEntity } from '../../enrollment/entities/teacher-enrollment.entity';
import { AcademyEntity } from '../../school/entities/academy.entity';
import { TenantEntity } from '../../tenant/entities/tenant.entity';

export abstract class StaffEntity
  extends TenantGenericEntity
  implements IStaff
{
  @ApiProperty({ description: 'User ID associated with this staff member' })
  @PrimaryColumn()
  id: number;

  @ApiProperty({
    description: 'User associated with this staff member',
    type: () => UserEntity,
  })
  @OneToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  user: Relation<UserEntity>;
}

@Entity({ name: 'teachers' })
export class TeacherEntity extends StaffEntity implements ITeacher {
  @ApiProperty({
    description: 'Teacher school year enrollments for this teacher',
    type: () => [{}],
  })
  @OneToMany(
    () => TeacherEnrollmentEntity,
    (teacher_enrollment) => teacher_enrollment.teacher,
  )
  teacher_enrollments: Relation<TeacherEnrollmentEntity[]>;

  @ApiProperty({
    description: 'Tenant ID associated with this admin/superadmin',
  })
  @PrimaryColumn()
  tenant_id: number;

  @ApiProperty({
    description: 'Tenant associated with this admin/superadmin',
    type: () => TenantEntity,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.teachers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Relation<TenantEntity>;
}

@Entity({
  name: 'admins',
  comment: 'Admins and superadmins table',
})
export class AdminEntity extends StaffEntity implements IAdmin {
  @ApiProperty({
    description: 'Tenant ID associated with this admin/superadmin',
  })
  @PrimaryColumn()
  tenant_id: number;

  @ApiProperty({
    description: 'Tenant associated with this admin/superadmin',
    type: () => TenantEntity,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.admins, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Relation<TenantEntity>;
}

@Entity({ name: 'directors' })
export class DirectorEntity extends StaffEntity implements IDirector {
  @ApiProperty({
    description: 'Tenant ID associated with this director',
  })
  @PrimaryColumn()
  tenant_id: number;

  @ApiProperty({
    description: 'Tenant associated with this director',
    type: () => TenantEntity,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.directors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Relation<TenantEntity>;

  @ApiProperty({ description: 'Academy ID associated with this director' })
  @Column()
  academy_id: number;

  @ApiProperty({
    description: 'Academy associated with this director',
    type: () => Object,
  })
  @ManyToOne(() => AcademyEntity, (academy) => academy.directors, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'academy_id' })
  academy: Relation<AcademyEntity>;
}
