import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core/services/base.service';

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
        admins: true,
        tracks: {
          academicYear: {
            semesters: true,
          },
          subjects: true,
          learningPeriods: true,
        },
        schools: true,
      },
    });
  }
}
