import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core/generic-entity';
import { AssignmentPeriodEntity } from '@/school/entities/subject-assignment.entity';
import { TeacherEntity } from '@/staff/entities/staff.entity';
import { SubjectEntity } from '@/track/entities/subject.entity';

export enum SampleStatus {
  COMPLETED = 'COMPLETED',
  FLAGGED_TO_ADMIN = 'FLAGGED_TO_ADMIN',
  PENDING = 'PENDING',
  ERRORS_FOUND = 'ERRORS_FOUND',
  MISSING_SAMPLE = 'MISSING_SAMPLE',
  REASON_REJECTED = 'REASON_REJECTED',
}

@Entity({ name: 'samples' })
export class SampleEntity extends GenericEntity {
  @ApiProperty({ description: 'Assignment title', maxLength: 250 })
  @Column({ length: 250 })
  assignment_title: string;

  @ApiProperty({
    description: 'Sample status',
    maxLength: 250,
    enum: SampleStatus,
  })
  @Column({ type: 'enum', enum: SampleStatus })
  status: SampleStatus;

  @ApiProperty({
    description: 'User ID of the teacher who created this sample',
    nullable: true,
  })
  @Column({ nullable: true })
  user_id: number;

  @ApiProperty({
    description: 'School ID where this sample was created',
    nullable: true,
  })
  @Column({ nullable: true })
  school_id: number;

  @ApiProperty({
    description: 'Assignment period ID associated with this sample',
  })
  @Column()
  assignment_period_id: number;

  @ApiProperty({ description: 'Subject ID associated with this sample' })
  @Column()
  subject_id: number;

  @ApiProperty({
    description: 'Subject associated with this sample',
    type: () => SubjectEntity,
  })
  @ManyToOne(() => SubjectEntity, (subject) => subject.samples)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ApiProperty({
    description: 'Assignment period associated with this sample',
    type: () => Object,
  })
  @ManyToOne(
    () => AssignmentPeriodEntity,
    (assignment_period) => assignment_period.samples,
  )
  @JoinColumn({ name: 'assignment_period_id' })
  assignment_period: AssignmentPeriodEntity;

  @ApiProperty({
    description: 'Teacher who created this sample',
    type: () => Object,
  })
  @ManyToOne(() => TeacherEntity, (teacher) => teacher.samples)
  @JoinColumn([
    { name: 'user_id', referencedColumnName: 'user_id' },
    { name: 'school_id', referencedColumnName: 'school_id' },
  ])
  done_by_teacher: TeacherEntity;
}
