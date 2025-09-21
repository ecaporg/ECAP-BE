import { Repository } from 'typeorm';
import { BaseService } from '../../../core';
import { StudentEntity } from '../entities/student.entity';
export declare class StudentService extends BaseService<StudentEntity> {
    private studentRepository;
    constructor(studentRepository: Repository<StudentEntity>);
}
