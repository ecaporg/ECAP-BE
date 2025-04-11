import { Column, Entity, Index } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';

import { RolesEnum } from '../enums/roles.enum';

@Entity({ name: 'users' })
export class UserEntity extends GenericEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Index()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Index()
  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ nullable: true, enum: RolesEnum })
  role?: RolesEnum;
}
