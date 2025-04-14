import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';
import { AcademicYearEntity } from '@/school/entities/academic-year.entity';
import { AssignmentPeriodEntity } from '@/school/entities/subject-assignment.entity';

import { TrackEntity } from './track.entity';

@Entity({ name: 'track_learning_periods' })
export class TrackLearningPeriodEntity extends GenericEntity {
  @Column()
  track_id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  academic_year_id: number;

  @ManyToOne(() => TrackEntity, (track) => track.learningPeriods)
  @JoinColumn({ name: 'track_id' })
  track: TrackEntity;

  @ManyToOne(
    () => AcademicYearEntity,
    (academicYear) => academicYear.learningPeriods,
  )
  @JoinColumn({ name: 'academic_year_id' })
  academicYear: AcademicYearEntity;

  @OneToMany(
    () => AssignmentPeriodEntity,
    (assignment_period) => assignment_period.learning_period,
  )
  assignment_periods: AssignmentPeriodEntity[];
}
