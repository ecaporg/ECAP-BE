import { AuthUser } from '../../../auth/types/auth-user';
import { StudentLPEnrollmentService } from '../../../domain/enrollment/services/student-enrollment.service';
import { StudentService } from '../../../domain/students/services/student.service';
import { TenantEntity } from '../../../domain/tenant/entities/tenant.entity';
import { TenantService } from '../../../domain/tenant/services/tenant.service';
import { AcademicYearService } from '../../../domain/track/services/academic-year.service';
import { StudentSamplesFilterDto, StudentsTableFilterDto } from '../dto/filters.dto';
export declare class TeacherComplianceTaskService {
    private readonly studentService;
    private readonly studentLPEnrollmentService;
    private readonly academicYearService;
    private readonly tenantService;
    constructor(studentService: StudentService, studentLPEnrollmentService: StudentLPEnrollmentService, academicYearService: AcademicYearService, tenantService: TenantService);
    getStudents(filterDTO: StudentsTableFilterDto): Promise<import("ecap-lib/dist/types").PaginatedResult<import("../../../domain/enrollment/entities/student-enrollment.entity").StudentLPEnrollmentEntity, any>>;
    getStudentSamples(filterDTO: StudentSamplesFilterDto): Promise<import("ecap-lib/dist/types").PaginatedResult<import("../../../domain/enrollment/entities/student-enrollment.entity").StudentLPEnrollmentEntity, any>>;
    getFilters(user: AuthUser): Promise<TenantEntity>;
    searchStudents(user: AuthUser, search: string): Promise<import("../../../domain/students/entities/student.entity").StudentEntity[]>;
    getUserSearchFields(search: string): {
        name: import("typeorm").FindOperator<string>;
    }[];
    private getTenantQuery;
}
