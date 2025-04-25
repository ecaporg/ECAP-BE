import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core/generic-entity';
import { AcademicYearEntity } from '@/school/entities/academic-year.entity';
import { AssignmentPeriodEntity } from '@/school/entities/assignment.entity';
import { SchoolEntity } from '@/school/entities/school.entity';
import { TeacherEntity } from '@/staff/entities/staff.entity';

@Entity({ name: 'courses' })
export class CourseEntity extends GenericEntity {
  @ApiProperty({ description: 'School ID associated with this assignment' })
  @Column()
  school_id: number;

  @ApiProperty({ description: 'Teacher ID associated with this assignment' })
  @Column()
  teacher_id: number;

  @ApiProperty({
    description: 'Academic year ID associated with this assignment',
  })
  @Column()
  academic_year_id: number;

  @ApiProperty({
    description: 'School associated with this assignment',
    type: () => Object,
  })
  @ManyToOne(() => SchoolEntity)
  @JoinColumn({ name: 'school_id' })
  school: SchoolEntity;

  @ApiProperty({
    description: 'Teacher associated with this assignment',
    type: () => Object,
  })
  @ManyToOne(() => TeacherEntity)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @ApiProperty({
    description: 'Academic year associated with this assignment',
    type: () => AcademicYearEntity,
  })
  @ManyToOne(() => AcademicYearEntity)
  @JoinColumn({ name: 'academic_year_id' })
  academic_year: AcademicYearEntity;

  @ApiProperty({
    description: 'Assignment periods associated with this course',
    type: () => [{}],
  })
  @OneToMany(
    () => AssignmentPeriodEntity,
    (assignment_period) => assignment_period.course,
  )
  assignment_periods: AssignmentPeriodEntity[];
}
