import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core/generic-entity';
import { AcademicYearEntity } from '@/school/entities/academic-year.entity';
import { AssignmentPeriodEntity } from '@/school/entities/subject-assignment.entity';

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
    description: 'Academic year ID associated with this learning period',
  })
  @Column()
  academic_year_id: number;

  @ApiProperty({
    description: 'Track associated with this learning period',
    type: () => TrackEntity,
  })
  @ManyToOne(() => TrackEntity, (track) => track.learningPeriods)
  @JoinColumn({ name: 'track_id' })
  track: TrackEntity;

  @ApiProperty({
    description: 'Academic year associated with this learning period',
    type: () => AcademicYearEntity,
  })
  @ManyToOne(
    () => AcademicYearEntity,
    (academicYear) => academicYear.learningPeriods,
  )
  @JoinColumn({ name: 'academic_year_id' })
  academicYear: AcademicYearEntity;

  @ApiProperty({
    description: 'Assignment periods in this learning period',
    type: () => [AssignmentPeriodEntity],
  })
  @OneToMany(
    () => AssignmentPeriodEntity,
    (assignment_period) => assignment_period.learning_period,
  )
  assignment_periods: AssignmentPeriodEntity[];
}
