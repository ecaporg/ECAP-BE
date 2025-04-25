import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core/services/base.service';

import { TrackEntity } from '../entities/track.entity';

@Injectable()
export class TrackService extends BaseService<TrackEntity> {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {
    super(trackRepository, {
      defaultRelations: ['academicYear', 'tenant'],
    });
  }
}
