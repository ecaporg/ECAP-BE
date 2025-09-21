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
exports.AdminComplianceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_enum_1 = require("../../../auth/enums/roles.enum");
const auth_user_1 = require("../../../auth/types/auth-user");
const core_1 = require("../../../core");
const teacher_enrollment_entity_1 = require("../../../domain/enrollment/entities/teacher-enrollment.entity");
const staff_entity_1 = require("../../../domain/staff/entities/staff.entity");
const tenant_entity_1 = require("../../../domain/tenant/entities/tenant.entity");
const filters_dto_1 = require("../dto/filters.dto");
const admin_service_1 = require("../services/admin.service");
let AdminComplianceController = class AdminComplianceController {
    constructor(adminComplianceService) {
        this.adminComplianceService = adminComplianceService;
    }
    async getTeachers(filters, user) {
        return this.adminComplianceService.getTeachers(filters, user);
    }
    async getFilters(user) {
        return this.adminComplianceService.getFilters(user);
    }
    async searchTeachers(user, search) {
        return this.adminComplianceService.searchTeachers(user, search);
    }
};
exports.AdminComplianceController = AdminComplianceController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(new core_1.QueryParamMapperInterceptor(filters_dto_1.assignmentFilterMapping, {
        sortBy: 'teacher_name',
    })),
    (0, swagger_1.ApiOperation)({ summary: 'Get table with teachers' }),
    (0, core_1.ApiPaginatedCrudResponse)(teacher_enrollment_entity_1.TeacherEnrollmentEntity),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, core_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.TeachersTableFilterDto,
        auth_user_1.AuthUser]),
    __metadata("design:returntype", Promise)
], AdminComplianceController.prototype, "getTeachers", null);
__decorate([
    (0, common_1.Get)('filters'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available filters for students table' }),
    (0, core_1.ApiCrudResponse)(tenant_entity_1.TenantEntity),
    __param(0, (0, core_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_1.AuthUser]),
    __metadata("design:returntype", Promise)
], AdminComplianceController.prototype, "getFilters", null);
__decorate([
    (0, common_1.Get)('teachers/:search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search teachers' }),
    (0, core_1.ApiErrorResponses)(),
    (0, core_1.ApiArrayResponse)(staff_entity_1.TeacherEntity),
    __param(0, (0, core_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_1.AuthUser, String]),
    __metadata("design:returntype", Promise)
], AdminComplianceController.prototype, "searchTeachers", null);
exports.AdminComplianceController = AdminComplianceController = __decorate([
    (0, swagger_1.ApiTags)('Admin Compliance Tasks'),
    (0, common_1.Controller)('teachers-table'),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.SUPER_ADMIN),
    __metadata("design:paramtypes", [admin_service_1.AdminComplianceService])
], AdminComplianceController);
//# sourceMappingURL=admin.controller.js.map