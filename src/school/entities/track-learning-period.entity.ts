import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { GenericEntity } from '../../core/generic-entity';

import { TrackEntity } from './track.entity';

@Entity({ name: 'track_learning_periods' })
export class TrackLearningPeriodEntity extends GenericEntity {
  @Column()
  track_id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => TrackEntity, (track) => track.learningPeriods)
  @JoinColumn({ name: 'track_id' })
  track: TrackEntity;
}
