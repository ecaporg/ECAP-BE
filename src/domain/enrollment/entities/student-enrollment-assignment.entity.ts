import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { AssignmentEntity } from '../../../domain/subject/entities/assignment.entity';
import { SampleEntity } from '../../students/entities/sample.entity';

import { StudentLPEnrollmentEntity } from './student-enrollment.entity';

interface IStudentLPEnrollmentAssignmentEntity {
  assignment: Relation<AssignmentEntity>;
  assignment_id: number;

  sample: Relation<SampleEntity>;
  sample_id?: number;

  student_lp_enrollment: Relation<StudentLPEnrollmentEntity>;
  student_lp_enrollment_id: number;
}

@Entity('student_lp_enrollment_assignments')
export class StudentLPEnrollmentAssignmentEntity
  implements IStudentLPEnrollmentAssignmentEntity
{
  @ApiProperty({
    description:
      'Student learning plan enrollment ID associated with this assignment',
  })
  @PrimaryColumn()
  student_lp_enrollment_id: number;

  @ApiProperty({
    description: 'Assignment ID associated with this learning period',
  })
  @PrimaryColumn()
  assignment_id: number;

  @ApiProperty({
    description: 'Sample ID associated with this assignment',
  })
  @Column({ nullable: true })
  sample_id?: number;

  @ApiProperty({ description: 'Assignment associated with this enrollment' })
  @ManyToOne(() => AssignmentEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'assignment_id' })
  assignment: Relation<AssignmentEntity>;

  @ApiProperty({
    description: 'Sample associated with this enrollment',
    type: () => SampleEntity,
  })
  @OneToOne(() => SampleEntity, {
    cascade: ['insert'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'sample_id' })
  sample: Relation<SampleEntity>;

  @ApiProperty({
    description:
      'Student learning plan enrollment associated with this assignment',
    type: () => StudentLPEnrollmentEntity,
  })
  @ManyToOne(() => StudentLPEnrollmentEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'student_lp_enrollment_id' })
  student_lp_enrollment: Relation<StudentLPEnrollmentEntity>;
}
