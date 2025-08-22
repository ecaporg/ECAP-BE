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
exports.ErrorEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const tenant_entity_1 = require("./tenant.entity");
let ErrorEntity = class ErrorEntity extends core_1.GenericEntity {
};
exports.ErrorEntity = ErrorEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error message',
        type: 'string',
    }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ErrorEntity.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tenant ID this error belongs to',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ErrorEntity.prototype, "tenant_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tenant this error belongs to',
        type: () => tenant_entity_1.TenantEntity,
    }),
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.TenantEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", tenant_entity_1.TenantEntity)
], ErrorEntity.prototype, "tenant", void 0);
exports.ErrorEntity = ErrorEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'errors' })
], ErrorEntity);
//# sourceMappingURL=error.entity.js.map