import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '../../core';

import { TrackEntity } from './track.entity';

@Entity({ name: 'semesters' })
export class SemesterEntity extends GenericEntity {
  @ApiProperty({ description: 'Track ID associated with this semester' })
  @Column()
  track_id: number;

  @ApiProperty({ description: 'Semester name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({ description: 'Semester start date' })
  @Column({ type: 'date' })
  start_date: Date;

  @ApiProperty({ description: 'Semester end date' })
  @Column({ type: 'date' })
  end_date: Date;

  @ApiProperty({
    description: 'Track associated with this semester',
    type: () => TrackEntity,
  })
  @ManyToOne(() => TrackEntity, (track) => track.semesters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'track_id' })
  track: TrackEntity;
}
