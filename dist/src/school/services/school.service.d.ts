import { DeepPartial, Repository } from 'typeorm';
import { BaseService } from 'src/core';
import { AdminService } from 'src/staff/services/staff.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { SchoolEntity } from '../entities/school.entity';
export declare class SchoolService extends BaseService<SchoolEntity> {
    private schoolRepository;
    private adminService;
    constructor(schoolRepository: Repository<SchoolEntity>, adminService: AdminService);
    adminCreate(data: DeepPartial<SchoolEntity>, user: UserEntity): Promise<SchoolEntity>;
}
