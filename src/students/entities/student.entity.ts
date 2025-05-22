import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { DatedGenericEntity } from '@/core';
import { StudentLPEnrollmentEntity } from '@/enrollment/entities/student-enrollment.entity';
import { AcademyEntity } from '@/school/entities/academy.entity';
import { SchoolEntity } from '@/school/entities/school.entity';
import { UserEntity } from '@/users/entities/user.entity';

// TODO: move track_id, academy_id, and school_id to student_enrollment_entity
@Entity({ name: 'students' })
export class StudentEntity extends DatedGenericEntity {
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
  school: SchoolEntity;

  @ApiProperty({
    description: 'User associated with this student',
    type: () => UserEntity,
  })
  @OneToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  user: UserEntity;

  @ApiProperty({
    description: 'Academy associated with this student',
    type: () => Object,
  })
  @ManyToOne(() => AcademyEntity, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'academy_id' })
  academy: AcademyEntity;

  @ApiProperty({
    description: 'Assignment periods for this student',
    type: () => [{}],
  })
  @OneToMany(
    () => StudentLPEnrollmentEntity,
    (student_lp_enrollment) => student_lp_enrollment.student,
  )
  student_lp_enrollments: StudentLPEnrollmentEntity[];
}
