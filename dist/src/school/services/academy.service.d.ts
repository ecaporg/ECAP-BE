import { DeepPartial, Repository } from 'typeorm';
import { BaseService } from 'src/core';
import { AdminService } from 'src/staff/services/staff.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { AcademyEntity } from '../entities/academy.entity';
export declare class AcademyService extends BaseService<AcademyEntity> {
    private readonly academyRepository;
    private readonly adminService;
    constructor(academyRepository: Repository<AcademyEntity>, adminService: AdminService);
    adminCreate(data: DeepPartial<AcademyEntity>, user: UserEntity): Promise<AcademyEntity>;
}
