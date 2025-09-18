import { DeepPartial, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../../core';
import { AdminService } from '../../staff/services/staff.service';
import { UserEntity } from '../../../auth/entities/user.entity';
import { AcademyEntity } from '../entities/academy.entity';

@Injectable()
export class AcademyService extends BaseService<AcademyEntity> {
  constructor(
    @InjectRepository(AcademyEntity)
    private readonly academyRepository: Repository<AcademyEntity>,
    private readonly adminService: AdminService,
  ) {
    super(academyRepository);
  }

  async adminCreate(data: DeepPartial<AcademyEntity>, user: UserEntity) {
    const admin = await this.adminService.findOne({ id: user.id });

    const academy = this.create({
      ...data,
      tenant_id: admin.tenant.id,
    });

    return academy;
  }
}
