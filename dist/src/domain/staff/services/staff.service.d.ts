import { Repository } from 'typeorm';
import { BaseService } from '../../../core';
import { AdminEntity, DirectorEntity, TeacherEntity } from '../../staff/entities/staff.entity';
export declare class TeacherService extends BaseService<TeacherEntity> {
    private teacherRepository;
    constructor(teacherRepository: Repository<TeacherEntity>);
}
export declare class AdminService extends BaseService<AdminEntity> {
    private adminRepository;
    constructor(adminRepository: Repository<AdminEntity>);
}
export declare class DirectorService extends BaseService<DirectorEntity> {
    private directorRepository;
    constructor(directorRepository: Repository<DirectorEntity>);
}
