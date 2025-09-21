import { AuthUser } from '../../../auth/types/auth-user';
import { StudentLPEnrollmentEntity } from '../../../domain/enrollment/entities/student-enrollment.entity';
import { StudentEntity } from '../../../domain/students/entities/student.entity';
import { TenantEntity } from '../../../domain/tenant/entities/tenant.entity';
import { StudentSamplesFilterDto, StudentsTableFilterDto } from '../dto/filters.dto';
import { TeacherComplianceTaskService } from '../services/teacher.service';
export declare class TeacherComplianceTaskController {
    private readonly teacherComplianceTaskService;
    constructor(teacherComplianceTaskService: TeacherComplianceTaskService);
    getStudents(filters: StudentsTableFilterDto): Promise<import("ecap-lib/dist/types").PaginatedResult<StudentLPEnrollmentEntity, any>>;
    getFilters(user: AuthUser): Promise<TenantEntity>;
    getStudentSamples(filters: StudentSamplesFilterDto): Promise<import("ecap-lib/dist/types").PaginatedResult<StudentLPEnrollmentEntity, any>>;
    searchStudents(user: AuthUser, search: string): Promise<StudentEntity[]>;
}
