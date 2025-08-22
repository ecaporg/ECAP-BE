import { EntityId, PaginatedResult } from 'src/core';
import { TrackCalendarFilterDto } from '../dto/filters.dto';
import { CreateTrackCalendarDto, UpdateTrackCalendarDto } from '../dto/track-calendar.dto';
import { TrackCalendarEntity } from '../entities/track-calendar.entity';
import { TrackCalendarService } from '../services/track-calendar.service';
export declare class TrackCalendarController {
    private readonly trackCalendarService;
    constructor(trackCalendarService: TrackCalendarService);
    findAll(options?: TrackCalendarFilterDto): Promise<PaginatedResult<TrackCalendarEntity>>;
    findOne(id: EntityId): Promise<TrackCalendarEntity>;
    create(createTrackCalendarDto: CreateTrackCalendarDto): Promise<TrackCalendarEntity>;
    patch(id: EntityId, updateTrackCalendarDto: UpdateTrackCalendarDto): Promise<TrackCalendarEntity>;
    put(id: EntityId, updateTrackCalendarDto: UpdateTrackCalendarDto): Promise<TrackCalendarEntity>;
    delete(id: EntityId): Promise<void>;
}
