import { IStudent } from 'ecap-lib/dist/domain';
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
import { IDGenericEntity } from '../../../core';
import { StudentLPEnrollmentEntity } from '../../enrollment/entities/student-enrollment.entity';
import { AcademyEntity } from '../../school/entities/academy.entity';
import { SchoolEntity } from '../../school/entities/school.entity';

// TODO: move track_id, academy_id, and school_id to student_enrollment_entity

@Entity({ name: 'students' })
export class StudentEntity extends IDGenericEntity implements IStudent {
  @ApiProperty({ description: 'User ID associated with this student' })
  @PrimaryColumn()
  id: number;

  @ApiProperty({ description: 'School ID associated with this student' })
  @Column({ nullable: true })
  school_id: number;

  @ApiProperty({
    description: 'Academy ID associated with this student',
    nullable: true,
  })
  @Column({ nullable: true })
  academy_id: number;

  @ApiProperty({
    description: 'School associated with this student',
    type: () => Object,
  })
  @ManyToOne(() => SchoolEntity, (school) => school.students, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'school_id' })
  school: Relation<SchoolEntity>;

  @ApiProperty({
    description: 'User associated with this student',
    type: () => UserEntity,
  })
  @OneToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'id' })
  user: Relation<UserEntity>;

  @ApiProperty({
    description: 'Academy associated with this student',
    type: () => Object,
  })
  @ManyToOne(() => AcademyEntity, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'academy_id' })
  academy: Relation<AcademyEntity>;

  @ApiProperty({
    description: 'Assignment periods for this student',
    type: () => [{}],
  })
  @OneToMany(
    () => StudentLPEnrollmentEntity,
    (student_lp_enrollment) => student_lp_enrollment.student,
  )
  student_lp_enrollments: Relation<StudentLPEnrollmentEntity[]>;
}
