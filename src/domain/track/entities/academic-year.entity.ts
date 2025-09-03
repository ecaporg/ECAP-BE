import { Column, Entity, OneToMany, Relation } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '../../../core';
import { TeacherSchoolYearEnrollmentEntity } from '../../enrollment/entities/teacher-enrollment.entity';
import { TrackEntity } from '../../track/entities/track.entity';

interface IAcademicYearEntity {
  from: number;
  to: number;

  teacher_school_year_enrollments: Relation<
    TeacherSchoolYearEnrollmentEntity[]
  >;
  tracks: Relation<TrackEntity[]>;
}

@Entity({ name: 'academic_years' })
export class AcademicYearEntity
  extends GenericEntity
  implements IAcademicYearEntity
{
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
  tracks: Relation<TrackEntity[]>;

  @ApiProperty({
    description: 'Teacher school year enrollments in this academic year',
    type: () => [TeacherSchoolYearEnrollmentEntity],
  })
  @OneToMany(
    () => TeacherSchoolYearEnrollmentEntity,
    (teacher_school_year_enrollment) =>
      teacher_school_year_enrollment.academic_year,
  )
  teacher_school_year_enrollments: Relation<
    TeacherSchoolYearEnrollmentEntity[]
  >;
}
