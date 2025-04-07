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
const user_entity_1 = require("./entities/user.entity");
const user_role_entity_1 = require("./entities/user-role.entity");
let UsersService = class UsersService {
    constructor(userRepository, userRoleRepository) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
    }
    async createUser(createUserDto) {
        return this.userRepository.save({
            ...createUserDto,
            email: createUserDto.email.toLowerCase(),
        });
    }
    countUsers() {
        return this.userRepository.count();
    }
    async findUserByEmail(email) {
        return this.userRepository.findOneBy({
            email: email.toLowerCase(),
        });
    }
    findUserById(userId) {
        return this.userRepository.findOneBy({ id: userId });
    }
    async updateUser(id, updateUserDTO) {
        await this.userRepository.update(id, updateUserDTO);
        return this.userRepository.findOneBy({ id });
    }
    async updatePassword(id, newPassword) {
        await this.userRepository.update(id, { password: newPassword });
    }
    async markEmailAsVerified(email) {
        await this.userRepository.update({ email }, {
            emailVerified: true,
        });
    }
    async getUserRoles(userId) {
        const query = this.userRoleRepository
            .createQueryBuilder('userRole')
            .innerJoinAndSelect('userRole.role', 'role')
            .where('userRole.user=:userId', { userId });
        const userRoles = await query.getMany();
        return userRoles.map((userRole) => ({
            id: userRole.role.id,
            name: userRole.role.name,
        }));
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(user_role_entity_1.UserRoleEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map