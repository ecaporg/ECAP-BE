import { Column, Entity, OneToMany, Relation } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { CanvasGenericEntity } from '../../../core';

import { AssignmentEntity } from './assignment.entity';
import { SubjectEntity } from './subject.entity';

interface ICourseEntity {
  canvas_id?: string;

  name: string;

  assignments: Relation<AssignmentEntity[]>;
  subjects: Relation<SubjectEntity[]>;
}

@Entity({ name: 'courses' })
export class CourseEntity extends CanvasGenericEntity implements ICourseEntity {
  @ApiProperty({ description: 'Course name', maxLength: 250 })
  @Column({ length: 250 })
  name: string;

  @ApiProperty({
    description: 'Assignments associated with this course',
    type: () => [{}],
  })
  @OneToMany(() => AssignmentEntity, (assignment) => assignment.course)
  assignments: Relation<AssignmentEntity[]>;

  @OneToMany(() => SubjectEntity, (subject) => subject.course)
  subjects: Relation<SubjectEntity[]>;
}
