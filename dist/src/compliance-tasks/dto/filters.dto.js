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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachersTableFilterDto = exports.StudentSamplesFilterDto = exports.StudentsTableFilterDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const FILTER_KEYS = {
    LEARNING_PERIOD_ID: 'learning_period_id',
    ACADEMY_ID: 'student.academy_id',
    SCHOOL_ID: 'teacher_school_year_enrollment.school_id',
    TRACK_ID: 'track_id',
    STUDENT_GRADE: 'student_grade',
    COMPLETED: 'completed',
    TEACHER_ID: 'teacher_school_year_enrollment.teacher_id',
    SAMPLE_STATUS: 'samples.status',
    STUDENT_ID: 'student_id',
    DONE_BY_ID: 'samples.done_by_id',
    ACADEMIC_YEAR: 'teacher_school_year_enrollment.academic_year_id',
    SEMESTER_ID: 'track.semesters.id',
    SAMPLE_SUBJECT: 'samples.subject.id',
};
class StudentsTableFilterDto extends core_1.BaseFilterDto {
}
exports.StudentsTableFilterDto = StudentsTableFilterDto;
_a = FILTER_KEYS.LEARNING_PERIOD_ID, _b = FILTER_KEYS.ACADEMY_ID, _c = FILTER_KEYS.SCHOOL_ID, _d = FILTER_KEYS.TRACK_ID, _e = FILTER_KEYS.STUDENT_GRADE, _f = FILTER_KEYS.COMPLETED, _g = FILTER_KEYS.TEACHER_ID;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Filter by learning period ID',
        type: [Number],
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], StudentsTableFilterDto.prototype, _a, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by academy ID',
        type: [Number],
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], StudentsTableFilterDto.prototype, _b, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by school ID',
        type: [Number],
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], StudentsTableFilterDto.prototype, _c, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by track ID',
        type: [Number],
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], StudentsTableFilterDto.prototype, _d, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by grade',
        type: [String],
    }),
    (0, core_1.IdDecorator)(String),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], StudentsTableFilterDto.prototype, _e, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by sample status',
        type: [Boolean],
    }),
    (0, core_1.IdDecorator)((value) => value === 'true'),
    (0, class_validator_1.IsBoolean)({ each: true }),
    __metadata("design:type", Array)
], StudentsTableFilterDto.prototype, _f, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by teacher ID',
        type: [Number],
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Number)
], StudentsTableFilterDto.prototype, _g, void 0);
class StudentSamplesFilterDto extends core_1.BaseFilterDto {
}
exports.StudentSamplesFilterDto = StudentSamplesFilterDto;
_h = FILTER_KEYS.LEARNING_PERIOD_ID, _j = FILTER_KEYS.SAMPLE_STATUS, _k = FILTER_KEYS.TEACHER_ID, _l = FILTER_KEYS.STUDENT_ID, _m = FILTER_KEYS.DONE_BY_ID, _o = FILTER_KEYS.ACADEMY_ID;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Filter by learning period ID',
        type: [Number],
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], StudentSamplesFilterDto.prototype, _h, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by sample status',
        type: [String],
    }),
    (0, core_1.IdDecorator)(String),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], StudentSamplesFilterDto.prototype, _j, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by teacher ID',
        type: [Number],
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], StudentSamplesFilterDto.prototype, _k, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Filter by student ID',
        type: [Number],
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], StudentSamplesFilterDto.prototype, _l, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by done by ID',
        type: [Number],
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], StudentSamplesFilterDto.prototype, _m, void 0);
__decorate([
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], StudentSamplesFilterDto.prototype, _o, void 0);
class TeachersTableFilterDto extends (0, swagger_1.OmitType)(StudentsTableFilterDto, [
    FILTER_KEYS.LEARNING_PERIOD_ID,
]) {
}
exports.TeachersTableFilterDto = TeachersTableFilterDto;
_p = FILTER_KEYS.LEARNING_PERIOD_ID, _q = FILTER_KEYS.ACADEMIC_YEAR, _r = FILTER_KEYS.SEMESTER_ID, _s = FILTER_KEYS.SAMPLE_STATUS, _t = FILTER_KEYS.SAMPLE_SUBJECT;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by learning period ID',
        type: [Number],
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _p, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by academic year',
        type: [Number],
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _q, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by semester',
        type: [Number],
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _r, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by sample status',
        type: [String],
    }),
    (0, core_1.IdDecorator)(String),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _s, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by subject',
        type: [String],
    }),
    (0, core_1.IdDecorator)(String),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _t, void 0);
//# sourceMappingURL=filters.dto.js.map