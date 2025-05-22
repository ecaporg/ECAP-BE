import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core';

import { TenantEntity } from '../entities/tenant.entity';

@Injectable()
export class TenantService extends BaseService<TenantEntity> {
  constructor(
    @InjectRepository(TenantEntity)
    private tenantRepository: Repository<TenantEntity>,
  ) {
    super(tenantRepository, {
      defaultRelations: {
        academies: true,
        tracks: {
          academicYear: true,
          semesters: true,
          subjects: true,
          learningPeriods: true,
        },
        schools: true,
      },
    });
  }
}
