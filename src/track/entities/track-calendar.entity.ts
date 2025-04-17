import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { TrackEntity } from './track.entity';

@Entity({ name: 'track_calendar' })
export class TrackCalendarEntity {
  @ApiProperty({ description: 'Track ID associated with this calendar entry' })
  @PrimaryColumn()
  track_id: number;

  @ApiProperty({ description: 'Date of the calendar entry' })
  @PrimaryColumn()
  date: Date;

  @ApiProperty({ description: 'Type of calendar entry', maxLength: 250 })
  @Column({ length: 250 })
  type: string;

  @ApiProperty({
    description: 'Track associated with this calendar entry',
    type: () => TrackEntity,
  })
  @ManyToOne(() => TrackEntity, (track) => track.calendar)
  @JoinColumn({ name: 'track_id' })
  track: TrackEntity;
}
