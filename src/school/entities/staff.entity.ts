import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { DatedGenericEntity } from '../../core/generic-entity';
import { SampleEntity } from '../../students/entities/sample.entity';
import { UserEntity } from '../../users/entities/user.entity';

import { SchoolEntity } from './school.entity';

export abstract class StaffEntity extends DatedGenericEntity {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  school_id: number;

  @Index()
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Index()
  @ManyToOne(() => SchoolEntity)
  @JoinColumn({ name: 'school_id' })
  school: SchoolEntity;
}

@Entity({ name: 'teachers' })
export class TeacherEntity extends StaffEntity {
  @OneToMany(() => SampleEntity, (sample) => sample.teacher)
  samples: SampleEntity[];
}

@Entity({ name: 'admins' })
export class AdminEntity extends StaffEntity {}
