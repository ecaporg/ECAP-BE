import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { DatedGenericEntity } from '@/core';
import { UserEntity } from '@/users/entities/user.entity';

import { SampleEntity } from './sample.entity';

export class SampleFlagEntity extends DatedGenericEntity {
  @ApiProperty({ description: 'Sample ID' })
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'User ID', nullable: true })
  user_id: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ description: 'User', type: () => Object })
  user: UserEntity;

  @OneToOne(() => SampleEntity, (sample) => sample.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  @ApiProperty({ description: 'Sample', type: () => Object })
  sample: SampleEntity;
}

@Entity({ name: 'sample_flag_errors' })
export class SampleFlagErrorEntity extends SampleFlagEntity {
  @Column()
  @ApiProperty({ description: 'Comment' })
  comment: string;
}

@Entity({ name: 'sample_flag_missing_work' })
export class SampleFlagMissingWorkEntity extends SampleFlagEntity {
  @Column()
  @ApiProperty({ description: 'Reason' })
  reason: string;
}

@Entity({ name: 'sample_flag_completed' })
export class SampleFlagCompletedEntity extends SampleFlagEntity {
  @Column()
  @ApiProperty({ description: 'Message' })
  message: string;
}

@Entity({ name: 'sample_flag_rejected' })
export class SampleFlagRejectedEntity extends SampleFlagEntity {
  @Column()
  @ApiProperty({ description: 'Reason' })
  reason: string;
}
