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
exports.CourseEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../../core");
const tenant_entity_1 = require("../../tenant/entities/tenant.entity");
const assignment_entity_1 = require("./assignment.entity");
let CourseEntity = class CourseEntity extends core_1.IDCanvasGenericEntity {
};
exports.CourseEntity = CourseEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Course name', maxLength: 250 }),
    (0, typeorm_1.Column)({ length: 250 }),
    __metadata("design:type", String)
], CourseEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Assignments associated with this course',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => assignment_entity_1.AssignmentEntity, (assignment) => assignment.course, {
        onDelete: 'CASCADE',
        cascade: ['insert'],
    }),
    __metadata("design:type", Object)
], CourseEntity.prototype, "assignments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tenant ID associated with this course' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CourseEntity.prototype, "tenant_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tenant associated with this course',
        type: () => Object,
    }),
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.TenantEntity, (tenant) => tenant.courses, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", Object)
], CourseEntity.prototype, "tenant", void 0);
exports.CourseEntity = CourseEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'courses' })
], CourseEntity);
//# sourceMappingURL=course.entity.js.map