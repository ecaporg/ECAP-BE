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
exports.TenantGenericEntity = exports.IDCanvasGenericEntity = exports.CanvasGenericEntity = exports.GenericEntity = exports.DatedGenericEntity = exports.IDGenericEntity = exports.IDIntGenericEntity = void 0;
const typeorm_1 = require("typeorm");
class IDIntGenericEntity {
}
exports.IDIntGenericEntity = IDIntGenericEntity;
class IDGenericEntity {
}
exports.IDGenericEntity = IDGenericEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], IDGenericEntity.prototype, "id", void 0);
class DatedGenericEntity {
}
exports.DatedGenericEntity = DatedGenericEntity;
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DatedGenericEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DatedGenericEntity.prototype, "createdAt", void 0);
class GenericEntity extends DatedGenericEntity {
}
exports.GenericEntity = GenericEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GenericEntity.prototype, "id", void 0);
class CanvasGenericEntity extends GenericEntity {
}
exports.CanvasGenericEntity = CanvasGenericEntity;
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 20 }),
    __metadata("design:type", String)
], CanvasGenericEntity.prototype, "canvas_id", void 0);
class IDCanvasGenericEntity extends IDGenericEntity {
}
exports.IDCanvasGenericEntity = IDCanvasGenericEntity;
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 20 }),
    __metadata("design:type", String)
], IDCanvasGenericEntity.prototype, "canvas_id", void 0);
class TenantGenericEntity extends IDGenericEntity {
}
exports.TenantGenericEntity = TenantGenericEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TenantGenericEntity.prototype, "tenant_id", void 0);
//# sourceMappingURL=generic-entity.js.map