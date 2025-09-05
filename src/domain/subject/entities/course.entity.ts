import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { CanvasGenericEntity } from '../../../core';
import { TenantEntity } from '../../tenant/entities/tenant.entity';

import { AssignmentEntity } from './assignment.entity';

interface ICourseEntity {
  canvas_id?: string;

  name: string;

  assignments: Relation<AssignmentEntity[]>;
}

@Entity({ name: 'courses' })
export class CourseEntity extends CanvasGenericEntity implements ICourseEntity {
  @ApiProperty({ description: 'Course name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({
    description: 'Assignments associated with this course',
    type: () => [{}],
  })
  @OneToMany(() => AssignmentEntity, (assignment) => assignment.course, {
    cascade: ['insert'],
  })
  assignments: Relation<AssignmentEntity[]>;

  @ApiProperty({ description: 'Tenant ID associated with this course' })
  @Column()
  tenant_id: number;

  @ApiProperty({
    description: 'Tenant associated with this course',
    type: () => Object,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.courses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Relation<TenantEntity>;
}
