import { AuthUser } from 'src/auth/types/auth-user';
import { StudentLPEnrollmentEntity } from 'src/enrollment/entities/student-enrollment.entity';
import { StudentEntity } from 'src/students/entities/student.entity';
import { TenantEntity } from 'src/tenant/entities/tenant.entity';
import { StudentSamplesFilterDto, StudentsTableFilterDto } from '../dto/filters.dto';
import { TeacherComplianceTaskService } from '../services/teacher.service';
export declare class TeacherComplianceTaskController {
    private readonly teacherComplianceTaskService;
    constructor(teacherComplianceTaskService: TeacherComplianceTaskService);
    getStudents(filters: StudentsTableFilterDto): Promise<import("src/core").PaginatedResult<StudentLPEnrollmentEntity, any>>;
    getFilters(user: AuthUser): Promise<TenantEntity>;
    getStudentSamples(filters: StudentSamplesFilterDto): Promise<import("src/core").PaginatedResult<StudentLPEnrollmentEntity, any>>;
    searchStudents(user: AuthUser, search: string): Promise<StudentEntity[]>;
}
