import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core/generic-entity';
import { SampleEntity } from '@/students/entities/sample.entity';

import { TrackEntity } from './track.entity';

@Entity({ name: 'subjects' })
export class SubjectEntity extends GenericEntity {
  @ApiProperty({ description: 'Track ID associated with this subject' })
  @Column()
  track_id: number;

  @ApiProperty({ description: 'Subject name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({
    description: 'Track associated with this subject',
    type: () => TrackEntity,
  })
  @ManyToOne(() => TrackEntity, (track) => track.subjects)
  @JoinColumn({ name: 'track_id' })
  track: TrackEntity;

  @ApiProperty({
    description: 'Samples associated with this subject',
    type: () => [SampleEntity],
  })
  @OneToMany(() => SampleEntity, (sample) => sample.subject)
  samples: SampleEntity[];
}
