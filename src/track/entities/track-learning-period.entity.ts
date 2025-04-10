import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';
import { SampleEntity } from '@/students/entities/sample.entity';

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

  @OneToMany(() => SampleEntity, (sample) => sample.learningPeriod)
  samples: SampleEntity[];

  @ManyToOne(() => TrackEntity, (track) => track.learningPeriods)
  @JoinColumn({ name: 'track_id' })
  track: TrackEntity;
}
