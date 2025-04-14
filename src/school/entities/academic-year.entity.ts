import { Column, Entity, OneToMany } from 'typeorm';

import { GenericEntity } from '@/core';
import { TrackLearningPeriodEntity } from '@/track/entities/track-learning-period.entity';

import { SemesterEntity } from './semester.entity';
import { AssignmentEntity } from './subject-assignment.entity';
@Entity({ name: 'academic_years' })
export class AcademicYearEntity extends GenericEntity {
  @Column({ type: 'int' })
  from: number;

  @Column({ type: 'int' })
  to: number;

  @OneToMany(() => SemesterEntity, (semester) => semester.academic_year)
  semesters: SemesterEntity[];

  @OneToMany(
    () => TrackLearningPeriodEntity,
    (trackLearningPeriod) => trackLearningPeriod.academicYear,
  )
  learningPeriods: TrackLearningPeriodEntity[];

  @OneToMany(() => AssignmentEntity, (assignment) => assignment.academic_year)
  assignments: AssignmentEntity[];
}
