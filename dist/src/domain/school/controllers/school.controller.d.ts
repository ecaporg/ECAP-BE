import { EntityId, PaginatedResult } from '../../../core';
import { UserEntity } from '../../../auth/entities/user.entity';
import { SchoolFilterDto } from '../dto/filters.dto';
import { CreateSchoolDto, UpdateSchoolDto } from '../dto/school.dto';
import { SchoolEntity as School } from '../entities/school.entity';
import { SchoolService } from '../services/school.service';
export declare class SchoolController {
    private readonly schoolService;
    constructor(schoolService: SchoolService);
    findAll(options?: SchoolFilterDto): Promise<PaginatedResult<School>>;
    findOne(id: EntityId): Promise<School>;
    create(createSchoolDto: CreateSchoolDto, user: UserEntity): Promise<School>;
    patch(id: EntityId, updateSchoolDto: UpdateSchoolDto): Promise<School>;
    put(id: EntityId, updateSchoolDto: UpdateSchoolDto): Promise<School>;
    delete(id: EntityId): Promise<void>;
}
