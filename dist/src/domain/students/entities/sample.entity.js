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
exports.SampleEntity = exports.SampleFlagCategory = exports.SampleStatus = void 0;
const constants_1 = require("ecap-lib/dist/constants");
Object.defineProperty(exports, "SampleFlagCategory", { enumerable: true, get: function () { return constants_1.SampleFlagCategory; } });
Object.defineProperty(exports, "SampleStatus", { enumerable: true, get: function () { return constants_1.SampleStatus; } });
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../../auth/entities/user.entity");
const core_1 = require("../../../core");
const student_enrollment_assignment_entity_1 = require("../../enrollment/entities/student-enrollment-assignment.entity");
const sample_flag_entity_1 = require("./sample-flag.entity");
let SampleEntity = class SampleEntity extends core_1.CanvasGenericEntity {
};
exports.SampleEntity = SampleEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample status',
        maxLength: 50,
        enum: constants_1.SampleStatus,
    }),
    (0, typeorm_1.Column)({ type: 'enum', enum: constants_1.SampleStatus }),
    __metadata("design:type", String)
], SampleEntity.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample flag category',
        maxLength: 50,
        enum: constants_1.SampleFlagCategory,
    }),
    (0, typeorm_1.Column)({ type: 'enum', enum: constants_1.SampleFlagCategory, nullable: true }),
    __metadata("design:type", String)
], SampleEntity.prototype, "flag_category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID of the user who set completed status of this sample',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SampleEntity.prototype, "done_by_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample grade (e.g. 1/5, 2/5, 3/5, 4/5, 5/5)',
        maxLength: 50,
        nullable: true,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SampleEntity.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample submission date',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ nullable: true, type: 'date' }),
    __metadata("design:type", Date)
], SampleEntity.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample preview URL',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ nullable: true, length: 255 }),
    __metadata("design:type", String)
], SampleEntity.prototype, "preview_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User who set completed status of this sample',
        type: () => Object,
    }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'done_by_id' }),
    __metadata("design:type", Object)
], SampleEntity.prototype, "done_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample flag errors',
        type: () => sample_flag_entity_1.SampleFlagErrorEntity,
    }),
    (0, typeorm_1.OneToOne)(() => sample_flag_entity_1.SampleFlagErrorEntity, (flag) => flag.sample, {
        cascade: true,
    }),
    __metadata("design:type", Object)
], SampleEntity.prototype, "flag_errors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample flag missing work',
        type: () => sample_flag_entity_1.SampleFlagMissingWorkEntity,
    }),
    (0, typeorm_1.OneToOne)(() => sample_flag_entity_1.SampleFlagMissingWorkEntity, (flag) => flag.sample, {
        cascade: true,
    }),
    __metadata("design:type", Object)
], SampleEntity.prototype, "flag_missing_work", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample flag rejected',
        type: () => sample_flag_entity_1.SampleFlagRejectedEntity,
    }),
    (0, typeorm_1.OneToOne)(() => sample_flag_entity_1.SampleFlagRejectedEntity, (flag) => flag.sample, {
        cascade: true,
    }),
    __metadata("design:type", Object)
], SampleEntity.prototype, "flag_rejected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample flag completed',
        type: () => sample_flag_entity_1.SampleFlagCompletedEntity,
    }),
    (0, typeorm_1.OneToOne)(() => sample_flag_entity_1.SampleFlagCompletedEntity, (flag) => flag.sample, {
        cascade: true,
    }),
    __metadata("design:type", Object)
], SampleEntity.prototype, "flag_completed", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => student_enrollment_assignment_entity_1.StudentLPEnrollmentAssignmentEntity, (assignment) => assignment.sample),
    __metadata("design:type", Object)
], SampleEntity.prototype, "student_lp_enrollment_assignment", void 0);
exports.SampleEntity = SampleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'samples' })
], SampleEntity);
//# sourceMappingURL=sample.entity.js.map