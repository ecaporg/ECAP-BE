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
exports.KeyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const roles_enum_1 = require("../../users/enums/roles.enum");
const filters_dto_1 = require("../dto/filters.dto");
const key_entity_1 = require("../entities/key.entity");
const tenant_key_filter_interceptor_1 = require("../interceptors/tenant-key-filter.interceptor");
const key_service_1 = require("../services/key.service");
const tenant_service_1 = require("../services/tenant.service");
let KeyController = class KeyController {
    constructor(service, tenantService) {
        this.service = service;
        this.tenantService = tenantService;
    }
    async getAccessToken(filter) {
        const tenant = await this.tenantService.findOneBy((0, core_1.extractPaginationOptions)(filter).filters, {
            key: true,
        });
        return tenant.key;
    }
    async refreshSessionToken(filter, body) {
        const tenant = await this.tenantService.findOneBy((0, core_1.extractPaginationOptions)(filter).filters, {
            key: true,
        });
        return this.service.refreshSessionToken(tenant, body.session_token);
    }
};
exports.KeyController = KeyController;
__decorate([
    (0, common_1.Get)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Get access token' }),
    (0, core_1.ApiCrudResponse)(key_entity_1.KeyEntity),
    (0, common_1.UseInterceptors)(tenant_key_filter_interceptor_1.TenantKeyFilterInterceptor),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.TenantKeyFilterDto]),
    __metadata("design:returntype", Promise)
], KeyController.prototype, "getAccessToken", null);
__decorate([
    (0, common_1.Post)('refresh-session-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh session token' }),
    (0, core_1.ApiCrudResponse)(key_entity_1.KeyEntity),
    (0, common_1.UseInterceptors)(tenant_key_filter_interceptor_1.TenantKeyFilterInterceptor),
    (0, core_1.Roles)(roles_enum_1.RolesEnum.SUPER_ADMIN, roles_enum_1.RolesEnum.ADMIN, roles_enum_1.RolesEnum.DIRECTOR, roles_enum_1.RolesEnum.TEACHER),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.TenantKeyFilterDto, Object]),
    __metadata("design:returntype", Promise)
], KeyController.prototype, "refreshSessionToken", null);
exports.KeyController = KeyController = __decorate([
    (0, swagger_1.ApiTags)('Tenant Keys'),
    (0, common_1.Controller)('tenant-keys'),
    __metadata("design:paramtypes", [key_service_1.KeyService,
        tenant_service_1.TenantService])
], KeyController);
//# sourceMappingURL=key.controller.js.map