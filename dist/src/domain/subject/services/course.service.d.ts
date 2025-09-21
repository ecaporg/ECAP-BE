import { Repository } from 'typeorm';
import { BaseService } from '../../../core';
import { CourseEntity } from '../entities/course.entity';
export declare class CourseService extends BaseService<CourseEntity> {
    private subjectRepository;
    constructor(subjectRepository: Repository<CourseEntity>);
}
