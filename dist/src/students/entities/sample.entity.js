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
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const student_enrollment_entity_1 = require("../../enrollment/entities/student-enrollment.entity");
const subject_entity_1 = require("../../track/entities/subject.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const sample_flag_entity_1 = require("./sample-flag.entity");
var SampleStatus;
(function (SampleStatus) {
    SampleStatus["CREATED"] = "CREATED";
    SampleStatus["COMPLETED"] = "COMPLETED";
    SampleStatus["FLAGGED_TO_ADMIN"] = "FLAGGED_TO_ADMIN";
    SampleStatus["PENDING"] = "PENDING";
    SampleStatus["ERRORS_FOUND"] = "ERRORS_FOUND";
    SampleStatus["MISSING_SAMPLE"] = "MISSING_SAMPLE";
    SampleStatus["REASON_REJECTED"] = "REASON_REJECTED";
})(SampleStatus || (exports.SampleStatus = SampleStatus = {}));
var SampleFlagCategory;
(function (SampleFlagCategory) {
    SampleFlagCategory["MISSING_SAMPLE"] = "MISSING_SAMPLE";
    SampleFlagCategory["REASON_REJECTED"] = "REASON_REJECTED";
    SampleFlagCategory["ERROR_IN_SAMPLE"] = "ERROR_IN_SAMPLE";
})(SampleFlagCategory || (exports.SampleFlagCategory = SampleFlagCategory = {}));
let SampleEntity = class SampleEntity extends core_1.GenericEntity {
};
exports.SampleEntity = SampleEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assignment title', maxLength: 250 }),
    (0, typeorm_1.Column)({ length: 250 }),
    __metadata("design:type", String)
], SampleEntity.prototype, "assignment_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample status',
        maxLength: 250,
        enum: SampleStatus,
    }),
    (0, typeorm_1.Column)({ type: 'enum', enum: SampleStatus }),
    __metadata("design:type", String)
], SampleEntity.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample flag category',
        maxLength: 250,
        enum: SampleFlagCategory,
    }),
    (0, typeorm_1.Column)({ type: 'enum', enum: SampleFlagCategory, nullable: true }),
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
        description: 'Subject ID associated with this sample',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SampleEntity.prototype, "subject_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample grade (e.g. 1/5, 2/5, 3/5, 4/5, 5/5)',
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
    (0, typeorm_1.Column)({ nullable: true }),
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
        description: 'Canvas submission ID',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ nullable: true, type: 'bigint' }),
    __metadata("design:type", Number)
], SampleEntity.prototype, "canvas_submission_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subject associated with this sample',
        type: () => subject_entity_1.SubjectEntity,
    }),
    (0, typeorm_1.ManyToOne)(() => subject_entity_1.SubjectEntity, (subject) => subject.samples),
    (0, typeorm_1.JoinColumn)({ name: 'subject_id' }),
    __metadata("design:type", subject_entity_1.SubjectEntity)
], SampleEntity.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Student LP enrollments associated with this sample',
        type: () => [Object],
    }),
    (0, typeorm_1.ManyToMany)(() => student_enrollment_entity_1.StudentLPEnrollmentEntity, (student_lp_enrollment) => student_lp_enrollment.samples, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], SampleEntity.prototype, "student_lp_enrollments", void 0);
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
    __metadata("design:type", user_entity_1.UserEntity)
], SampleEntity.prototype, "done_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample flag errors',
        type: () => sample_flag_entity_1.SampleFlagErrorEntity,
    }),
    (0, typeorm_1.OneToOne)(() => sample_flag_entity_1.SampleFlagErrorEntity, (flag) => flag.sample),
    __metadata("design:type", sample_flag_entity_1.SampleFlagErrorEntity)
], SampleEntity.prototype, "flag_errors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample flag missing work',
        type: () => sample_flag_entity_1.SampleFlagMissingWorkEntity,
    }),
    (0, typeorm_1.OneToOne)(() => sample_flag_entity_1.SampleFlagMissingWorkEntity, (flag) => flag.sample),
    __metadata("design:type", sample_flag_entity_1.SampleFlagMissingWorkEntity)
], SampleEntity.prototype, "flag_missing_work", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample flag rejected',
        type: () => sample_flag_entity_1.SampleFlagRejectedEntity,
    }),
    (0, typeorm_1.OneToOne)(() => sample_flag_entity_1.SampleFlagRejectedEntity, (flag) => flag.sample),
    __metadata("design:type", sample_flag_entity_1.SampleFlagRejectedEntity)
], SampleEntity.prototype, "flag_rejected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sample flag completed',
        type: () => sample_flag_entity_1.SampleFlagCompletedEntity,
    }),
    (0, typeorm_1.OneToOne)(() => sample_flag_entity_1.SampleFlagCompletedEntity, (flag) => flag.sample),
    __metadata("design:type", sample_flag_entity_1.SampleFlagCompletedEntity)
], SampleEntity.prototype, "flag_completed", void 0);
exports.SampleEntity = SampleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'samples' })
], SampleEntity);
//# sourceMappingURL=sample.entity.js.map