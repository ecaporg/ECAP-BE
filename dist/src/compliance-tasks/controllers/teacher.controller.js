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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherComplianceTaskController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_user_1 = require("../../auth/types/auth-user");
const core_1 = require("../../core");
const student_enrollment_entity_1 = require("../../enrollment/entities/student-enrollment.entity");
const student_entity_1 = require("../../students/entities/student.entity");
const tenant_entity_1 = require("../../tenant/entities/tenant.entity");
const roles_enum_1 = require("../../users/enums/roles.enum");
const filters_dto_1 = require("../dto/filters.dto");
const teacher_filter_interceptor_1 = require("../interceptors/teacher-filter.interceptor");
const teacher_service_1 = require("../services/teacher.service");
let TeacherComplianceTaskController = class TeacherComplianceTaskController {
    constructor(teacherComplianceTaskService) {
        this.teacherComplianceTaskService = teacherComplianceTaskService;
    }
    async getStudents(filters) {
        return this.teacherComplianceTaskService.getStudents(filters);
    }
    async getFilters(user) {
        return this.teacherComplianceTaskService.getFilters(user);
    }
    async getStudentSamples(filters) {
        return this.teacherComplianceTaskService.getStudentSamples(filters);
    }
    async searchStudents(user, search) {
        return this.teacherComplianceTaskService.searchStudents(user, search);
    }
};
exports.TeacherComplianceTaskController = TeacherComplianceTaskController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(teacher_filter_interceptor_1.TeacherFilterInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get table with students' }),
    (0, core_1.ApiPaginatedCrudResponse)(student_enrollment_entity_1.StudentLPEnrollmentEntity),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.StudentsTableFilterDto]),
    __metadata("design:returntype", Promise)
], TeacherComplianceTaskController.prototype, "getStudents", null);
__decorate([
    (0, common_1.Get)('filters'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available filters for students table' }),
    (0, core_1.ApiCrudResponse)(tenant_entity_1.TenantEntity),
    __param(0, (0, core_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_1.AuthUser]),
    __metadata("design:returntype", Promise)
], TeacherComplianceTaskController.prototype, "getFilters", null);
__decorate([
    (0, common_1.Get)('subjects'),
    (0, common_1.UseInterceptors)(teacher_filter_interceptor_1.TeacherFilterInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get table with student samples' }),
    (0, core_1.ApiPaginatedCrudResponse)(student_enrollment_entity_1.StudentLPEnrollmentEntity),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.StudentSamplesFilterDto]),
    __metadata("design:returntype", Promise)
], TeacherComplianceTaskController.prototype, "getStudentSamples", null);
__decorate([
    (0, common_1.Get)('students/:search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search students' }),
    (0, core_1.ApiErrorResponses)(),
    (0, core_1.ApiArrayResponse)(student_entity_1.StudentEntity),
    __param(0, (0, core_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_1.AuthUser, String]),
    __metadata("design:returntype", Promise)
], TeacherComplianceTaskController.prototype, "searchStudents", null);
exports.TeacherComplianceTaskController = TeacherComplianceTaskController = __decorate([
    (0, swagger_1.ApiTags)('Teacher Compliance Tasks'),
    (0, common_1.Controller)('students-table'),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.TEACHER, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.SUPER_ADMIN),
    __metadata("design:paramtypes", [teacher_service_1.TeacherComplianceTaskService])
], TeacherComplianceTaskController);
//# sourceMappingURL=teacher.controller.js.map