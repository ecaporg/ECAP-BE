import { AcademicYearEntity } from '../../../domain/track/entities/academic-year.entity';
import { TrackLearningPeriodEntity } from '../../../domain/track/entities/track-learning-period.entity';
export declare class DashboardStatItemDto {
    learningPeriods: TrackLearningPeriodEntity[];
    compliance: number;
    completed: boolean;
}
export declare class AcademyStatItemDto {
    academy_id: string;
    academy_name: string;
    compliance: number;
    yearToDateCompliance: number;
}
export declare class DashboardStatsResponseDto {
    beforeThePreviousOne: DashboardStatItemDto;
    previousLP?: DashboardStatItemDto;
    currentLP: DashboardStatItemDto;
    upcomingLP: DashboardStatItemDto;
    academicYear: AcademicYearEntity;
    yearToDateCompliance?: number;
    academies?: AcademyStatItemDto[];
}
