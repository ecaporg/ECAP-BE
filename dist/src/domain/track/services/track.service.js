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
exports.TrackService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const core_1 = require("../../../core");
const staff_service_1 = require("../../staff/services/staff.service");
const academic_year_service_1 = require("../../track/services/academic-year.service");
const track_entity_1 = require("../entities/track.entity");
const track_calendar_service_1 = require("./track-calendar.service");
let TrackService = class TrackService extends core_1.BaseService {
    constructor(trackRepository, adminService, academicYearService, trackCalendarService) {
        super(trackRepository, {
            defaultRelations: ['tenant', 'academicYear'],
        });
        this.trackRepository = trackRepository;
        this.adminService = adminService;
        this.academicYearService = academicYearService;
        this.trackCalendarService = trackCalendarService;
    }
    async adminCreate(createTrackDto, user) {
        const admin = await this.adminService.findOne({ id: user.id });
        let academicYear;
        const from = createTrackDto.start_date.getFullYear();
        const to = createTrackDto.end_date.getFullYear();
        try {
            academicYear = await this.academicYearService.findOne({
                from,
                to,
            });
        }
        catch (ignore) {
            academicYear = await this.academicYearService.create({
                from,
                to,
            });
        }
        return this.create({
            ...createTrackDto,
            tenant_id: admin.tenant_id,
            academic_year_id: academicYear.id,
        });
    }
};
exports.TrackService = TrackService;
exports.TrackService = TrackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(track_entity_1.TrackEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        staff_service_1.AdminService,
        academic_year_service_1.AcademicYearService,
        track_calendar_service_1.TrackCalendarService])
], TrackService);
//# sourceMappingURL=track.service.js.map