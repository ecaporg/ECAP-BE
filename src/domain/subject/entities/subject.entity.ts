import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '../../../core';
import { SampleEntity } from '../../students/entities/sample.entity';
import { TrackEntity } from '../../track/entities/track.entity';

import { CourseEntity } from './course.entity';

// Subject equals to a course in the Canvas LMS

interface ISubjectEntity {
  course: CourseEntity;
  course_id: number;

  track: TrackEntity;
  track_id: number;
}

@Entity({ name: 'subjects' })
export class SubjectEntity extends GenericEntity implements ISubjectEntity {
  @ApiProperty({ description: 'Track ID associated with this subject' })
  @Column()
  track_id: number;

  @ApiProperty({
    description: 'Course ID associated with this subject',
    nullable: true,
  })
  @Column()
  course_id: number;

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

  @ManyToOne(() => CourseEntity, (course) => course.subjects, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;
}
