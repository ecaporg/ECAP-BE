import { Column, Entity, OneToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '../../core';
import { AdminEntity, TeacherEntity } from '../../staff/entities/staff.entity';
import { DirectorEntity } from '../../staff/entities/staff.entity';
import { StudentEntity } from '../../students/entities/student.entity';

import { RolesEnum } from '../enums/roles.enum';

@Entity({ name: 'users' })
export class UserEntity extends GenericEntity {
  @ApiProperty({ description: 'User email address', uniqueItems: true })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'User name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'User password (hashed)' })
  @Column()
  password: string;

  @ApiProperty({
    description: 'Whether the user account is active',
    default: true,
  })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Whether the user email is verified',
    default: false,
  })
  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @ApiProperty({ description: 'User refresh token', nullable: true })
  @Column({ nullable: true })
  refreshToken?: string;

  @ApiProperty({ description: 'User role', enum: RolesEnum, nullable: true })
  @Column({ nullable: true, enum: RolesEnum })
  role?: RolesEnum;

  @ApiProperty({
    description:
      'Additional information such as SIS user id, SIS import id, etc.',
    nullable: true,
  })
  @Column({ type: 'json', nullable: true })
  canvas_additional_info?: Record<string, any>;

  @ApiProperty({
    description: 'Student profiles associated with this user',
    type: () => [{}],
  })
  @OneToOne(() => StudentEntity, (student) => student.user)
  student?: StudentEntity;

  @ApiProperty({
    description: 'Teacher profiles associated with this user',
    type: () => [{}],
  })
  @OneToOne(() => TeacherEntity, (teacher) => teacher.user)
  teacher?: TeacherEntity;

  @ApiProperty({
    description: 'Director profiles associated with this user',
    type: () => [{}],
  })
  @OneToOne(() => DirectorEntity, (director) => director.user)
  director?: DirectorEntity;

  @ApiProperty({
    description: 'Admin profiles associated with this user',
    type: () => [{}],
  })
  @OneToOne(() => AdminEntity, (admin) => admin.user)
  admin?: AdminEntity;
}
