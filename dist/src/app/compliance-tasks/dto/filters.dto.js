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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachersTableFilterDto = exports.StudentSamplesFilterDto = exports.StudentsTableFilterDto = exports.assignmentFilterMapping = exports.filterMapping = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../../core");
const FILTER_KEYS = {
    LEARNING_PERIOD_ID: 'learning_period_id',
    ACADEMY_ID: 'student.academy_id',
    SCHOOL_ID: 'student.school_id',
    TRACK_ID: 'learning_period.track_id',
    STUDENT_GRADE: 'student_grade',
    COMPLETED: 'completed',
    TEACHER_ID: 'teacher_enrollments.teacher_id',
    STATUS: 'assignments.sample.status',
    STUDENT_ID: 'student_id',
    DONE_BY_ID: 'assignments.sample.done_by_id',
    ACADEMIC_YEAR: 'teacher_enrollments.academic_year_id',
    SEMESTER_ID: 'learning_period.track.semesters.id',
    SUBJECT_ID: 'assignments.assignment.course_id',
};
const ASSIGNMENT_FILTER_KEYS = {
    LEARNING_PERIOD_ID: 'student_lp_enrollment.learning_period_id',
    ACADEMIC_YEAR: 'student_lp_enrollment.teacher_enrollments.academic_year_id',
    SEMESTER_ID: 'student_lp_enrollment.learning_period.track.semesters.id',
    STATUS: 'sample.status',
    STUDENT_ID: 'student_lp_enrollment.student_id',
    DONE_BY_ID: 'sample.done_by_id',
    SUBJECT_ID: 'assignment.course_id',
    ACADEMY_ID: 'student_lp_enrollment.student.academy_id',
    SCHOOL_ID: 'student_lp_enrollment.student.school_id',
    TRACK_ID: 'student_lp_enrollment.learning_period.track_id',
    STUDENT_GRADE: 'student_lp_enrollment.student_grade',
    COMPLETED: 'student_lp_enrollment.completed',
    TEACHER_ID: 'student_lp_enrollment.teacher_enrollments.teacher_id',
};
exports.filterMapping = (0, core_1.getFilterMappingRecord)(FILTER_KEYS);
exports.assignmentFilterMapping = (0, core_1.getFilterMappingRecord)(ASSIGNMENT_FILTER_KEYS);
class StudentsTableFilterDto extends core_1.BaseFilterDto {
}
exports.StudentsTableFilterDto = StudentsTableFilterDto;
_a = FILTER_KEYS.LEARNING_PERIOD_ID, _b = FILTER_KEYS.ACADEMY_ID, _c = FILTER_KEYS.SCHOOL_ID, _d = FILTER_KEYS.TRACK_ID, _e = FILTER_KEYS.STUDENT_GRADE, _f = FILTER_KEYS.COMPLETED, _g = FILTER_KEYS.TEACHER_ID;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Filter by learning period ID',
        type: [Number],
        name: core_1.DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID,
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
        name: core_1.DEFAULT_FILTERS_KEYS.ACADEMY_ID,
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
        name: core_1.DEFAULT_FILTERS_KEYS.SCHOOL_ID,
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
        name: core_1.DEFAULT_FILTERS_KEYS.TRACK_ID,
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
        name: core_1.DEFAULT_FILTERS_KEYS.STUDENT_GRADE,
    }),
    (0, core_1.IdDecorator)((value) => `Grade ${value}`),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], StudentsTableFilterDto.prototype, _e, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by sample status',
        type: [Boolean],
        name: core_1.DEFAULT_FILTERS_KEYS.COMPLETED,
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
        name: core_1.DEFAULT_FILTERS_KEYS.TEACHER_ID,
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Number)
], StudentsTableFilterDto.prototype, _g, void 0);
class StudentSamplesFilterDto extends core_1.BaseFilterDto {
}
exports.StudentSamplesFilterDto = StudentSamplesFilterDto;
_h = FILTER_KEYS.LEARNING_PERIOD_ID, _j = FILTER_KEYS.STATUS, _k = FILTER_KEYS.TEACHER_ID, _l = FILTER_KEYS.STUDENT_ID, _m = FILTER_KEYS.DONE_BY_ID, _o = FILTER_KEYS.ACADEMY_ID;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Filter by learning period ID',
        type: [Number],
        name: core_1.DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID,
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
        name: core_1.DEFAULT_FILTERS_KEYS.STATUS,
    }),
    (0, core_1.IdDecorator)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], StudentSamplesFilterDto.prototype, _j, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by teacher ID',
        type: [Number],
        name: core_1.DEFAULT_FILTERS_KEYS.TEACHER_ID,
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
        name: core_1.DEFAULT_FILTERS_KEYS.STUDENT_ID,
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
        name: core_1.DEFAULT_FILTERS_KEYS.DONE_BY,
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], StudentSamplesFilterDto.prototype, _m, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by academy ID',
        type: [Number],
        name: core_1.DEFAULT_FILTERS_KEYS.ACADEMY_ID,
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], StudentSamplesFilterDto.prototype, _o, void 0);
class TeachersTableFilterDto extends core_1.BaseFilterDto {
}
exports.TeachersTableFilterDto = TeachersTableFilterDto;
_p = ASSIGNMENT_FILTER_KEYS.ACADEMY_ID, _q = ASSIGNMENT_FILTER_KEYS.SCHOOL_ID, _r = ASSIGNMENT_FILTER_KEYS.TRACK_ID, _s = ASSIGNMENT_FILTER_KEYS.STUDENT_GRADE, _t = ASSIGNMENT_FILTER_KEYS.COMPLETED, _u = ASSIGNMENT_FILTER_KEYS.TEACHER_ID, _v = ASSIGNMENT_FILTER_KEYS.LEARNING_PERIOD_ID, _w = ASSIGNMENT_FILTER_KEYS.ACADEMIC_YEAR, _x = ASSIGNMENT_FILTER_KEYS.SEMESTER_ID, _y = ASSIGNMENT_FILTER_KEYS.STATUS, _z = ASSIGNMENT_FILTER_KEYS.SUBJECT_ID;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by academy ID',
        type: [Number],
        name: core_1.DEFAULT_FILTERS_KEYS.ACADEMY_ID,
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _p, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by school ID',
        type: [Number],
        name: core_1.DEFAULT_FILTERS_KEYS.SCHOOL_ID,
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _q, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by track ID',
        type: [Number],
        name: core_1.DEFAULT_FILTERS_KEYS.TRACK_ID,
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _r, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by grade',
        type: [String],
        name: core_1.DEFAULT_FILTERS_KEYS.STUDENT_GRADE,
    }),
    (0, core_1.IdDecorator)((value) => `Grade ${value}`),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _s, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by sample status',
        type: [Boolean],
        name: core_1.DEFAULT_FILTERS_KEYS.COMPLETED,
    }),
    (0, core_1.IdDecorator)((value) => value === 'true'),
    (0, class_validator_1.IsBoolean)({ each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _t, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by teacher ID',
        type: [Number],
        name: core_1.DEFAULT_FILTERS_KEYS.TEACHER_ID,
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Number)
], TeachersTableFilterDto.prototype, _u, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by learning period ID',
        type: [Number],
        name: core_1.DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID,
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _v, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by academic year',
        type: [Number],
        name: core_1.DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR,
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _w, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by semester',
        type: [Number],
        name: core_1.DEFAULT_FILTERS_KEYS.SEMESTER_ID,
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _x, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by sample status',
        type: [String],
        name: core_1.DEFAULT_FILTERS_KEYS.STATUS,
    }),
    (0, core_1.IdDecorator)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _y, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by subject',
        type: [Number],
        name: core_1.DEFAULT_FILTERS_KEYS.SUBJECT_ID,
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TeachersTableFilterDto.prototype, _z, void 0);
//# sourceMappingURL=filters.dto.js.map