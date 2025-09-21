import { UserEntity } from '../../../auth/entities/user.entity';
import { TrackLearningPeriodEntity } from '../../../domain/track/entities/track-learning-period.entity';
import { AcademicYearService } from '../../../domain/track/services/academic-year.service';
import { TrackLearningPeriodService } from '../../../domain/track/services/track-learning-period.service';
import { DashboardStatsResponseDto } from '../dto/dashboard-stats.dto';
import { DashboardFilterDto } from '../dto/filters.dto';
type LearningPeriodGroup = [
    {
        start_date: Date;
        end_date: Date;
    },
    TrackLearningPeriodEntity[]
];
type DashboardStatsWithGroups = DashboardStatsResponseDto & {
    groups: LearningPeriodGroup[];
    periodAverages: {
        percentage: number;
        start_date: string;
        end_date: string;
        academy_id: string;
        academy_name: string;
    }[];
};
export declare class DashboardService {
    private trackLearningPeriodService;
    private academicYearService;
    constructor(trackLearningPeriodService: TrackLearningPeriodService, academicYearService: AcademicYearService);
    getDashboardStats(options: DashboardFilterDto, user: UserEntity): Promise<DashboardStatsResponseDto>;
    clearStats(stats: DashboardStatsWithGroups): Promise<DashboardStatsWithGroups>;
    private getTeacherStats;
    private getDirectorStats;
    private getAdminStats;
    private findCurrentPeriodIndex;
    private calculatePeriodStats;
    private calculateAcademyStats;
    private createPeriodStats;
    private calculateCompliance;
    private groupLearningPeriods;
    private calculatePeriodAverages;
    private applyFilters;
    private createPeriodKey;
    private formatDate;
}
export {};
