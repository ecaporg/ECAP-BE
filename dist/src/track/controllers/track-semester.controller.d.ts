import { EntityId, PaginatedResult } from 'src/core';
import { TrackSemesterFilterDto } from '../dto/filters.dto';
import { CreateTrackSemesterDto, UpdateTrackSemesterDto } from '../dto/track-semester.dto';
import { SemesterEntity } from '../entities/semester.entity';
import { SemesterService } from '../services/semester.service';
export declare class TrackSemesterController {
    private readonly semesterService;
    constructor(semesterService: SemesterService);
    findAll(options?: TrackSemesterFilterDto): Promise<PaginatedResult<SemesterEntity>>;
    findOne(id: EntityId): Promise<SemesterEntity>;
    create(createTrackSemesterDto: CreateTrackSemesterDto): Promise<SemesterEntity>;
    patch(id: EntityId, updateTrackSemesterDto: UpdateTrackSemesterDto): Promise<SemesterEntity>;
    put(id: EntityId, updateTrackSemesterDto: UpdateTrackSemesterDto): Promise<SemesterEntity>;
    delete(id: EntityId): Promise<void>;
}
