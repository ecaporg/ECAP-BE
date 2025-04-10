import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { NotFoundException } from '@/core';

import { TrackCalendarEntity } from '../entities/track-calendar.entity';

@Injectable()
export class TrackCalendarService {
  constructor(
    @InjectRepository(TrackCalendarEntity)
    private trackCalendarRepository: Repository<TrackCalendarEntity>,
  ) {}

  async findAll(trackId?: number): Promise<TrackCalendarEntity[]> {
    if (trackId) {
      return this.trackCalendarRepository.find({
        where: { track_id: trackId },
        relations: ['track'],
      });
    }
    return this.trackCalendarRepository.find({ relations: ['track'] });
  }

  async findOne(trackId: number, date: Date): Promise<TrackCalendarEntity> {
    const calendar = await this.trackCalendarRepository.findOne({
      where: { track_id: trackId, date },
      relations: ['track'],
    });

    if (!calendar) {
      throw new NotFoundException(
        `Calendar for track ${trackId} on date ${date} not found`,
      );
    }

    return calendar;
  }

  async create(
    data: Partial<TrackCalendarEntity>,
  ): Promise<TrackCalendarEntity> {
    const entity = this.trackCalendarRepository.create(data);
    return this.trackCalendarRepository.save(entity);
  }

  async update(
    trackId: number,
    date: Date,
    data: Partial<TrackCalendarEntity>,
  ): Promise<TrackCalendarEntity> {
    const calendar = await this.findOne(trackId, date);
    const updated = this.trackCalendarRepository.merge(calendar, data);
    return this.trackCalendarRepository.save(updated);
  }

  async delete(trackId: number, date: Date): Promise<void> {
    const calendar = await this.findOne(trackId, date);
    await this.trackCalendarRepository.remove(calendar);
  }

  async exists(trackId: number, date: Date): Promise<boolean> {
    const count = await this.trackCalendarRepository.count({
      where: { track_id: trackId, date },
    });
    return count > 0;
  }
}
