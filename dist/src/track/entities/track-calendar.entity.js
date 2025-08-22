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
exports.TrackCalendarEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const track_entity_1 = require("./track.entity");
let TrackCalendarEntity = class TrackCalendarEntity extends core_1.DatedGenericEntity {
};
exports.TrackCalendarEntity = TrackCalendarEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Track ID associated with this calendar entry' }),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], TrackCalendarEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'JSON calendar of calendar days and types' }),
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Array)
], TrackCalendarEntity.prototype, "days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Track ID associated with this calendar entry',
        type: () => track_entity_1.TrackEntity,
    }),
    (0, typeorm_1.OneToOne)(() => track_entity_1.TrackEntity, (track) => track.calendar, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id' }),
    __metadata("design:type", track_entity_1.TrackEntity)
], TrackCalendarEntity.prototype, "track", void 0);
exports.TrackCalendarEntity = TrackCalendarEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'track_calendar' })
], TrackCalendarEntity);
//# sourceMappingURL=track-calendar.entity.js.map