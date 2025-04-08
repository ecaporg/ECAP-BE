import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { GenericEntity } from '../../core/generic-entity';

import { SchoolEntity } from './school.entity';
import { SubjectEntity } from './subject.entity';
import { TrackCalendarEntity } from './track-calendar.entity';
import { TrackLearningPeriodEntity } from './track-learning-period.entity';

@Entity({ name: 'tracks' })
export class TrackEntity extends GenericEntity {
  @Column()
  school_id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => SchoolEntity, (school) => school.tracks)
  @JoinColumn({ name: 'school_id' })
  school: SchoolEntity;

  @OneToMany(() => TrackCalendarEntity, (calendar) => calendar.track)
  calendar: TrackCalendarEntity[];

  @OneToMany(() => SubjectEntity, (subject) => subject.track)
  subjects: SubjectEntity[];

  @OneToMany(() => TrackLearningPeriodEntity, (period) => period.track)
  learningPeriods: TrackLearningPeriodEntity[];
}
