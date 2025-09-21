import { IStudentLPEnrollment } from 'ecap-lib/dist/domain';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { IDGenericEntity } from '../../../core';
import { TeacherEnrollmentEntity } from '../../enrollment/entities/teacher-enrollment.entity';
import { StudentEntity } from '../../students/entities/student.entity';
import { TrackLearningPeriodEntity } from '../../track/entities/track-learning-period.entity';

import { StudentLPEnrollmentAssignmentEntity } from './student-enrollment-assignment.entity';

@Entity('student_lp_enrollments')
export class StudentLPEnrollmentEntity
  extends IDGenericEntity
  implements IStudentLPEnrollment
{
  @ApiProperty({
    description: 'Student ID associated with this learning period',
  })
  @Column()
  student_id: number;

  @ApiProperty({ description: 'Student grade', maxLength: 40 })
  @Column({ length: 40, default: 'Unknown' })
  student_grade: string;

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
  learning_period: Relation<TrackLearningPeriodEntity>;

  @ApiProperty({
    description:
      'Teacher school year enrollments associated with this enrollment',
    type: () => Object,
  })
  @ManyToMany(
    () => TeacherEnrollmentEntity,
    (teacherSchoolYearEnrollment) =>
      teacherSchoolYearEnrollment.student_lp_enrollments,
  )
  @JoinTable()
  teacher_enrollments: Relation<TeacherEnrollmentEntity[]>;

  @ApiProperty({
    description: 'Student associated with this enrollment',
    type: () => StudentEntity,
  })
  @ManyToOne(() => StudentEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Relation<StudentEntity>;

  @ApiProperty({
    description: 'Assignment enrollments associated with this learning period',
    type: () => [StudentLPEnrollmentAssignmentEntity],
  })
  @OneToMany(
    () => StudentLPEnrollmentAssignmentEntity,
    (assignment) => assignment.student_lp_enrollment,
    {
      cascade: ['insert'],
    },
  )
  assignments: Relation<StudentLPEnrollmentAssignmentEntity[]>;
}
