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
exports.TeacherController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_enum_1 = require("../../../auth/enums/roles.enum");
const core_1 = require("../../../core");
const attach_search_fields_interceptor_1 = require("../../../core/interceptors/attach-search_fields.interceptor");
const filters_dto_1 = require("../dto/filters.dto");
const staff_entity_1 = require("../entities/staff.entity");
const teacher_filter_interceptor_1 = require("../interceptors/teacher-filter.interceptor");
const staff_service_1 = require("../services/staff.service");
let TeacherController = class TeacherController {
    constructor(service) {
        this.service = service;
    }
    async findAll(options) {
        return this.service.findAll(options, { user: true });
    }
    async findOne(id) {
        return this.service.findOne(id);
    }
};
exports.TeacherController = TeacherController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(new attach_search_fields_interceptor_1.AttachASearchFieldsInterceptor([
        'user.name',
        'user.email',
    ]), teacher_filter_interceptor_1.TeacherFilterInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get all entities with pagination' }),
    (0, core_1.ApiPaginationQueries)(),
    (0, core_1.ApiPaginatedCrudResponse)(staff_entity_1.TeacherEntity),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.TeachersFilterDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get entity by ID' }),
    (0, core_1.ApiCrudResponse)(staff_entity_1.TeacherEntity),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "findOne", null);
exports.TeacherController = TeacherController = __decorate([
    (0, swagger_1.ApiTags)('Teacher'),
    (0, common_1.Controller)('teachers'),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __metadata("design:paramtypes", [staff_service_1.TeacherService])
], TeacherController);
//# sourceMappingURL=teacher.controller.js.map