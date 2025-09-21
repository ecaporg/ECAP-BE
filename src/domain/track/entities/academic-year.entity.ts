import { IAcademicYear } from 'ecap-lib/dist/domain';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { IDGenericEntity } from '../../../core';
import { TeacherEnrollmentEntity } from '../../enrollment/entities/teacher-enrollment.entity';
import { TrackEntity } from '../../track/entities/track.entity';

@Entity({ name: 'academic_years' })
export class AcademicYearEntity
  extends IDGenericEntity
  implements IAcademicYear
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
    type: () => [TeacherEnrollmentEntity],
  })
  @OneToMany(
    () => TeacherEnrollmentEntity,
    (teacher_school_year_enrollment) =>
      teacher_school_year_enrollment.academic_year,
  )
  teacher_enrollments: Relation<TeacherEnrollmentEntity[]>;
}
