import { ITrackCalendar } from 'ecap-lib/dist/domain';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { IDGenericEntity } from '../../../core';

import { TrackEntity } from './track.entity';

export interface CalendarDay {
  day: Date;
  type: string;
}

@Entity({ name: 'track_calendar' })
export class TrackCalendarEntity
  extends IDGenericEntity
  implements ITrackCalendar
{
  @ApiProperty({ description: 'Track ID associated with this calendar entry' })
  @PrimaryColumn()
  id: number;

  @ApiProperty({ description: 'JSON calendar of calendar days and types' })
  @Column({ type: 'json' })
  days: CalendarDay[];

  @ApiProperty({
    description: 'Track ID associated with this calendar entry',
    type: () => TrackEntity,
  })
  @OneToOne(() => TrackEntity, (track) => track.calendar, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  track: Relation<TrackEntity>;
}
