import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';
import { AcademyEntity } from '@/school/entities/academy.entity';
import { SchoolEntity } from '@/school/entities/school.entity';
import { UserEntity } from '@/users/entities/user.entity';

@Entity({ name: 'directors' })
export class DirectorEntity extends GenericEntity {
  @Column()
  school_id: number;

  @Column()
  user_id: number;

  @Column()
  academy_id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => SchoolEntity)
  @JoinColumn({ name: 'school_id' })
  school: SchoolEntity;

  @ManyToOne(() => AcademyEntity)
  @JoinColumn({ name: 'academy_id' })
  academy: AcademyEntity;
}
