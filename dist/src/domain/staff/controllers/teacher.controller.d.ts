import { EntityId, PaginatedResult } from '../../../core';
import { TeachersFilterDto } from '../dto/filters.dto';
import { TeacherEntity } from '../entities/staff.entity';
import { TeacherService } from '../services/staff.service';
export declare class TeacherController {
    private readonly service;
    constructor(service: TeacherService);
    findAll(options?: TeachersFilterDto): Promise<PaginatedResult<TeacherEntity, any>>;
    findOne(id: EntityId): Promise<TeacherEntity>;
}
