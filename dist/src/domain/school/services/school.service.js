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
exports.SchoolService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const core_1 = require("../../../core");
const staff_service_1 = require("../../staff/services/staff.service");
const school_entity_1 = require("../entities/school.entity");
let SchoolService = class SchoolService extends core_1.BaseService {
    constructor(schoolRepository, adminService) {
        super(schoolRepository, {
            defaultRelations: ['tenant'],
        });
        this.schoolRepository = schoolRepository;
        this.adminService = adminService;
    }
    async adminCreate(data, user) {
        const admin = await this.adminService.findOne({ id: user.id });
        const school = this.create({
            ...data,
            tenant_id: admin.tenant.id,
        });
        return school;
    }
};
exports.SchoolService = SchoolService;
exports.SchoolService = SchoolService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(school_entity_1.SchoolEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        staff_service_1.AdminService])
], SchoolService);
//# sourceMappingURL=school.service.js.map