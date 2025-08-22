import { AuthUser } from 'src/auth/types/auth-user';
import { StudentLPEnrollmentService } from 'src/enrollment/services/student-enrollment.service';
import { TeacherService } from 'src/staff/services/staff.service';
import { TeachersTableFilterDto } from '../dto/filters.dto';
import { TeacherComplianceTaskService } from './teacher.service';
export declare class AdminComplianceService {
    private readonly studentLPEnrollmentService;
    private readonly teacherComplianceTaskService;
    private readonly teacherService;
    constructor(studentLPEnrollmentService: StudentLPEnrollmentService, teacherComplianceTaskService: TeacherComplianceTaskService, teacherService: TeacherService);
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
    getFilters(user: AuthUser): Promise<import("../../tenant/entities/tenant.entity").TenantEntity>;
    searchTeachers(user: AuthUser, search: string): Promise<import("../../staff/entities/staff.entity").TeacherEntity[]>;
}
