import { Column, Entity, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core';
import { CourseEntity } from '@/course/entities/course.entity';
import { TrackEntity } from '@/track/entities/track.entity';

@Entity({ name: 'academic_years' })
export class AcademicYearEntity extends GenericEntity {
  @ApiProperty({
    description: 'Start year of the academic year',
    type: 'integer',
  })
  @Column({ type: 'int' })
  from: number;

  @ApiProperty({
    description: 'End year of the academic year',
    type: 'integer',
  })
  @Column({ type: 'int' })
  to: number;

  @ApiProperty({
    description: 'Tracks in this academic year',
    type: () => [{}],
  })
  @OneToMany(() => TrackEntity, (track) => track.academicYear)
  tracks: TrackEntity[];

  @ApiProperty({
    description: 'Assignments in this academic year',
    type: () => [CourseEntity],
  })
  @OneToMany(() => CourseEntity, (course) => course.academic_year)
  courses: CourseEntity[];
}
