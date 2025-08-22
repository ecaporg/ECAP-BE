import { DeepPartial, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../core';
import { AdminService } from '../../staff/services/staff.service';
import { UserEntity } from '../../users/entities/user.entity';

import { SchoolEntity } from '../entities/school.entity';

@Injectable()
export class SchoolService extends BaseService<SchoolEntity> {
  constructor(
    @InjectRepository(SchoolEntity)
    private schoolRepository: Repository<SchoolEntity>,
    private adminService: AdminService,
  ) {
    super(schoolRepository, {
      defaultRelations: ['tenant'],
    });
  }

  async adminCreate(data: DeepPartial<SchoolEntity>, user: UserEntity) {
    const admin = await this.adminService.findOne({ id: user.id });

    const school = this.create({
      ...data,
      tenant_id: admin.tenant.id,
    });

    return school;
  }
}
