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
exports.AcademyFilterDto = exports.SchoolFilterDto = void 0;
const class_validator_1 = require("class-validator");
const core_1 = require("../../../core");
const FILTER_SCHOOL_KEYS = {
    ADMIN_ID: 'tenant.admins.id',
    DIRECTOR_ID: 'tenant.directors.id',
    TEACHER_ID: 'tenant.teachers.id',
};
class SchoolFilterDto extends core_1.BaseFilterDto {
}
exports.SchoolFilterDto = SchoolFilterDto;
_a = FILTER_SCHOOL_KEYS.ADMIN_ID, _b = FILTER_SCHOOL_KEYS.DIRECTOR_ID, _c = FILTER_SCHOOL_KEYS.TEACHER_ID;
__decorate([
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], SchoolFilterDto.prototype, _a, void 0);
__decorate([
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], SchoolFilterDto.prototype, _b, void 0);
__decorate([
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], SchoolFilterDto.prototype, _c, void 0);
const FILTER_ACADEMY_KEYS = {
    ADMIN_ID: 'tenant.admins.id',
    DIRECTOR_ID: 'tenant.directors.id',
    TEACHER_ID: 'tenant.teachers.id',
};
class AcademyFilterDto extends core_1.BaseFilterDto {
}
exports.AcademyFilterDto = AcademyFilterDto;
_d = FILTER_ACADEMY_KEYS.ADMIN_ID, _e = FILTER_ACADEMY_KEYS.DIRECTOR_ID, _f = FILTER_ACADEMY_KEYS.TEACHER_ID;
__decorate([
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], AcademyFilterDto.prototype, _d, void 0);
__decorate([
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], AcademyFilterDto.prototype, _e, void 0);
__decorate([
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], AcademyFilterDto.prototype, _f, void 0);
//# sourceMappingURL=filters.dto.js.map