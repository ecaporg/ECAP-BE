import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

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

  async findCurrentAcademicYears(date?: Date) {
    const currentDate = date || new Date();
    const academicYears = await this.academicYearRepository.find({
      where: {
        tracks: {
          semesters: {
            start_date: LessThanOrEqual(currentDate),
            end_date: MoreThanOrEqual(currentDate),
          },
        },
      },
    });

    if (!academicYears.length) {
      return this.academicYearRepository
        .findOne({
          order: { to: 'DESC' },
        })
        .then((year) => (year ? [year] : []));
    }

    return academicYears;
  }
}
