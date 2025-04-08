import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { DatedGenericEntity } from '../../core/generic-entity';
import { UserEntity } from '../../users/entities/user.entity';

import { SchoolEntity } from './school.entity';

@Entity({ name: 'directors' })
export class DirectorEntity extends DatedGenericEntity {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  school_id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => SchoolEntity)
  @JoinColumn({ name: 'school_id' })
  school: SchoolEntity;
}
