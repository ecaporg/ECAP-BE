"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherComplianceTaskService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../../../auth/enums/roles.enum");
const core_1 = require("../../../core");
const student_enrollment_service_1 = require("../../../domain/enrollment/services/student-enrollment.service");
const student_service_1 = require("../../../domain/students/services/student.service");
const tenant_service_1 = require("../../../domain/tenant/services/tenant.service");
const academic_year_service_1 = require("../../../domain/track/services/academic-year.service");
let TeacherComplianceTaskService = class TeacherComplianceTaskService {
    constructor(studentService, studentLPEnrollmentService, academicYearService, tenantService) {
        this.studentService = studentService;
        this.studentLPEnrollmentService = studentLPEnrollmentService;
        this.academicYearService = academicYearService;
        this.tenantService = tenantService;
    }
    async getStudents(filterDTO) {
        const paginationOptions = (0, core_1.extractPaginationOptions)(filterDTO);
        const assignmentPeriods = await this.studentLPEnrollmentService.findAllWithCompletedCount(paginationOptions, {
            learning_period: {
                track: true,
            },
            student: {
                academy: true,
                school: true,
                user: true,
            },
        });
        return assignmentPeriods;
    }
    async getStudentSamples(filterDTO) {
        const paginationOptions = (0, core_1.extractPaginationOptions)(filterDTO);
        const assignmentPeriods = await this.studentLPEnrollmentService.findAll(paginationOptions, {
            assignments: {
                assignment: {
                    course: true,
                },
                sample: {
                    done_by: true,
                    flag_missing_work: {
                        user: true,
                    },
                    flag_errors: {
                        user: true,
                    },
                    flag_rejected: {
                        user: true,
                    },
                },
                student_lp_enrollment: {
                    student: {
                        user: true,
                    },
                    learning_period: {
                        track: true,
                    },
                },
            },
        });
        return assignmentPeriods;
    }
    async getFilters(user) {
        const query = await this.getTenantQuery(user);
        const tenant = await this.tenantService.findOneBy(query);
        return tenant;
    }
    async searchStudents(user, search) {
        const students = await this.studentService.findBy({
            where: this.getUserSearchFields(search).map((property) => ({
                user: {
                    ...property,
                },
                student_lp_enrollments: {
                    teacher_enrollments: {
                        teacher: {
                            user: {
                                id: user.id,
                            },
                        },
                    },
                },
            })),
            take: 10,
        });
        return students;
    }
    getUserSearchFields(search) {
        const fields = [
            {
                name: (0, typeorm_1.ILike)(`%${search}%`),
            },
        ];
        if (!isNaN(parseInt(search))) {
            fields.push({
                id: (0, typeorm_1.Equal)(parseInt(search)),
            });
        }
        return fields;
    }
    async getTenantQuery(user) {
        const query = {};
        if (user.role === roles_enum_1.RolesEnum.TEACHER) {
            const academicYears = await this.academicYearService.findCurrentAcademicYears();
            query.schools = {
                tenant: {
                    teachers: { id: user.id },
                },
            };
            query.tracks = {
                academicYear: {
                    id: (0, typeorm_1.In)(academicYears.map((academicYear) => academicYear.id)),
                },
                start_date: (0, typeorm_1.LessThanOrEqual)(new Date()),
            };
        }
        else if (user.role === roles_enum_1.RolesEnum.ADMIN ||
            user.role === roles_enum_1.RolesEnum.SUPER_ADMIN) {
            query.admins = { user: { id: user.id } };
        }
        else if (user.role === roles_enum_1.RolesEnum.DIRECTOR) {
            query.directors = { user: { id: user.id } };
            query.academies = {
                directors: {
                    user: { id: user.id },
                },
            };
        }
        else {
            throw new core_1.BadRequestException('User role not found');
        }
        return query;
    }
};
exports.TeacherComplianceTaskService = TeacherComplianceTaskService;
exports.TeacherComplianceTaskService = TeacherComplianceTaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [student_service_1.StudentService,
        student_enrollment_service_1.StudentLPEnrollmentService,
        academic_year_service_1.AcademicYearService,
        tenant_service_1.TenantService])
], TeacherComplianceTaskService);
//# sourceMappingURL=teacher.service.js.map