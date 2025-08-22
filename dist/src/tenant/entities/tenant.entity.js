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
exports.TenantEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const academy_entity_1 = require("../../school/entities/academy.entity");
const school_entity_1 = require("../../school/entities/school.entity");
const staff_entity_1 = require("../../staff/entities/staff.entity");
const track_entity_1 = require("../../track/entities/track.entity");
const error_entity_1 = require("./error.entity");
const key_entity_1 = require("./key.entity");
let TenantEntity = class TenantEntity extends core_1.GenericEntity {
};
exports.TenantEntity = TenantEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tenant name', maxLength: 250, nullable: true }),
    (0, typeorm_1.Column)({ length: 250, nullable: true, default: null }),
    __metadata("design:type", String)
], TenantEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null, type: 'bigint' }),
    __metadata("design:type", Number)
], TenantEntity.prototype, "root_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Schools associated with this tenant',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => school_entity_1.SchoolEntity, (school) => school.tenant),
    __metadata("design:type", Array)
], TenantEntity.prototype, "schools", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Admins associated with this tenant',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => staff_entity_1.AdminEntity, (admin) => admin.tenant),
    __metadata("design:type", Array)
], TenantEntity.prototype, "admins", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Academies associated with this tenant',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => academy_entity_1.AcademyEntity, (academy) => academy.tenant),
    __metadata("design:type", Array)
], TenantEntity.prototype, "academies", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tracks associated with this tenant',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => track_entity_1.TrackEntity, (track) => track.tenant),
    __metadata("design:type", Array)
], TenantEntity.prototype, "tracks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Directors associated with this tenant',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => staff_entity_1.DirectorEntity, (director) => director.tenant),
    __metadata("design:type", Array)
], TenantEntity.prototype, "directors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Errors associated with this tenant',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => error_entity_1.ErrorEntity, (error) => error.tenant),
    __metadata("design:type", Array)
], TenantEntity.prototype, "errors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Keys associated with this tenant',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToOne)(() => key_entity_1.KeyEntity, (key) => key.tenant),
    __metadata("design:type", key_entity_1.KeyEntity)
], TenantEntity.prototype, "key", void 0);
exports.TenantEntity = TenantEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'tenants' })
], TenantEntity);
//# sourceMappingURL=tenant.entity.js.map