import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from 'src/core';
import { StudentLPEnrollmentEntity } from 'src/enrollment/entities/student-enrollment.entity';
import { SchoolEntity } from 'src/school/entities/school.entity';
import { TeacherEntity } from 'src/staff/entities/staff.entity';
import { AcademicYearEntity } from 'src/track/entities/academic-year.entity';

// todo: rename to TeacherSchoolYearEnrollmentEntity

@Entity({ name: 'teacher_school_year_enrollments' })
export class TeacherSchoolYearEnrollmentEntity extends GenericEntity {
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
  school: SchoolEntity;

  @ApiProperty({
    description: 'Teacher associated with this enrollment',
    type: () => Object,
  })
  @ManyToOne(() => TeacherEntity, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @ApiProperty({
    description: 'Academic year associated with this enrollment',
    type: () => AcademicYearEntity,
  })
  @ManyToOne(() => AcademicYearEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'academic_year_id' })
  academic_year: AcademicYearEntity;

  @ApiProperty({
    description: 'Assignment periods associated with this enrollment',
    type: () => [{}],
  })
  @OneToMany(
    () => StudentLPEnrollmentEntity,
    (student_lp_enrollment) =>
      student_lp_enrollment.teacher_school_year_enrollment,
  )
  student_lp_enrollments: StudentLPEnrollmentEntity[];
}
