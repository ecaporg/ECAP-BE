import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core';
import { StudentLPEnrollmentEntity } from '@/enrollment/entities/student-enrollment.entity';
import { SubjectEntity } from '@/track/entities/subject.entity';
import { UserEntity } from '@/users/entities/user.entity';

import {
  SampleFlagCompletedEntity,
  SampleFlagErrorEntity,
  SampleFlagMissingWorkEntity,
  SampleFlagRejectedEntity,
} from './sample-flag.entity';

export enum SampleStatus {
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
    description: 'Sample flag category',
    maxLength: 250,
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
    description: 'Student LP enrollment ID associated with this sample',
  })
  @Column()
  student_lp_enrollment_id: number;

  @ApiProperty({
    description: 'Subject ID associated with this sample',
    nullable: true,
  })
  @Column({ nullable: true })
  subject_id?: number;

  @ApiProperty({
    description: 'Sample grade (e.g. 1/5, 2/5, 3/5, 4/5, 5/5)',
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
    description: 'Subject associated with this sample',
    type: () => SubjectEntity,
  })
  @ManyToOne(() => SubjectEntity, (subject) => subject.samples)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @ApiProperty({
    description: 'Student LP enrollment associated with this sample',
    type: () => Object,
  })
  @ManyToOne(
    () => StudentLPEnrollmentEntity,
    (student_lp_enrollment) => student_lp_enrollment.samples,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'student_lp_enrollment_id' })
  student_lp_enrollment: StudentLPEnrollmentEntity;

  @ApiProperty({
    description: 'User who set completed status of this sample',
    type: () => Object,
  })
  @ManyToOne(() => UserEntity, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'done_by_id' })
  done_by: UserEntity;

  @ApiProperty({
    description: 'Sample flag errors',
    type: () => SampleFlagErrorEntity,
  })
  @OneToOne(() => SampleFlagErrorEntity, (flag) => flag.sample)
  flag_errors: SampleFlagErrorEntity;

  @ApiProperty({
    description: 'Sample flag missing work',
    type: () => SampleFlagMissingWorkEntity,
  })
  @OneToOne(() => SampleFlagMissingWorkEntity, (flag) => flag.sample)
  flag_missing_work: SampleFlagMissingWorkEntity;

  @ApiProperty({
    description: 'Sample flag rejected',
    type: () => SampleFlagRejectedEntity,
  })
  @OneToOne(() => SampleFlagRejectedEntity, (flag) => flag.sample)
  flag_rejected: SampleFlagRejectedEntity;

  @ApiProperty({
    description: 'Sample flag completed',
    type: () => SampleFlagCompletedEntity,
  })
  @OneToOne(() => SampleFlagCompletedEntity, (flag) => flag.sample)
  flag_completed: SampleFlagCompletedEntity;
}
