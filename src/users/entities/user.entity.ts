import { Column, Entity, OneToMany } from 'typeorm';

import { GenericEntity } from '@/core/generic-entity';
import { DirectorEntity } from '@/staff/entities/director.entity';
import { AdminEntity, TeacherEntity } from '@/staff/entities/staff.entity';
import { StudentEntity } from '@/students/entities/student.entity';

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

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ nullable: true, enum: RolesEnum })
  role?: RolesEnum;

  @OneToMany(() => StudentEntity, (student) => student.user)
  students: StudentEntity[];

  @OneToMany(() => TeacherEntity, (teacher) => teacher.user)
  teachers: TeacherEntity[];

  @OneToMany(() => DirectorEntity, (director) => director.user)
  directors: DirectorEntity[];

  @OneToMany(() => AdminEntity, (admin) => admin.user)
  admins: AdminEntity[];
}
