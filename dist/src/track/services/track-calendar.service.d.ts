import { Repository } from 'typeorm';
import { BaseService } from 'src/core';
import { TrackCalendarEntity } from '../entities/track-calendar.entity';
export declare class TrackCalendarService extends BaseService<TrackCalendarEntity> {
    private trackCalendarRepository;
    constructor(trackCalendarRepository: Repository<TrackCalendarEntity>);
}
