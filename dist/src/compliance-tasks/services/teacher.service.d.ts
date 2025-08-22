import { AuthUser } from 'src/auth/types/auth-user';
import { StudentLPEnrollmentService } from 'src/enrollment/services/student-enrollment.service';
import { StudentService } from 'src/students/services/student.service';
import { TenantEntity } from 'src/tenant/entities/tenant.entity';
import { TenantService } from 'src/tenant/services/tenant.service';
import { AcademicYearService } from 'src/track/services/academic-year.service';
import { StudentSamplesFilterDto, StudentsTableFilterDto } from '../dto/filters.dto';
export declare class TeacherComplianceTaskService {
    private readonly studentService;
    private readonly studentLPEnrollmentService;
    private readonly academicYearService;
    private readonly tenantService;
    constructor(studentService: StudentService, studentLPEnrollmentService: StudentLPEnrollmentService, academicYearService: AcademicYearService, tenantService: TenantService);
    getStudents(filterDTO: StudentsTableFilterDto): Promise<import("src/core").PaginatedResult<import("../../enrollment/entities/student-enrollment.entity").StudentLPEnrollmentEntity, any>>;
    getStudentSamples(filterDTO: StudentSamplesFilterDto): Promise<import("src/core").PaginatedResult<import("../../enrollment/entities/student-enrollment.entity").StudentLPEnrollmentEntity, any>>;
    getFilters(user: AuthUser): Promise<TenantEntity>;
    searchStudents(user: AuthUser, search: string): Promise<import("../../students/entities/student.entity").StudentEntity[]>;
    getUserSearchFields(search: string): {
        name: import("typeorm").FindOperator<string>;
    }[];
    private getTenantQuery;
}
