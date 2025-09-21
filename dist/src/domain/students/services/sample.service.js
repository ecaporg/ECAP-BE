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
exports.SampleService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const core_1 = require("../../../core");
const core_2 = require("../../../core");
const sample_entity_1 = require("../entities/sample.entity");
const sample_flag_service_1 = require("./sample-flag.service");
let SampleService = class SampleService extends core_2.BaseService {
    constructor(sampleRepository, sampleFlagErrorService, sampleFlagMissingWorkService, sampleFlagRejectedService, sampleFlagCompletedService) {
        super(sampleRepository, {
            defaultRelations: {
                student_lp_enrollment_assignment: {
                    assignment: {
                        course: true,
                    },
                    student_lp_enrollment: {
                        learning_period: {
                            track: true,
                        },
                        student: {
                            user: true,
                        },
                    },
                },
                done_by: true,
                flag_errors: { user: true },
                flag_missing_work: { user: true },
                flag_rejected: { user: true },
                flag_completed: { user: true },
            },
        });
        this.sampleRepository = sampleRepository;
        this.sampleFlagErrorService = sampleFlagErrorService;
        this.sampleFlagMissingWorkService = sampleFlagMissingWorkService;
        this.sampleFlagRejectedService = sampleFlagRejectedService;
        this.sampleFlagCompletedService = sampleFlagCompletedService;
    }
    async updateSample(id, data) {
        return this.sampleRepository.update(id, data);
    }
    async flagError(id, user_id, createDto) {
        await this.update(id, {
            status: sample_entity_1.SampleStatus.FLAGGED_TO_ADMIN,
            flag_category: sample_entity_1.SampleFlagCategory.ERROR_IN_SAMPLE,
        });
        return this.sampleFlagErrorService.create({
            ...createDto,
            id,
            user_id,
        });
    }
    async flagMissingWork(id, user_id, createDto) {
        await this.update(id, {
            status: sample_entity_1.SampleStatus.FLAGGED_TO_ADMIN,
            flag_category: sample_entity_1.SampleFlagCategory.MISSING_SAMPLE,
        });
        return this.sampleFlagMissingWorkService.create({
            ...createDto,
            id,
            user_id,
        });
    }
    async flagRejected(id, user_id, createDto) {
        await this.update(id, {
            status: sample_entity_1.SampleStatus.REASON_REJECTED,
            flag_category: sample_entity_1.SampleFlagCategory.REASON_REJECTED,
        });
        return this.sampleFlagRejectedService.create({
            ...createDto,
            id,
            user_id,
        });
    }
    async flagCompleted(id, user_id, createDto) {
        return this.sampleFlagCompletedService.create({
            ...createDto,
            id,
            user_id,
        });
    }
    async getFlaggedSamples(options) {
        const paginationOptions = (0, core_1.extractPaginationOptions)(options);
        return this.findAll(paginationOptions);
    }
    async uploadToStudentPathway(id) {
        const sample = await this.findOneBy({ id });
        return sample;
    }
};
exports.SampleService = SampleService;
exports.SampleService = SampleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(sample_entity_1.SampleEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        sample_flag_service_1.SampleFlagErrorService,
        sample_flag_service_1.SampleFlagMissingWorkService,
        sample_flag_service_1.SampleFlagRejectedService,
        sample_flag_service_1.SampleFlagCompletedService])
], SampleService);
//# sourceMappingURL=sample.service.js.map