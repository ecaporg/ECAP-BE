import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core';
import { AssignmentPeriodEntity } from '@/school/entities/assignment.entity';

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
  @Column()
  start_date: Date;

  @ApiProperty({ description: 'Learning period end date' })
  @Column()
  end_date: Date;

  @ApiProperty({
    description: 'Track associated with this learning period',
    type: () => Object,
  })
  @ManyToOne(() => TrackEntity, (track) => track.learningPeriods)
  @JoinColumn({ name: 'track_id' })
  track: TrackEntity;

  @ApiProperty({
    description: 'Assignment periods in this learning period',
    type: () => [{}],
  })
  @OneToMany(
    () => AssignmentPeriodEntity,
    (assignment_period) => assignment_period.learning_period,
  )
  assignment_periods: AssignmentPeriodEntity[];
}
