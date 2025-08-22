"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const key_controller_1 = require("./controllers/key.controller");
const error_entity_1 = require("./entities/error.entity");
const key_entity_1 = require("./entities/key.entity");
const tenant_entity_1 = require("./entities/tenant.entity");
const error_service_1 = require("./services/error.service");
const key_service_1 = require("./services/key.service");
const tenant_service_1 = require("./services/tenant.service");
let TenantModule = class TenantModule {
};
exports.TenantModule = TenantModule;
exports.TenantModule = TenantModule = __decorate([
    (0, common_1.Module)({
        controllers: [key_controller_1.KeyController],
        imports: [typeorm_1.TypeOrmModule.forFeature([tenant_entity_1.TenantEntity, key_entity_1.KeyEntity, error_entity_1.ErrorEntity])],
        providers: [tenant_service_1.TenantService, key_service_1.KeyService, error_service_1.ErrorService],
        exports: [tenant_service_1.TenantService, key_service_1.KeyService, error_service_1.ErrorService],
    })
], TenantModule);
//# sourceMappingURL=tenant.module.js.map