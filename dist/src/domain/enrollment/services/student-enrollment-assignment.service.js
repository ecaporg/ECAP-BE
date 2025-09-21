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
exports.StudentLPEnrollmentAssignmentService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const core_1 = require("../../../core");
const student_enrollment_assignment_entity_1 = require("../entities/student-enrollment-assignment.entity");
let StudentLPEnrollmentAssignmentService = class StudentLPEnrollmentAssignmentService extends core_1.BaseService {
    constructor(studentLPEnrollmentAssignmentRepository) {
        super(studentLPEnrollmentAssignmentRepository, {
            primaryKeys: ['assignment_id', 'student_lp_enrollment_id'],
            defaultSortByOptions: { assignment_id: core_1.SortDirectionEnum.ASC },
        });
        this.studentLPEnrollmentAssignmentRepository = studentLPEnrollmentAssignmentRepository;
    }
    getRepository() {
        return this.studentLPEnrollmentAssignmentRepository;
    }
};
exports.StudentLPEnrollmentAssignmentService = StudentLPEnrollmentAssignmentService;
exports.StudentLPEnrollmentAssignmentService = StudentLPEnrollmentAssignmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(student_enrollment_assignment_entity_1.StudentLPEnrollmentAssignmentEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], StudentLPEnrollmentAssignmentService);
//# sourceMappingURL=student-enrollment-assignment.service.js.map