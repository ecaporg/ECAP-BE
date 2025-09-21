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
exports.SchoolEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../../core");
const student_entity_1 = require("../../students/entities/student.entity");
const tenant_entity_1 = require("../../tenant/entities/tenant.entity");
let SchoolEntity = class SchoolEntity extends core_1.TenantGenericEntity {
};
exports.SchoolEntity = SchoolEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'School name', maxLength: 250 }),
    (0, typeorm_1.Column)({ length: 250 }),
    __metadata("design:type", String)
], SchoolEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tenant associated with this school',
        type: () => Object,
    }),
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.TenantEntity, (tenant) => tenant.schools, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", Object)
], SchoolEntity.prototype, "tenant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Students enrolled in this school',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => student_entity_1.StudentEntity, (student) => student.school),
    __metadata("design:type", Object)
], SchoolEntity.prototype, "students", void 0);
exports.SchoolEntity = SchoolEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'schools' })
], SchoolEntity);
//# sourceMappingURL=school.entity.js.map