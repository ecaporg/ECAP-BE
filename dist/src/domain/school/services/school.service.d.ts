import { DeepPartial, Repository } from 'typeorm';
import { BaseService } from '../../../core';
import { AdminService } from '../../staff/services/staff.service';
import { UserEntity } from '../../../auth/entities/user.entity';
import { SchoolEntity } from '../entities/school.entity';
export declare class SchoolService extends BaseService<SchoolEntity> {
    private schoolRepository;
    private adminService;
    constructor(schoolRepository: Repository<SchoolEntity>, adminService: AdminService);
    adminCreate(data: DeepPartial<SchoolEntity>, user: UserEntity): Promise<SchoolEntity>;
}
