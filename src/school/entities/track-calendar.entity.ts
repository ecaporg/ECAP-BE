import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { TrackEntity } from './track.entity';

@Entity({ name: 'track_calendar' })
export class TrackCalendarEntity {
  @PrimaryColumn()
  track_id: number;

  @PrimaryColumn()
  date: Date;

  @Column({ length: 50 })
  type: string;

  @ManyToOne(() => TrackEntity, (track) => track.calendar)
  @JoinColumn({ name: 'track_id' })
  track: TrackEntity;
}
