import { DeepPartial, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '../../../core';
import { AdminService } from '../../staff/services/staff.service';
import { AcademicYearService } from '../../track/services/academic-year.service';
import { UserEntity } from '../../../auth/entities/user.entity';
import { AcademicYearEntity } from '../entities/academic-year.entity';
import { TrackEntity } from '../entities/track.entity';

import { TrackCalendarService } from './track-calendar.service';

@Injectable()
export class TrackService extends BaseService<TrackEntity> {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    private readonly adminService: AdminService,
    private readonly academicYearService: AcademicYearService,
    private readonly trackCalendarService: TrackCalendarService,
  ) {
    super(trackRepository, {
      defaultRelations: ['tenant', 'academicYear'],
    });
  }

  async adminCreate(
    createTrackDto: DeepPartial<TrackEntity>,
    user: UserEntity,
  ): Promise<TrackEntity> {
    const admin = await this.adminService.findOne({ id: user.id } as any);
    let academicYear: AcademicYearEntity;
    const from = (createTrackDto.start_date as Date).getFullYear();
    const to = (createTrackDto.end_date as Date).getFullYear();

    try {
      academicYear = await this.academicYearService.findOne({
        from,
        to,
      });
    } catch (ignore) {
      academicYear = await this.academicYearService.create({
        from,
        to,
      });
    }

    return this.create({
      ...createTrackDto,
      tenant_id: admin.tenant_id,
      academic_year_id: academicYear.id,
    });
  }
}
