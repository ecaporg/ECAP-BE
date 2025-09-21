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
exports.SemesterEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../../core");
const track_entity_1 = require("./track.entity");
let SemesterEntity = class SemesterEntity extends core_1.IDGenericEntity {
};
exports.SemesterEntity = SemesterEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Track ID associated with this semester' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SemesterEntity.prototype, "track_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Semester name', maxLength: 250 }),
    (0, typeorm_1.Column)({ length: 250 }),
    __metadata("design:type", String)
], SemesterEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Semester start date' }),
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], SemesterEntity.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Semester end date' }),
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], SemesterEntity.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Track associated with this semester',
        type: () => track_entity_1.TrackEntity,
    }),
    (0, typeorm_1.ManyToOne)(() => track_entity_1.TrackEntity, (track) => track.semesters, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'track_id' }),
    __metadata("design:type", Object)
], SemesterEntity.prototype, "track", void 0);
exports.SemesterEntity = SemesterEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'semesters' })
], SemesterEntity);
//# sourceMappingURL=semester.entity.js.map