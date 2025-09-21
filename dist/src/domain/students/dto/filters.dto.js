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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlaggedSamplesFilterDto = exports.filterMapping = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../../core");
const sample_entity_1 = require("../entities/sample.entity");
const FILTER_KEYS = {
    LEARNING_PERIOD_ID: 'student_lp_enrollment_assignment.student_lp_enrollment.learning_period_id',
    TEACHER_ID: 'student_lp_enrollment_assignment.student_lp_enrollment.teacher_enrollments.teacher_id',
    ACADEMY_ID: 'student_lp_enrollment_assignment.student_lp_enrollment.student.academy_id',
    ACADEMIC_YEAR: 'student_lp_enrollment_assignment.student_lp_enrollment.teacher_enrollments.academic_year_id',
    STATUS: 'status',
    FLAG_CATEGORY: 'flag_category',
};
exports.filterMapping = (0, core_1.getFilterMappingRecord)(FILTER_KEYS);
class FlaggedSamplesFilterDto extends core_1.BaseFilterDto {
    constructor() {
        super(...arguments);
        this[_f] = [
            sample_entity_1.SampleFlagCategory.REASON_REJECTED,
            sample_entity_1.SampleFlagCategory.ERROR_IN_SAMPLE,
            sample_entity_1.SampleFlagCategory.MISSING_SAMPLE,
        ];
    }
}
exports.FlaggedSamplesFilterDto = FlaggedSamplesFilterDto;
_a = FILTER_KEYS.LEARNING_PERIOD_ID, _b = FILTER_KEYS.TEACHER_ID, _c = FILTER_KEYS.ACADEMY_ID, _d = FILTER_KEYS.ACADEMIC_YEAR, _e = FILTER_KEYS.STATUS, _f = FILTER_KEYS.FLAG_CATEGORY;
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
], FlaggedSamplesFilterDto.prototype, _a, void 0);
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
], FlaggedSamplesFilterDto.prototype, _b, void 0);
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
], FlaggedSamplesFilterDto.prototype, _c, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by academic year',
        type: [Number],
        name: core_1.DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR,
    }),
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Number)
], FlaggedSamplesFilterDto.prototype, _d, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by status',
        type: [String],
        name: core_1.DEFAULT_FILTERS_KEYS.STATUS,
    }),
    (0, core_1.IdDecorator)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FlaggedSamplesFilterDto.prototype, _e, void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter by flag category',
        type: [String],
        name: core_1.DEFAULT_FILTERS_KEYS.FLAG_CATEGORY,
    }),
    (0, core_1.IdDecorator)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FlaggedSamplesFilterDto.prototype, _f, void 0);
//# sourceMappingURL=filters.dto.js.map