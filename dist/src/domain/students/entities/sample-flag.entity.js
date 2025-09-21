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
exports.SampleFlagRejectedEntity = exports.SampleFlagCompletedEntity = exports.SampleFlagMissingWorkEntity = exports.SampleFlagErrorEntity = exports.SampleFlagEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../../auth/entities/user.entity");
const core_1 = require("../../../core");
const sample_entity_1 = require("./sample.entity");
class SampleFlagEntity extends core_1.DatedGenericEntity {
}
exports.SampleFlagEntity = SampleFlagEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sample ID' }),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], SampleFlagEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'User ID', nullable: true }),
    __metadata("design:type", Number)
], SampleFlagEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    (0, swagger_1.ApiProperty)({ description: 'User', type: () => Object }),
    __metadata("design:type", Object)
], SampleFlagEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => sample_entity_1.SampleEntity, (sample) => sample.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id' }),
    (0, swagger_1.ApiProperty)({ description: 'Sample', type: () => Object }),
    __metadata("design:type", Object)
], SampleFlagEntity.prototype, "sample", void 0);
let SampleFlagErrorEntity = class SampleFlagErrorEntity extends SampleFlagEntity {
};
exports.SampleFlagErrorEntity = SampleFlagErrorEntity;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Comment' }),
    __metadata("design:type", String)
], SampleFlagErrorEntity.prototype, "comment", void 0);
exports.SampleFlagErrorEntity = SampleFlagErrorEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sample_flag_errors' })
], SampleFlagErrorEntity);
let SampleFlagMissingWorkEntity = class SampleFlagMissingWorkEntity extends SampleFlagEntity {
};
exports.SampleFlagMissingWorkEntity = SampleFlagMissingWorkEntity;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Reason' }),
    __metadata("design:type", String)
], SampleFlagMissingWorkEntity.prototype, "reason", void 0);
exports.SampleFlagMissingWorkEntity = SampleFlagMissingWorkEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sample_flag_missing_work' })
], SampleFlagMissingWorkEntity);
let SampleFlagCompletedEntity = class SampleFlagCompletedEntity extends SampleFlagEntity {
};
exports.SampleFlagCompletedEntity = SampleFlagCompletedEntity;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Message' }),
    __metadata("design:type", String)
], SampleFlagCompletedEntity.prototype, "message", void 0);
exports.SampleFlagCompletedEntity = SampleFlagCompletedEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sample_flag_completed' })
], SampleFlagCompletedEntity);
let SampleFlagRejectedEntity = class SampleFlagRejectedEntity extends SampleFlagEntity {
};
exports.SampleFlagRejectedEntity = SampleFlagRejectedEntity;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'Reason' }),
    __metadata("design:type", String)
], SampleFlagRejectedEntity.prototype, "reason", void 0);
exports.SampleFlagRejectedEntity = SampleFlagRejectedEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sample_flag_rejected' })
], SampleFlagRejectedEntity);
//# sourceMappingURL=sample-flag.entity.js.map