import { EntityId, PaginatedResult } from 'src/core';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateAcademyDto, UpdateAcademyDto } from '../dto/academy.dto';
import { SchoolFilterDto } from '../dto/filters.dto';
import { AcademyEntity as Academy } from '../entities/academy.entity';
import { AcademyService } from '../services/academy.service';
export declare class AcademyController {
    private readonly academyService;
    constructor(academyService: AcademyService);
    findAll(options?: SchoolFilterDto): Promise<PaginatedResult<Academy>>;
    findOne(id: EntityId): Promise<Academy>;
    create(createAcademyDto: CreateAcademyDto, user: UserEntity): Promise<Academy>;
    patch(id: EntityId, updateAcademyDto: UpdateAcademyDto): Promise<Academy>;
    put(id: EntityId, updateAcademyDto: UpdateAcademyDto): Promise<Academy>;
    delete(id: EntityId): Promise<void>;
}
