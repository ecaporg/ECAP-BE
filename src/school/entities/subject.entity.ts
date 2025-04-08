import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { GenericEntity } from '../../core/generic-entity';
import { SampleEntity } from '../../students/entities/sample.entity';

import { TrackEntity } from './track.entity';

@Entity({ name: 'subjects' })
export class SubjectEntity extends GenericEntity {
  @Column()
  track_id: number;

  @Column({ length: 50 })
  name: string;

  @ManyToOne(() => TrackEntity, (track) => track.subjects)
  @JoinColumn({ name: 'track_id' })
  track: TrackEntity;

  @OneToMany(() => SampleEntity, (sample) => sample.subject)
  samples: SampleEntity[];
}
