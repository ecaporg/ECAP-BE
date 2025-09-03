import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '../../../core';
import { StudentLPEnrollmentEntity } from '../../enrollment/entities/student-enrollment.entity';
import { SchoolEntity } from '../../school/entities/school.entity';
import { TeacherEntity } from '../../staff/entities/staff.entity';
import { AcademicYearEntity } from '../../track/entities/academic-year.entity';

interface ITeacherSchoolYearEnrollmentEntity {
  teacher_id: number;

  academic_year: Relation<AcademicYearEntity>;
  academic_year_id: number;

  school: Relation<SchoolEntity>;
  school_id: number;

  student_lp_enrollments: Relation<StudentLPEnrollmentEntity[]>;
  teacher: Relation<TeacherEntity>;
}

@Entity({ name: 'teacher_school_year_enrollments' })
export class TeacherSchoolYearEnrollmentEntity
  extends GenericEntity
  implements ITeacherSchoolYearEnrollmentEntity
{
  @ApiProperty({ description: 'School ID associated with this enrollment' })
  @Column()
  school_id: number;

  @ApiProperty({ description: 'Teacher ID associated with this enrollment' })
  @Column()
  teacher_id: number;

  @ApiProperty({
    description: 'Academic year ID associated with this enrollment',
  })
  @Column()
  academic_year_id: number;

  @ApiProperty({
    description: 'School associated with this enrollment',
    type: () => Object,
  })
  @ManyToOne(() => SchoolEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'school_id' })
  school: Relation<SchoolEntity>;

  @ApiProperty({
    description: 'Teacher associated with this enrollment',
    type: () => Object,
  })
  @ManyToOne(() => TeacherEntity, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Relation<TeacherEntity>;

  @ApiProperty({
    description: 'Academic year associated with this enrollment',
    type: () => AcademicYearEntity,
  })
  @ManyToOne(() => AcademicYearEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'academic_year_id' })
  academic_year: Relation<AcademicYearEntity>;

  @ApiProperty({
    description: 'Assignment periods associated with this enrollment',
    type: () => [{}],
  })
  @ManyToMany(
    () => StudentLPEnrollmentEntity,
    (student_lp_enrollment) =>
      student_lp_enrollment.teacher_school_year_enrollments,
  )
  student_lp_enrollments: Relation<StudentLPEnrollmentEntity[]>;
}
