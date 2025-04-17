import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { DatedGenericEntity } from '@/core/generic-entity';
import { SchoolEntity } from '@/school/entities/school.entity';
import { AssignmentEntity } from '@/school/entities/subject-assignment.entity';
import { TenantEntity } from '@/school/entities/tenant.entity';
import { SampleEntity } from '@/students/entities/sample.entity';
import { UserEntity } from '@/users/entities/user.entity';

export abstract class StaffEntity extends DatedGenericEntity {
  @ApiProperty({ description: 'User ID associated with this staff member' })
  @PrimaryColumn()
  user_id: number;

  @ApiProperty({
    description: 'User associated with this staff member',
    type: () => UserEntity,
  })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}

@Entity({ name: 'teachers' })
export class TeacherEntity extends StaffEntity {
  @ApiProperty({ description: 'School ID associated with this teacher' })
  @PrimaryColumn()
  school_id: number;

  @ApiProperty({
    description: 'School associated with this teacher',
    type: () => SchoolEntity,
  })
  @ManyToOne(() => SchoolEntity)
  @JoinColumn({ name: 'school_id' })
  school: SchoolEntity;

  @ApiProperty({
    description: 'Samples created by this teacher',
    type: () => [SampleEntity],
  })
  @OneToMany(() => SampleEntity, (sample) => sample.done_by_teacher)
  samples: SampleEntity[];

  @ApiProperty({
    description: 'Assignments for this teacher',
    type: () => [AssignmentEntity],
  })
  @OneToMany(() => AssignmentEntity, (assignment) => assignment.teacher)
  assignments: AssignmentEntity[];
}

@Entity({ name: 'admins' })
export class AdminEntity extends StaffEntity {
  @ApiProperty({ description: 'Tenant ID associated with this admin' })
  @PrimaryColumn()
  tenant_id: number;

  @ApiProperty({
    description: 'Tenant associated with this admin',
    type: () => TenantEntity,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.admins)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;
}
