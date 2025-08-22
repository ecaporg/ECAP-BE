import { UserEntity } from 'src/users/entities/user.entity';
import { DashboardStatsResponseDto } from '../dto/dashboard-stats.dto';
import { DashboardFilterDto } from '../dto/filters.dto';
import { DashboardService } from '../services/dashboard.service';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboardStats(options: DashboardFilterDto, user: UserEntity): Promise<DashboardStatsResponseDto>;
}
