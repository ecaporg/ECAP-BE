import { ISchool } from 'ecap-lib/dist/domain';
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
import { StudentEntity } from '../../students/entities/student.entity';
import { TenantEntity } from '../../tenant/entities/tenant.entity';

@Entity({ name: 'schools' })
export class SchoolEntity extends TenantGenericEntity implements ISchool {
  @ApiProperty({ description: 'School name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({
    description: 'Tenant associated with this school',
    type: () => Object,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.schools, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Relation<TenantEntity>;

  @ApiProperty({
    description: 'Students enrolled in this school',
    type: () => [{}],
  })
  @OneToMany(() => StudentEntity, (student) => student.school)
  students: Relation<StudentEntity[]>;

  // @ApiProperty({
  //   description: 'Teacher school year enrollments in this school',
  //   type: () => [{}],
  // })
  // @OneToMany(() => TeacherEnrollmentEntity, (course) => course.school)
  // teacher_enrollments: Relation<TeacherEnrollmentEntity[]>;
}
