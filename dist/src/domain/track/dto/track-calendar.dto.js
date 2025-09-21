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
exports.UpdateTrackCalendarDto = exports.CreateTrackCalendarDto = exports.CalendarDayDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CalendarDayDto {
}
exports.CalendarDayDto = CalendarDayDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Calendar day' }),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CalendarDayDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Calendar type' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CalendarDayDto.prototype, "type", void 0);
class CreateTrackCalendarDto {
}
exports.CreateTrackCalendarDto = CreateTrackCalendarDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Track calendar days' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CalendarDayDto),
    __metadata("design:type", Array)
], CreateTrackCalendarDto.prototype, "days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Track ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTrackCalendarDto.prototype, "id", void 0);
class UpdateTrackCalendarDto extends (0, swagger_1.PartialType)(CreateTrackCalendarDto) {
}
exports.UpdateTrackCalendarDto = UpdateTrackCalendarDto;
//# sourceMappingURL=track-calendar.dto.js.map