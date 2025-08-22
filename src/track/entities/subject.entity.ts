import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from 'src/core';
import { SampleEntity } from 'src/students/entities/sample.entity';

import { TrackEntity } from './track.entity';

// Subject equals to a course in the Canvas LMS
@Entity({ name: 'subjects' })
export class SubjectEntity extends GenericEntity {
  @ApiProperty({ description: 'Track ID associated with this subject' })
  @Column()
  track_id: number;

  @ApiProperty({ description: 'Canvas course id', nullable: true })
  @Column({ nullable: true, length: 50 })
  canvas_course_id?: string;

  @ApiProperty({ description: 'Canvas additional info', nullable: true })
  @Column({ nullable: true, type: 'json' })
  canvas_additional_info?: Record<string, any>;

  @ApiProperty({ description: 'Subject name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({
    description: 'Track associated with this subject',
    type: () => TrackEntity,
  })
  @ManyToOne(() => TrackEntity, (track) => track.subjects, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'track_id' })
  track: TrackEntity;

  @ApiProperty({
    description: 'Samples associated with this subject',
    type: () => [{}],
  })
  @OneToMany(() => SampleEntity, (sample) => sample.subject)
  samples: SampleEntity[];
}

