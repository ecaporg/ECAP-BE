import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { AcademyEntity } from '@/school/entities/academy.entity';
import { SchoolEntity } from '@/school/entities/school.entity';
import { SemesterEntity } from '@/school/entities/semester.entity';
import { TenantEntity } from '@/school/entities/tenant.entity';
import { AdminEntity } from '@/staff/entities/staff.entity';
import { TrackEntity } from '@/track/entities/track.entity';
type FiltersResponse = TenantEntity;

export class FiltersResponseDto implements FiltersResponse {
  @ApiProperty({
    type: [AcademyEntity],
    isArray: true,
    description: 'Academies available for the tenant',
  })
  academies: any;

  @ApiProperty({
    type: [AdminEntity],
    isArray: true,
    description: 'Admins available for the tenant',
  })
  admins: any;

  @ApiProperty({
    type: [SchoolEntity],
    isArray: true,
    description: 'Schools available for the tenant',
  })
  schools: any;

  @ApiProperty({
    type: [TrackEntity],
    isArray: true,
    description: 'Tracks available for the tenant',
  })
  tracks: any;

  @ApiProperty({
    type: [SemesterEntity],
    isArray: true,
    description: 'Semesters available for the tenant',
  })
  semesters: any;

  @ApiProperty({ description: 'Tenant name' })
  name: string;

  @ApiProperty({ description: 'Tenant ID' })
  id: number;

  @ApiProperty({ description: 'Tenant updated at' })
  updatedAt: Date;

  @ApiProperty({ description: 'Tenant created at' })
  createdAt: Date;
}
