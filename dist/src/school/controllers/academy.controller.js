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
exports.AcademyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const user_entity_1 = require("../../users/entities/user.entity");
const roles_enum_1 = require("../../users/enums/roles.enum");
const academy_dto_1 = require("../dto/academy.dto");
const filters_dto_1 = require("../dto/filters.dto");
const academy_entity_1 = require("../entities/academy.entity");
const academy_filter_interceptor_1 = require("../interceptors/academy-filter.interceptor");
const academy_service_1 = require("../services/academy.service");
let AcademyController = class AcademyController {
    constructor(academyService) {
        this.academyService = academyService;
    }
    async findAll(options) {
        return this.academyService.findAll(options);
    }
    async findOne(id) {
        return this.academyService.findOne(id);
    }
    async create(createAcademyDto, user) {
        return this.academyService.adminCreate(createAcademyDto, user);
    }
    async patch(id, updateAcademyDto) {
        return this.academyService.update(id, updateAcademyDto);
    }
    async put(id, updateAcademyDto) {
        return this.academyService.update(id, updateAcademyDto);
    }
    async delete(id) {
        return this.academyService.delete(id);
    }
};
exports.AcademyController = AcademyController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all academies with pagination' }),
    (0, core_1.ApiPaginationQueries)(),
    (0, core_1.ApiPaginatedCrudResponse)(academy_entity_1.AcademyEntity),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.SchoolFilterDto]),
    __metadata("design:returntype", Promise)
], AcademyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get academy by ID' }),
    (0, core_1.ApiCrudResponse)(academy_entity_1.AcademyEntity),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcademyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new academy' }),
    (0, core_1.ApiCrudResponse)(academy_entity_1.AcademyEntity, 'created'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, core_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [academy_dto_1.CreateAcademyDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], AcademyController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a academy (partially)' }),
    (0, core_1.ApiCrudResponse)(academy_entity_1.AcademyEntity),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, academy_dto_1.UpdateAcademyDto]),
    __metadata("design:returntype", Promise)
], AcademyController.prototype, "patch", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a academy (fully)' }),
    (0, core_1.ApiCrudResponse)(academy_entity_1.AcademyEntity),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, academy_dto_1.UpdateAcademyDto]),
    __metadata("design:returntype", Promise)
], AcademyController.prototype, "put", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a academy' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Academy deleted successfully' }),
    (0, core_1.ApiErrorResponses)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcademyController.prototype, "delete", null);
exports.AcademyController = AcademyController = __decorate([
    (0, swagger_1.ApiTags)('Academies'),
    (0, common_1.Controller)('academies'),
    (0, common_1.UseInterceptors)(academy_filter_interceptor_1.AcademyFilterInterceptor),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN),
    __metadata("design:paramtypes", [academy_service_1.AcademyService])
], AcademyController);
//# sourceMappingURL=academy.controller.js.map