import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core';

import { TrackCalendarEntity } from '../entities/track-calendar.entity';

@Injectable()
export class TrackCalendarService extends BaseService<TrackCalendarEntity> {
  constructor(
    @InjectRepository(TrackCalendarEntity)
    private trackCalendarRepository: Repository<TrackCalendarEntity>,
  ) {
    super(trackCalendarRepository, {
      defaultRelations: ['track'],
    });
  }
}
