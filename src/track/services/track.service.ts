import { DeepPartial, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core';
import { AdminService } from '@/staff/services/staff.service';
import { UserEntity } from '@/users/entities/user.entity';

import { TrackEntity } from '../entities/track.entity';

@Injectable()
export class TrackService extends BaseService<TrackEntity> {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    private readonly adminService: AdminService,
  ) {
    super(trackRepository, {
      defaultRelations: ['tenant', 'academicYear'],
    });
  }

  async adminCreate(
    createTrackDto: DeepPartial<TrackEntity>,
    user: UserEntity,
  ): Promise<TrackEntity> {
    const admin = await this.adminService.findOne({ id: user.id } as any);

    return this.create({ ...createTrackDto, tenant_id: admin.tenant_id });
  }
}
