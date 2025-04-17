import { Column, Entity, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core';
import { TrackLearningPeriodEntity } from '@/track/entities/track-learning-period.entity';

import { SemesterEntity } from './semester.entity';
import { AssignmentEntity } from './subject-assignment.entity';

@Entity({ name: 'academic_years' })
export class AcademicYearEntity extends GenericEntity {
  @ApiProperty({
    description: 'Start year of the academic year',
    type: 'integer',
  })
  @Column({ type: 'int' })
  from: number;

  @ApiProperty({
    description: 'End year of the academic year',
    type: 'integer',
  })
  @Column({ type: 'int' })
  to: number;

  @ApiProperty({
    description: 'Semesters in this academic year',
    type: () => [SemesterEntity],
  })
  @OneToMany(() => SemesterEntity, (semester) => semester.academic_year)
  semesters: SemesterEntity[];

  @ApiProperty({
    description: 'Learning periods in this academic year',
    type: () => [TrackLearningPeriodEntity],
  })
  @OneToMany(
    () => TrackLearningPeriodEntity,
    (trackLearningPeriod) => trackLearningPeriod.academicYear,
  )
  learningPeriods: TrackLearningPeriodEntity[];

  @ApiProperty({
    description: 'Assignments in this academic year',
    type: () => [AssignmentEntity],
  })
  @OneToMany(() => AssignmentEntity, (assignment) => assignment.academic_year)
  assignments: AssignmentEntity[];
}
