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
exports.DirectorService = exports.AdminService = exports.TeacherService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const core_1 = require("../../core");
const staff_entity_1 = require("../entities/staff.entity");
let TeacherService = class TeacherService extends core_1.BaseService {
    constructor(teacherRepository) {
        super(teacherRepository, {
            defaultRelations: ['user'],
        });
        this.teacherRepository = teacherRepository;
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(staff_entity_1.TeacherEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TeacherService);
let AdminService = class AdminService extends core_1.BaseService {
    constructor(adminRepository) {
        super(adminRepository, {
            defaultRelations: ['user', 'tenant'],
        });
        this.adminRepository = adminRepository;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(staff_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AdminService);
let DirectorService = class DirectorService extends core_1.BaseService {
    constructor(directorRepository) {
        super(directorRepository, {
            defaultRelations: ['user', 'academy'],
        });
        this.directorRepository = directorRepository;
    }
};
exports.DirectorService = DirectorService;
exports.DirectorService = DirectorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(staff_entity_1.DirectorEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], DirectorService);
//# sourceMappingURL=staff.service.js.map