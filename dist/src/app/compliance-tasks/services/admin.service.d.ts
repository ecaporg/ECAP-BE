import { SelectQueryBuilder } from 'typeorm';
import { AuthUser } from '../../../auth/types/auth-user';
import { StudentLPEnrollmentAssignmentEntity } from '../../../domain/enrollment/entities/student-enrollment-assignment.entity';
import { StudentLPEnrollmentAssignmentService } from '../../../domain/enrollment/services/student-enrollment-assignment.service';
import { TeacherService } from '../../../domain/staff/services/staff.service';
import { TeachersTableFilterDto } from '../dto/filters.dto';
import { TeacherComplianceTaskService } from './teacher.service';
export declare class AdminComplianceService {
    private readonly studentLPEnrollmentAssignmentService;
    private readonly teacherComplianceTaskService;
    private readonly teacherService;
    constructor(studentLPEnrollmentAssignmentService: StudentLPEnrollmentAssignmentService, teacherComplianceTaskService: TeacherComplianceTaskService, teacherService: TeacherService);
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
    getFilters(user: AuthUser): Promise<import("../../../domain/tenant/entities/tenant.entity").TenantEntity>;
    searchTeachers(user: AuthUser, search: string): Promise<import("../../../domain/staff/entities/staff.entity").TeacherEntity[]>;
    buildTeacherFilters(filters: TeachersTableFilterDto, user: AuthUser, query: SelectQueryBuilder<StudentLPEnrollmentAssignmentEntity>): void;
}
