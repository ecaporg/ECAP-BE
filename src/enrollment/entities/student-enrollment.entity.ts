import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core';
import { TeacherSchoolYearEnrollmentEntity } from '@/enrollment/entities/teacher-enrollment.entity';
import { SampleEntity } from '@/students/entities/sample.entity';
import { StudentEntity } from '@/students/entities/student.entity';
import { TrackLearningPeriodEntity } from '@/track/entities/track-learning-period.entity';

@Entity('student_lp_enrollments')
export class StudentLPEnrollmentEntity extends GenericEntity {
  @ApiProperty({
    description:
      'Teacher school year enrollment ID associated with this learning period',
  })
  @Column()
  teacher_school_year_enrollment_id: number;

  @ApiProperty({
    description: 'Student ID associated with this learning period',
  })
  @Column()
  student_id: number;

  @ApiProperty({
    description: 'Learning period ID associated with this enrollment',
  })
  @Column()
  learning_period_id: number;

  @ApiProperty({ description: 'Whether this enrollment is completed' })
  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @ApiProperty({ description: 'Percentage of completed samples' })
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  percentage: number;

  @ApiProperty({
    description: 'Learning period associated with this enrollment',
    type: () => TrackLearningPeriodEntity,
  })
  @ManyToOne(() => TrackLearningPeriodEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'learning_period_id' })
  learning_period: TrackLearningPeriodEntity;

  @ApiProperty({
    description:
      'Teacher school year enrollment associated with this enrollment',
    type: () => Object,
  })
  @ManyToOne(() => TeacherSchoolYearEnrollmentEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_school_year_enrollment_id' })
  teacher_school_year_enrollment: TeacherSchoolYearEnrollmentEntity;

  @ApiProperty({
    description: 'Student associated with this enrollment',
    type: () => StudentEntity,
  })
  @ManyToOne(() => StudentEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ApiProperty({
    description: 'Samples associated with this period',
    type: () => [{}],
  })
  @OneToMany(() => SampleEntity, (sample) => sample.student_lp_enrollment)
  samples: SampleEntity[];
}
