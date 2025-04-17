import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { GenericEntity } from '@/core/generic-entity';
import { AcademyEntity } from '@/school/entities/academy.entity';
import { SchoolEntity } from '@/school/entities/school.entity';
import { UserEntity } from '@/users/entities/user.entity';

@Entity({ name: 'directors' })
export class DirectorEntity extends GenericEntity {
  @ApiProperty({ description: 'School ID associated with this director' })
  @Column()
  school_id: number;

  @ApiProperty({ description: 'User ID associated with this director' })
  @Column()
  user_id: number;

  @ApiProperty({ description: 'Academy ID associated with this director' })
  @Column()
  academy_id: number;

  @ApiProperty({
    description: 'User associated with this director',
    type: () => UserEntity,
  })
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty({
    description: 'School associated with this director',
    type: () => Object,
  })
  @ManyToOne(() => SchoolEntity, (school) => school.directors)
  @JoinColumn({ name: 'school_id' })
  school: SchoolEntity;

  @ApiProperty({
    description: 'Academy associated with this director',
    type: () => Object,
  })
  @ManyToOne(() => AcademyEntity)
  @JoinColumn({ name: 'academy_id' })
  academy: AcademyEntity;
}
