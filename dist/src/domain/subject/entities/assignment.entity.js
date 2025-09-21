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
exports.AssignmentEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../../core");
const student_enrollment_assignment_entity_1 = require("../../enrollment/entities/student-enrollment-assignment.entity");
const course_entity_1 = require("./course.entity");
let AssignmentEntity = class AssignmentEntity extends core_1.IDCanvasGenericEntity {
};
exports.AssignmentEntity = AssignmentEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Course ID' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AssignmentEntity.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assignment name', maxLength: 250 }),
    (0, typeorm_1.Column)({ length: 250 }),
    __metadata("design:type", String)
], AssignmentEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Assignment due date',
        type: 'string',
        format: 'date-time',
    }),
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], AssignmentEntity.prototype, "due_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.CourseEntity, (course) => course.assignments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'course_id' }),
    __metadata("design:type", Object)
], AssignmentEntity.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_enrollment_assignment_entity_1.StudentLPEnrollmentAssignmentEntity, (assignment) => assignment.assignment, { onDelete: 'CASCADE' }),
    __metadata("design:type", Object)
], AssignmentEntity.prototype, "enrollmentAssignments", void 0);
exports.AssignmentEntity = AssignmentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'assignments' })
], AssignmentEntity);
//# sourceMappingURL=assignment.entity.js.map