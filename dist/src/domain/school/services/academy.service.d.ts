import { DeepPartial, Repository } from 'typeorm';
import { BaseService } from '../../../core';
import { AdminService } from '../../staff/services/staff.service';
import { UserEntity } from '../../../auth/entities/user.entity';
import { AcademyEntity } from '../entities/academy.entity';
export declare class AcademyService extends BaseService<AcademyEntity> {
    private readonly academyRepository;
    private readonly adminService;
    constructor(academyRepository: Repository<AcademyEntity>, adminService: AdminService);
    adminCreate(data: DeepPartial<AcademyEntity>, user: UserEntity): Promise<AcademyEntity>;
}
