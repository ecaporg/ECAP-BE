import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { CanvasGenericEntity } from '../../../core';
import { StudentLPEnrollmentAssignmentEntity } from '../../enrollment/entities/student-enrollment-assignment.entity';

import { CourseEntity } from './course.entity';

interface IAssignmentEntity {
  name: string;
  canvas_id?: string;

  course: CourseEntity;
  course_id: number;

  enrollmentAssignments: StudentLPEnrollmentAssignmentEntity[];
}

@Entity({ name: 'assignments' })
export class AssignmentEntity
  extends CanvasGenericEntity
  implements IAssignmentEntity
{
  @ApiProperty({ description: 'Course ID' })
  @Column()
  course_id: number;

  @ApiProperty({ description: 'Assignment name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ManyToOne(() => CourseEntity, (course) => course.assignments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @OneToMany(
    () => StudentLPEnrollmentAssignmentEntity,
    (assignment) => assignment.assignment,
  )
  enrollmentAssignments: StudentLPEnrollmentAssignmentEntity[];
}
