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
exports.AcademicYearService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const core_1 = require("../../core");
const academic_year_entity_1 = require("../entities/academic-year.entity");
let AcademicYearService = class AcademicYearService extends core_1.BaseService {
    constructor(academicYearRepository) {
        super(academicYearRepository);
        this.academicYearRepository = academicYearRepository;
    }
    async findCurrentAcademicYears(date) {
        const currentDate = date || new Date();
        const academicYears = await this.academicYearRepository.find({
            where: {
                tracks: {
                    semesters: {
                        start_date: (0, typeorm_1.LessThanOrEqual)(currentDate),
                        end_date: (0, typeorm_1.MoreThanOrEqual)(currentDate),
                    },
                },
            },
        });
        if (!academicYears.length) {
            return this.academicYearRepository.find({
                order: { to: 'DESC' },
            });
        }
        return academicYears;
    }
};
exports.AcademicYearService = AcademicYearService;
exports.AcademicYearService = AcademicYearService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(academic_year_entity_1.AcademicYearEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AcademicYearService);
//# sourceMappingURL=academic-year.service.js.map