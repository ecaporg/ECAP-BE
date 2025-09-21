import { ITrack } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { TenantGenericEntity } from '../../../core';
import { TenantEntity } from '../../tenant/entities/tenant.entity';
import { AcademicYearEntity } from './academic-year.entity';
import { SemesterEntity } from './semester.entity';
import { TrackCalendarEntity } from './track-calendar.entity';
import { TrackLearningPeriodEntity } from './track-learning-period.entity';
export declare class TrackEntity extends TenantGenericEntity implements ITrack {
    name: string;
    start_date: Date;
    end_date: Date;
    academic_year_id: number;
    tenant: Relation<TenantEntity>;
    academicYear: Relation<AcademicYearEntity>;
    calendar: Relation<TrackCalendarEntity>;
    learningPeriods: Relation<TrackLearningPeriodEntity[]>;
    semesters: Relation<SemesterEntity[]>;
}
