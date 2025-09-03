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

import { DatedGenericEntity } from '../../../core';
import { TeacherSchoolYearEnrollmentEntity } from '../../enrollment/entities/teacher-enrollment.entity';
import { AcademyEntity } from '../../school/entities/academy.entity';
import { TenantEntity } from '../../tenant/entities/tenant.entity';
import { UserEntity } from '../../users/entities/user.entity';

interface IStaffEntity {
  id: number;
  user: Relation<UserEntity>;
}

interface ITeacherEntity extends IStaffEntity {
  teacher_school_year_enrollments: Relation<
    TeacherSchoolYearEnrollmentEntity[]
  >;
}

interface IAdminEntity extends IStaffEntity {
  tenant: Relation<TenantEntity>;
  tenant_id: number;
}

interface IDirectorEntity extends IAdminEntity {
  academy: Relation<AcademyEntity>;
  academy_id: number;
}

export abstract class StaffEntity
  extends DatedGenericEntity
  implements IStaffEntity
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
export class TeacherEntity extends StaffEntity implements ITeacherEntity {
  @ApiProperty({
    description: 'Teacher school year enrollments for this teacher',
    type: () => [{}],
  })
  @OneToMany(
    () => TeacherSchoolYearEnrollmentEntity,
    (teacher_school_year_enrollment) => teacher_school_year_enrollment.teacher,
  )
  teacher_school_year_enrollments: Relation<
    TeacherSchoolYearEnrollmentEntity[]
  >;
}

@Entity({
  name: 'admins',
  comment: 'Admins and superadmins table',
})
export class AdminEntity extends StaffEntity implements IAdminEntity {
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
export class DirectorEntity extends AdminEntity implements IDirectorEntity {
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
