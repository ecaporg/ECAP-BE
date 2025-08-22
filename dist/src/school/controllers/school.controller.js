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
exports.SchoolController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const user_entity_1 = require("../../users/entities/user.entity");
const roles_enum_1 = require("../../users/enums/roles.enum");
const filters_dto_1 = require("../dto/filters.dto");
const school_dto_1 = require("../dto/school.dto");
const school_entity_1 = require("../entities/school.entity");
const school_filter_interceptor_1 = require("../interceptors/school-filter.interceptor");
const school_service_1 = require("../services/school.service");
let SchoolController = class SchoolController {
    constructor(schoolService) {
        this.schoolService = schoolService;
    }
    async findAll(options) {
        return this.schoolService.findAll(options);
    }
    async findOne(id) {
        return this.schoolService.findOne(id);
    }
    async create(createSchoolDto, user) {
        return this.schoolService.adminCreate(createSchoolDto, user);
    }
    async patch(id, updateSchoolDto) {
        return this.schoolService.update(id, updateSchoolDto);
    }
    async put(id, updateSchoolDto) {
        return this.schoolService.update(id, updateSchoolDto);
    }
    async delete(id) {
        return this.schoolService.delete(id);
    }
};
exports.SchoolController = SchoolController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all schools with pagination' }),
    (0, core_1.ApiPaginationQueries)(),
    (0, core_1.ApiPaginatedCrudResponse)(school_entity_1.SchoolEntity),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.SchoolFilterDto]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get school by ID' }),
    (0, core_1.ApiCrudResponse)(school_entity_1.SchoolEntity),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new school' }),
    (0, core_1.ApiCrudResponse)(school_entity_1.SchoolEntity, 'created'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, core_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_dto_1.CreateSchoolDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a school (partially)' }),
    (0, core_1.ApiCrudResponse)(school_entity_1.SchoolEntity),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, school_dto_1.UpdateSchoolDto]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "patch", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a school (fully)' }),
    (0, core_1.ApiCrudResponse)(school_entity_1.SchoolEntity),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, school_dto_1.UpdateSchoolDto]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "put", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a school' }),
    (0, swagger_1.ApiOkResponse)({ description: 'School deleted successfully' }),
    (0, core_1.ApiErrorResponses)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "delete", null);
exports.SchoolController = SchoolController = __decorate([
    (0, swagger_1.ApiTags)('Schools'),
    (0, common_1.Controller)('schools'),
    (0, common_1.UseInterceptors)(school_filter_interceptor_1.SchoolFilterInterceptor),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN),
    __metadata("design:paramtypes", [school_service_1.SchoolService])
], SchoolController);
//# sourceMappingURL=school.controller.js.map