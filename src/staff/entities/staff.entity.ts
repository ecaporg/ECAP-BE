import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { DatedGenericEntity } from '@/core/generic-entity';
import { AssignmentEntity } from '@/school/entities/subject-assignment.entity';
import { TenantEntity } from '@/tenant/entities/tenant.entity';
import { UserEntity } from '@/users/entities/user.entity';

export abstract class StaffEntity extends DatedGenericEntity {
  @ApiProperty({ description: 'User ID associated with this staff member' })
  @PrimaryColumn()
  id: number;

  @ApiProperty({
    description: 'User associated with this staff member',
    type: () => UserEntity,
  })
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'id' })
  user: UserEntity;
}

@Entity({ name: 'teachers' })
export class TeacherEntity extends StaffEntity {
  @ApiProperty({
    description: 'Assignments for this teacher',
    type: () => [{}],
  })
  @OneToMany(() => AssignmentEntity, (assignment) => assignment.teacher)
  assignments: AssignmentEntity[];
}

@Entity({
  name: 'admins',
  comment: 'Admins and superadmins table',
})
export class AdminEntity extends StaffEntity {
  @ApiProperty({
    description: 'Tenant ID associated with this admin/superadmin',
  })
  @PrimaryColumn()
  tenant_id: number;

  @ApiProperty({
    description: 'Tenant associated with this admin/superadmin',
    type: () => TenantEntity,
  })
  @ManyToOne(() => TenantEntity, (tenant) => tenant.admins)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;
}
