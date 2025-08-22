import { AuthUser } from 'src/auth/types/auth-user';
import { TeacherEntity } from 'src/staff/entities/staff.entity';
import { TenantEntity } from 'src/tenant/entities/tenant.entity';
import { TeachersTableFilterDto } from '../dto/filters.dto';
import { AdminComplianceService } from '../services/admin.service';
export declare class AdminComplianceController {
    private readonly adminComplianceService;
    constructor(adminComplianceService: AdminComplianceService);
    getTeachers(filters: TeachersTableFilterDto, user: AuthUser): Promise<{
        items: any;
        meta: {
            totalItems: any;
            itemCount: any;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
            additionalData: {
                completedCount: any;
            };
        };
    }>;
    getFilters(user: AuthUser): Promise<TenantEntity>;
    searchTeachers(user: AuthUser, search: string): Promise<TeacherEntity[]>;
}
