import { Column, Entity, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from 'src/core';
import { TeacherSchoolYearEnrollmentEntity } from 'src/enrollment/entities/teacher-enrollment.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

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
    description: 'Teacher school year enrollments in this academic year',
    type: () => [TeacherSchoolYearEnrollmentEntity],
  })
  @OneToMany(
    () => TeacherSchoolYearEnrollmentEntity,
    (teacher_school_year_enrollment) =>
      teacher_school_year_enrollment.academic_year,
  )
  teacher_school_year_enrollments: TeacherSchoolYearEnrollmentEntity[];
}
