import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { CanvasGenericEntity } from '../../../core';
import { StudentLPEnrollmentAssignmentEntity } from '../../enrollment/entities/student-enrollment-assignment.entity';
import { SubjectEntity } from '../../subject/entities/subject.entity';
import { UserEntity } from '../../users/entities/user.entity';

import {
  SampleFlagCompletedEntity,
  SampleFlagErrorEntity,
  SampleFlagMissingWorkEntity,
  SampleFlagRejectedEntity,
} from './sample-flag.entity';

export enum SampleStatus {
  CREATED = 'CREATED', // when a sample is created, and doesn't have any status yet, DB only value
  COMPLETED = 'COMPLETED',
  FLAGGED_TO_ADMIN = 'FLAGGED_TO_ADMIN',
  PENDING = 'PENDING',
  ERRORS_FOUND = 'ERRORS_FOUND',
  MISSING_SAMPLE = 'MISSING_SAMPLE',
  REASON_REJECTED = 'REASON_REJECTED',
}

export enum SampleFlagCategory {
  MISSING_SAMPLE = 'MISSING_SAMPLE',
  REASON_REJECTED = 'REASON_REJECTED',
  ERROR_IN_SAMPLE = 'ERROR_IN_SAMPLE',
}

/**
 * Describes the common possible states of a sample and the transition flows between them.
 *
 * Possible state transition flows:
 * 1. PENDING -> COMPLETED
 *    - A sample is pending review and then marked as completed.
 * 2. ERRORS_FOUND -> PENDING -> COMPLETED
 *    - A sample has errors, and it's fixed by the teacher and marked as completed.
 * 3. ERRORS_FOUND -> PENDING -> FLAGGED_TO_ADMIN (assign category: ERROR_IN_SAMPLE)
 *    - A sample has errors, and it's flagged to an admin by the teacher.
 * 4. PENDING -> FLAGGED_TO_ADMIN (assign category: ERROR_IN_SAMPLE)
 *    - A sample is pending review, an error is found, and it's flagged to an admin.
 * 5. PENDING -> FLAGGED_TO_ADMIN (assign category: ERROR_IN_SAMPLE) -> COMPLETED
 *    - A sample is pending review, an error is found, it's flagged to an admin,
 *      the issue is resolved, and then the sample is marked as completed.
 * 6. MISSING_SAMPLE -> FLAGGED_TO_ADMIN (assign category: MISSING_SAMPLE)
 *    - A sample is missing, and it's flagged to an admin by the teacher.
 * 7. MISSING_SAMPLE -> FLAGGED_TO_ADMIN (assign category: MISSING_SAMPLE) -> COMPLETED
 *    - A sample is missing, it's flagged to an admin, the issue is resolved,
 *      and then the sample is marked as completed.
 * 8. MISSING_SAMPLE -> FLAGGED_TO_ADMIN (assign category: MISSING_SAMPLE) -> REASON_REJECTED (assign category: REASON_REJECTED)
 *    - A sample is rejected by the admin.
 *
 * Other statuses like MISSING_SAMPLE or REASON_REJECTED might be initial states
 * or terminal states depending on the specific business logic.
 */

interface ISampleEntity {
  canvas_id?: string;
  date?: Date;
  status: SampleStatus;
  grade?: string;
  preview_url?: string;

  done_by: Relation<UserEntity>;
  done_by_id: number;

  flag_category: SampleFlagCategory;
  flag_completed: Relation<SampleFlagCompletedEntity>;
  flag_errors: Relation<SampleFlagErrorEntity>;
  flag_missing_work: Relation<SampleFlagMissingWorkEntity>;
  flag_rejected: Relation<SampleFlagRejectedEntity>;

  subject: Relation<SubjectEntity>;
  subject_id: number;

  student_lp_enrollment_assignment: Relation<StudentLPEnrollmentAssignmentEntity>;
}

@Entity({ name: 'samples' })
export class SampleEntity extends CanvasGenericEntity implements ISampleEntity {
  @ApiProperty({
    description: 'Sample status',
    maxLength: 50,
    enum: SampleStatus,
  })
  @Column({ type: 'enum', enum: SampleStatus })
  status: SampleStatus;

  @ApiProperty({
    description: 'Sample flag category',
    maxLength: 50,
    enum: SampleFlagCategory,
  })
  @Column({ type: 'enum', enum: SampleFlagCategory, nullable: true })
  flag_category: SampleFlagCategory;

  @ApiProperty({
    description: 'User ID of the user who set completed status of this sample',
    nullable: true,
  })
  @Column({ nullable: true })
  done_by_id: number;

  @ApiProperty({
    description: 'Sample grade (e.g. 1/5, 2/5, 3/5, 4/5, 5/5)',
    maxLength: 50,
    nullable: true,
  })
  @Column({ nullable: true })
  grade?: string;

  @ApiProperty({
    description: 'Sample submission date',
    nullable: true,
  })
  @Column({ nullable: true })
  date?: Date;

  @ApiProperty({
    description: 'Sample preview URL',
    nullable: true,
  })
  @Column({ nullable: true, length: 255 })
  preview_url?: string;

  @ApiProperty({
    description: 'Canvas submission ID',
    nullable: true,
  })
  @Column({ nullable: true, type: 'bigint' })
  canvas_submission_id?: number;

  @ApiProperty({ description: 'Subject ID' })
  @Column()
  subject_id: number;

  @ManyToOne(() => SubjectEntity, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'subject_id' })
  subject: Relation<SubjectEntity>;

  @ApiProperty({
    description: 'User who set completed status of this sample',
    type: () => Object,
  })
  @ManyToOne(() => UserEntity, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'done_by_id' })
  done_by: Relation<UserEntity>;

  @ApiProperty({
    description: 'Sample flag errors',
    type: () => SampleFlagErrorEntity,
  })
  @OneToOne(() => SampleFlagErrorEntity, (flag) => flag.sample)
  flag_errors: Relation<SampleFlagErrorEntity>;

  @ApiProperty({
    description: 'Sample flag missing work',
    type: () => SampleFlagMissingWorkEntity,
  })
  @OneToOne(() => SampleFlagMissingWorkEntity, (flag) => flag.sample)
  flag_missing_work: Relation<SampleFlagMissingWorkEntity>;

  @ApiProperty({
    description: 'Sample flag rejected',
    type: () => SampleFlagRejectedEntity,
  })
  @OneToOne(() => SampleFlagRejectedEntity, (flag) => flag.sample)
  flag_rejected: Relation<SampleFlagRejectedEntity>;

  @ApiProperty({
    description: 'Sample flag completed',
    type: () => SampleFlagCompletedEntity,
  })
  @OneToOne(() => SampleFlagCompletedEntity, (flag) => flag.sample)
  flag_completed: Relation<SampleFlagCompletedEntity>;

  @OneToOne(
    () => StudentLPEnrollmentAssignmentEntity,
    (assignment) => assignment.sample,
  )
  student_lp_enrollment_assignment: Relation<StudentLPEnrollmentAssignmentEntity>;
}
