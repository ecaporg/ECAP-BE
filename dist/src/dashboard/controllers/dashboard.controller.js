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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const user_entity_1 = require("../../users/entities/user.entity");
const roles_enum_1 = require("../../users/enums/roles.enum");
const dashboard_stats_dto_1 = require("../dto/dashboard-stats.dto");
const filters_dto_1 = require("../dto/filters.dto");
const dashboard_service_1 = require("../services/dashboard.service");
const interceptor = new core_1.AttachUserIdInterceptor([
    {
        role: roles_enum_1.RolesEnum.TEACHER,
        path: 'student_lp_enrollments.teacher_school_year_enrollment.teacher_id',
    },
    {
        role: roles_enum_1.RolesEnum.DIRECTOR,
        path: 'student_lp_enrollments.student.academy_id',
        map: (user) => user.director?.academy?.id,
    },
    {
        role: roles_enum_1.RolesEnum.ADMIN,
        path: 'track.tenant.admins.id',
    },
    {
        role: roles_enum_1.RolesEnum.SUPER_ADMIN,
        path: 'track.tenant.admins.id',
    },
]);
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getDashboardStats(options, user) {
        return this.dashboardService.getDashboardStats(options, user);
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get entity by ID' }),
    (0, core_1.ApiCrudResponse)(dashboard_stats_dto_1.DashboardStatsResponseDto),
    (0, common_1.UseInterceptors)(interceptor),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, core_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.DashboardFilterDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboardStats", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('Dashboard'),
    (0, common_1.Controller)('dashboard'),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map