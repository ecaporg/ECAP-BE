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
exports.SubjectEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const sample_entity_1 = require("../../students/entities/sample.entity");
const track_entity_1 = require("./track.entity");
let SubjectEntity = class SubjectEntity extends core_1.GenericEntity {
};
exports.SubjectEntity = SubjectEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Track ID associated with this subject' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SubjectEntity.prototype, "track_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Canvas course id', nullable: true }),
    (0, typeorm_1.Column)({ nullable: true, length: 50 }),
    __metadata("design:type", String)
], SubjectEntity.prototype, "canvas_course_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Canvas additional info', nullable: true }),
    (0, typeorm_1.Column)({ nullable: true, type: 'json' }),
    __metadata("design:type", Object)
], SubjectEntity.prototype, "canvas_additional_info", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Subject name', maxLength: 250 }),
    (0, typeorm_1.Column)({ length: 250 }),
    __metadata("design:type", String)
], SubjectEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Track associated with this subject',
        type: () => track_entity_1.TrackEntity,
    }),
    (0, typeorm_1.ManyToOne)(() => track_entity_1.TrackEntity, (track) => track.subjects, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'track_id' }),
    __metadata("design:type", track_entity_1.TrackEntity)
], SubjectEntity.prototype, "track", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Samples associated with this subject',
        type: () => [{}],
    }),
    (0, typeorm_1.OneToMany)(() => sample_entity_1.SampleEntity, (sample) => sample.subject),
    __metadata("design:type", Array)
], SubjectEntity.prototype, "samples", void 0);
exports.SubjectEntity = SubjectEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'subjects' })
], SubjectEntity);
//# sourceMappingURL=subject.entity.js.map