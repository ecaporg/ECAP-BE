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
exports.TrackSemesterFilterDto = exports.TrackLearningPeriodFilterDto = exports.TrackCalendarFilterDto = exports.TrackFilterDto = void 0;
const class_validator_1 = require("class-validator");
const core_1 = require("../../../core");
const FILTER_TRACK_KEYS = {
    ADMIN_ID: 'tenant.admins.id',
    DIRECTOR_ID: 'tenant.directors.id',
    TEACHER_ID: 'tenant.teachers.id',
};
class TrackFilterDto extends core_1.BaseFilterDto {
}
exports.TrackFilterDto = TrackFilterDto;
_a = FILTER_TRACK_KEYS.ADMIN_ID, _b = FILTER_TRACK_KEYS.DIRECTOR_ID, _c = FILTER_TRACK_KEYS.TEACHER_ID;
__decorate([
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TrackFilterDto.prototype, _a, void 0);
__decorate([
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TrackFilterDto.prototype, _b, void 0);
__decorate([
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TrackFilterDto.prototype, _c, void 0);
const FILTER_TRACK_CALENDAR_KEYS = {
    ADMIN_ID: 'track.tenant.admins.id',
    DIRECTOR_ID: 'track.tenant.directors.id',
    TEACHER_ID: 'track.tenant.teachers.id',
};
class TrackCalendarFilterDto extends core_1.BaseFilterDto {
}
exports.TrackCalendarFilterDto = TrackCalendarFilterDto;
_d = FILTER_TRACK_CALENDAR_KEYS.ADMIN_ID, _e = FILTER_TRACK_CALENDAR_KEYS.DIRECTOR_ID, _f = FILTER_TRACK_CALENDAR_KEYS.TEACHER_ID;
__decorate([
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TrackCalendarFilterDto.prototype, _d, void 0);
__decorate([
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TrackCalendarFilterDto.prototype, _e, void 0);
__decorate([
    (0, core_1.IdDecorator)(Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], TrackCalendarFilterDto.prototype, _f, void 0);
class TrackLearningPeriodFilterDto extends TrackCalendarFilterDto {
}
exports.TrackLearningPeriodFilterDto = TrackLearningPeriodFilterDto;
class TrackSemesterFilterDto extends TrackCalendarFilterDto {
}
exports.TrackSemesterFilterDto = TrackSemesterFilterDto;
//# sourceMappingURL=filters.dto.js.map