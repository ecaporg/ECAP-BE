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
exports.AuthUserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class AuthUserDTO {
}
exports.AuthUserDTO = AuthUserDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID',
        example: 1,
    }),
    __metadata("design:type", Number)
], AuthUserDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User first name',
        example: 'John',
    }),
    __metadata("design:type", String)
], AuthUserDTO.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User last name',
        example: 'Doe',
    }),
    __metadata("design:type", String)
], AuthUserDTO.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User email address',
        example: 'john.doe@example.com',
    }),
    __metadata("design:type", String)
], AuthUserDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Account active status',
        example: true,
    }),
    __metadata("design:type", Boolean)
], AuthUserDTO.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email verification status',
        example: true,
    }),
    __metadata("design:type", Boolean)
], AuthUserDTO.prototype, "emailVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User roles',
        type: [String],
        example: ['user'],
    }),
    __metadata("design:type", Array)
], AuthUserDTO.prototype, "roles", void 0);
//# sourceMappingURL=auth-user.dto.js.map