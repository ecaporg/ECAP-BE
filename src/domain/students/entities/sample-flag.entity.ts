import {
  ISampleFlag,
  ISampleFlagCompleted,
  ISampleFlagError,
  ISampleFlagMissingWork,
  ISampleFlagRejected,
} from 'ecap-lib/dist/domain';
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

import { UserEntity } from '../../../auth/entities/user.entity';
import { DatedGenericEntity } from '../../../core';

import { SampleEntity } from './sample.entity';

export class SampleFlagEntity
  extends DatedGenericEntity
  implements ISampleFlag
{
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
  user: Relation<UserEntity>;

  @OneToOne(() => SampleEntity, (sample) => sample.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  @ApiProperty({ description: 'Sample', type: () => Object })
  sample: Relation<SampleEntity>;
}

@Entity({ name: 'sample_flag_errors' })
export class SampleFlagErrorEntity
  extends SampleFlagEntity
  implements ISampleFlagError
{
  @Column()
  @ApiProperty({ description: 'Comment' })
  comment: string;
}

@Entity({ name: 'sample_flag_missing_work' })
export class SampleFlagMissingWorkEntity
  extends SampleFlagEntity
  implements ISampleFlagMissingWork
{
  @Column()
  @ApiProperty({ description: 'Reason' })
  reason: string;
}

@Entity({ name: 'sample_flag_completed' })
export class SampleFlagCompletedEntity
  extends SampleFlagEntity
  implements ISampleFlagCompleted
{
  @Column()
  @ApiProperty({ description: 'Message' })
  message: string;
}

@Entity({ name: 'sample_flag_rejected' })
export class SampleFlagRejectedEntity
  extends SampleFlagEntity
  implements ISampleFlagRejected
{
  @Column()
  @ApiProperty({ description: 'Reason' })
  reason: string;
}
