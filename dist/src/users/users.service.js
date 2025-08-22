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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const core_1 = require("../core");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService extends core_1.BaseService {
    constructor(userRepository) {
        super(userRepository);
        this.userRepository = userRepository;
    }
    async createUser(createUserDto) {
        return this.create({
            ...createUserDto,
            email: createUserDto.email.toLowerCase(),
        });
    }
    countUsers() {
        return this.repository.count();
    }
    async findUserByEmail(email) {
        return this.findOneBy({
            email: (0, typeorm_1.ILike)(`%${email}%`),
        });
    }
    findUserById(userId) {
        return this.findOne(userId).catch(() => null);
    }
    async updateUser(id, updateUserDTO) {
        return this.update(id, updateUserDTO);
    }
    async updatePassword(id, newPassword) {
        await this.update(id, { password: newPassword });
    }
    async markEmailAsVerified(email) {
        await this.repository.update({ email }, {
            emailVerified: true,
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map