import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  TableInheritance,
} from 'typeorm';

import { GenericEntity } from '../../core/generic-entity';
import { SampleEntity } from '../../students/entities/sample.entity';
import { UserEntity } from '../../users/entities/user.entity';

import { SchoolEntity } from './school.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' }, pattern: 'STI' })
export abstract class StaffEntity extends GenericEntity {
  @Column()
  user_id: number;

  @Column()
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

@Entity({ name: 'directors' })
export class DirectorEntity extends StaffEntity {}

@Entity({ name: 'admins' })
export class AdminEntity extends StaffEntity {}
