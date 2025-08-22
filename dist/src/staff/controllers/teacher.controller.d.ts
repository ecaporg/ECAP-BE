import { EntityId } from 'src/core';
import { TeacherEntity } from '../entities/staff.entity';
import { TeacherService } from '../services/staff.service';
export declare class TeacherController {
    private readonly service;
    constructor(service: TeacherService);
    findOne(id: EntityId): Promise<TeacherEntity>;
}
