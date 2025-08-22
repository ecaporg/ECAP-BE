import { Repository } from 'typeorm';
import { BaseService } from 'src/core';
import { AcademicYearEntity } from '../entities/academic-year.entity';
export declare class AcademicYearService extends BaseService<AcademicYearEntity> {
    private readonly academicYearRepository;
    constructor(academicYearRepository: Repository<AcademicYearEntity>);
    findCurrentAcademicYears(date?: Date): Promise<AcademicYearEntity[]>;
}
