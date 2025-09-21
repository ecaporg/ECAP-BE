import { DeepPartial, Repository } from 'typeorm';
import { BaseService } from '../../../core';
import { AdminService } from '../../staff/services/staff.service';
import { AcademicYearService } from '../../track/services/academic-year.service';
import { UserEntity } from '../../../auth/entities/user.entity';
import { TrackEntity } from '../entities/track.entity';
import { TrackCalendarService } from './track-calendar.service';
export declare class TrackService extends BaseService<TrackEntity> {
    private readonly trackRepository;
    private readonly adminService;
    private readonly academicYearService;
    private readonly trackCalendarService;
    constructor(trackRepository: Repository<TrackEntity>, adminService: AdminService, academicYearService: AcademicYearService, trackCalendarService: TrackCalendarService);
    adminCreate(createTrackDto: DeepPartial<TrackEntity>, user: UserEntity): Promise<TrackEntity>;
}
