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
exports.SampleFlagRejectedService = exports.SampleFlagCompletedService = exports.SampleFlagMissingWorkService = exports.SampleFlagErrorService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const core_1 = require("../../../core");
const sample_flag_entity_1 = require("../entities/sample-flag.entity");
let SampleFlagErrorService = class SampleFlagErrorService extends core_1.BaseService {
    constructor(sampleFlagErrorRepository) {
        super(sampleFlagErrorRepository);
        this.sampleFlagErrorRepository = sampleFlagErrorRepository;
    }
};
exports.SampleFlagErrorService = SampleFlagErrorService;
exports.SampleFlagErrorService = SampleFlagErrorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(sample_flag_entity_1.SampleFlagErrorEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SampleFlagErrorService);
let SampleFlagMissingWorkService = class SampleFlagMissingWorkService extends core_1.BaseService {
    constructor(sampleFlagMissingWorkRepository) {
        super(sampleFlagMissingWorkRepository);
        this.sampleFlagMissingWorkRepository = sampleFlagMissingWorkRepository;
    }
};
exports.SampleFlagMissingWorkService = SampleFlagMissingWorkService;
exports.SampleFlagMissingWorkService = SampleFlagMissingWorkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(sample_flag_entity_1.SampleFlagMissingWorkEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SampleFlagMissingWorkService);
let SampleFlagCompletedService = class SampleFlagCompletedService extends core_1.BaseService {
    constructor(sampleFlagCompletedRepository) {
        super(sampleFlagCompletedRepository);
        this.sampleFlagCompletedRepository = sampleFlagCompletedRepository;
    }
};
exports.SampleFlagCompletedService = SampleFlagCompletedService;
exports.SampleFlagCompletedService = SampleFlagCompletedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(sample_flag_entity_1.SampleFlagCompletedEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SampleFlagCompletedService);
let SampleFlagRejectedService = class SampleFlagRejectedService extends core_1.BaseService {
    constructor(sampleFlagRejectedRepository) {
        super(sampleFlagRejectedRepository);
        this.sampleFlagRejectedRepository = sampleFlagRejectedRepository;
    }
};
exports.SampleFlagRejectedService = SampleFlagRejectedService;
exports.SampleFlagRejectedService = SampleFlagRejectedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(sample_flag_entity_1.SampleFlagRejectedEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SampleFlagRejectedService);
//# sourceMappingURL=sample-flag.service.js.map