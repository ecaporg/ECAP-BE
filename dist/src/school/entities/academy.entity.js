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
exports.AcademyEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const staff_entity_1 = require("../../staff/entities/staff.entity");
const tenant_entity_1 = require("../../tenant/entities/tenant.entity");
let AcademyEntity = class AcademyEntity extends core_1.GenericEntity {
};
exports.AcademyEntity = AcademyEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Academy name', maxLength: 250 }),
    (0, typeorm_1.Column)({ length: 250 }),
    __metadata("design:type", String)
], AcademyEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tenant id associated with this academy',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AcademyEntity.prototype, "tenant_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tenant associated with this academy',
        type: () => tenant_entity_1.TenantEntity,
    }),
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.TenantEntity, (tenant) => tenant.academies, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", tenant_entity_1.TenantEntity)
], AcademyEntity.prototype, "tenant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Directors associated with this academy',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => staff_entity_1.DirectorEntity, (director) => director.academy),
    __metadata("design:type", Array)
], AcademyEntity.prototype, "directors", void 0);
exports.AcademyEntity = AcademyEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'academies' })
], AcademyEntity);
//# sourceMappingURL=academy.entity.js.map