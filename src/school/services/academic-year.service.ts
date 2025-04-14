import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core';

import { AcademicYearEntity } from '../entities/academic-year.entity';

@Injectable()
export class AcademicYearService extends BaseService<AcademicYearEntity> {
  constructor(
    @InjectRepository(AcademicYearEntity)
    private readonly academicYearRepository: Repository<AcademicYearEntity>,
  ) {
    super(academicYearRepository);
  }

  async findByYearRange(
    from: number,
    to: number,
  ): Promise<AcademicYearEntity[]> {
    return await this.academicYearRepository.find({
      where: { from, to },
      relations: ['semesters', 'learningPeriods'],
    });
  }

  async getCurrentAcademicYear(): Promise<AcademicYearEntity> {
    const currentYear = new Date().getFullYear();
    return await this.academicYearRepository.findOne({
      where: { from: currentYear },
      relations: ['semesters', 'learningPeriods'],
    });
  }
}
