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

import { DatedGenericEntity } from '../../../core';
import { UserEntity } from '../../../auth/entities/user.entity';

import { SampleEntity } from './sample.entity';

interface ISampleFlagEntity {
  id: number;
  sample: Relation<SampleEntity>;
  user: Relation<UserEntity>;
  user_id: number;
}

interface ISampleFlagErrorEntity extends ISampleFlagEntity {
  comment: string;
}

interface ISampleFlagMissingWorkEntity extends ISampleFlagEntity {
  reason: string;
}

interface ISampleFlagCompletedEntity extends ISampleFlagEntity {
  message: string;
}

interface ISampleFlagRejectedEntity extends ISampleFlagEntity {
  reason: string;
}

export class SampleFlagEntity
  extends DatedGenericEntity
  implements ISampleFlagEntity
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
  implements ISampleFlagErrorEntity
{
  @Column()
  @ApiProperty({ description: 'Comment' })
  comment: string;
}

@Entity({ name: 'sample_flag_missing_work' })
export class SampleFlagMissingWorkEntity
  extends SampleFlagEntity
  implements ISampleFlagMissingWorkEntity
{
  @Column()
  @ApiProperty({ description: 'Reason' })
  reason: string;
}

@Entity({ name: 'sample_flag_completed' })
export class SampleFlagCompletedEntity
  extends SampleFlagEntity
  implements ISampleFlagCompletedEntity
{
  @Column()
  @ApiProperty({ description: 'Message' })
  message: string;
}

@Entity({ name: 'sample_flag_rejected' })
export class SampleFlagRejectedEntity
  extends SampleFlagEntity
  implements ISampleFlagRejectedEntity
{
  @Column()
  @ApiProperty({ description: 'Reason' })
  reason: string;
}
