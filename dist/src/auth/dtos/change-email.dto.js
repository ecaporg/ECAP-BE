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
exports.ChangeEmailPasswordDTO = exports.ChangeEmailDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let ChangeEmailDTO = class ChangeEmailDTO {
};
exports.ChangeEmailDTO = ChangeEmailDTO;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ChangeEmailDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ChangeEmailDTO.prototype, "newEmail", void 0);
exports.ChangeEmailDTO = ChangeEmailDTO = __decorate([
    (0, swagger_1.ApiTags)('Authentication - email')
], ChangeEmailDTO);
let ChangeEmailPasswordDTO = class ChangeEmailPasswordDTO {
};
exports.ChangeEmailPasswordDTO = ChangeEmailPasswordDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'user password',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangeEmailPasswordDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'new user email',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ChangeEmailPasswordDTO.prototype, "newEmail", void 0);
exports.ChangeEmailPasswordDTO = ChangeEmailPasswordDTO = __decorate([
    (0, swagger_1.ApiTags)('Authentication - email')
], ChangeEmailPasswordDTO);
//# sourceMappingURL=change-email.dto.js.map