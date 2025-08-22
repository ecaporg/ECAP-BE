import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from 'src/core';
import { StudentLPEnrollmentEntity } from 'src/enrollment/entities/student-enrollment.entity';

import { TrackEntity } from './track.entity';

@Entity({ name: 'track_learning_periods' })
export class TrackLearningPeriodEntity extends GenericEntity {
  @ApiProperty({ description: 'Track ID associated with this learning period' })
  @Column()
  track_id: number;

  @ApiProperty({ description: 'Learning period name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({ description: 'Learning period start date' })
  @Column({ type: 'date' })
  start_date: Date;

  @ApiProperty({ description: 'Learning period end date' })
  @Column({ type: 'date' })
  end_date: Date;

  @ApiProperty({
    description: 'Track associated with this learning period',
    type: () => Object,
  })
  @ManyToOne(() => TrackEntity, (track) => track.learningPeriods, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'track_id' })
  track: TrackEntity;

  @ApiProperty({
    description: 'Student LP enrollments in this learning period',
    type: () => [{}],
  })
  @OneToMany(
    () => StudentLPEnrollmentEntity,
    (student_lp_enrollment) => student_lp_enrollment.learning_period,
  )
  student_lp_enrollments: StudentLPEnrollmentEntity[];
}

