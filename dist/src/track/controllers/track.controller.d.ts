import { EntityId, PaginatedResult } from 'src/core';
import { UserEntity } from 'src/users/entities/user.entity';
import { TrackFilterDto } from '../dto/filters.dto';
import { CreateTrackDto, UpdateTrackDto } from '../dto/track.dto';
import { TrackEntity } from '../entities/track.entity';
import { TrackService } from '../services/track.service';
export declare class TrackController {
    private readonly trackService;
    constructor(trackService: TrackService);
    findAll(options?: TrackFilterDto): Promise<PaginatedResult<TrackEntity>>;
    findAllPeriods(options?: TrackFilterDto): Promise<PaginatedResult<TrackEntity>>;
    findAllSemesters(options?: TrackFilterDto): Promise<PaginatedResult<TrackEntity>>;
    findOne(id: EntityId): Promise<TrackEntity>;
    create(createTrackDto: CreateTrackDto, user: UserEntity): Promise<TrackEntity>;
    patch(id: EntityId, updateTrackDto: UpdateTrackDto): Promise<TrackEntity>;
    put(id: EntityId, updateTrackDto: UpdateTrackDto): Promise<TrackEntity>;
    delete(id: EntityId): Promise<void>;
}
