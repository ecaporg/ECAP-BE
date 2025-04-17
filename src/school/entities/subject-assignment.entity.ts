import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core/generic-entity';
import { TeacherEntity } from '@/staff/entities/staff.entity';
import { SampleEntity } from '@/students/entities/sample.entity';
import { StudentEntity } from '@/students/entities/student.entity';
import { TrackLearningPeriodEntity } from '@/track/entities/track-learning-period.entity';

import { AcademicYearEntity } from './academic-year.entity';
import { SchoolEntity } from './school.entity';

@Entity('assignments')
export class AssignmentEntity extends GenericEntity {
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
  @JoinColumn([
    { name: 'teacher_id', referencedColumnName: 'user_id' },
    { name: 'school_id', referencedColumnName: 'school_id' },
  ])
  teacher: TeacherEntity;

  @ApiProperty({
    description: 'Academic year associated with this assignment',
    type: () => AcademicYearEntity,
  })
  @ManyToOne(() => AcademicYearEntity)
  @JoinColumn({ name: 'academic_year_id' })
  academic_year: AcademicYearEntity;

  @ApiProperty({
    description: 'Assignment periods associated with this assignment',
    type: () => [{}],
  })
  @OneToMany(
    () => AssignmentPeriodEntity,
    (assignment_period) => assignment_period.assignment,
  )
  assignment_periods: AssignmentPeriodEntity[];
}

@Entity('assignment_periods')
export class AssignmentPeriodEntity extends GenericEntity {
  @ApiProperty({
    description: 'Subject assignment ID associated with this period',
  })
  @Column()
  subject_assignment_id: number;

  @ApiProperty({ description: 'Student ID associated with this period' })
  @Column()
  student_id: number;

  @ApiProperty({
    description: 'Learning period ID associated with this period',
  })
  @Column()
  learning_period_id: number;

  @ApiProperty({ description: 'Whether this period is completed' })
  @Column()
  completed: boolean;

  @ApiProperty({
    description: 'Learning period associated with this period',
    type: () => TrackLearningPeriodEntity,
  })
  @ManyToOne(() => TrackLearningPeriodEntity)
  @JoinColumn({ name: 'learning_period_id' })
  learning_period: TrackLearningPeriodEntity;

  @ApiProperty({
    description: 'Assignment associated with this period',
    type: () => Object,
  })
  @ManyToOne(() => AssignmentEntity)
  @JoinColumn({ name: 'subject_assignment_id' })
  assignment: AssignmentEntity;

  @ApiProperty({
    description: 'Student associated with this period',
    type: () => StudentEntity,
  })
  @ManyToOne(() => StudentEntity)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ApiProperty({
    description: 'Samples associated with this period',
    type: () => [{}],
  })
  @OneToMany(() => SampleEntity, (sample) => sample.assignment_period)
  samples: SampleEntity[];
}
