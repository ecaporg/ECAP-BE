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
exports.CanvasEventService = void 0;
const common_1 = require("@nestjs/common");
const canvas_processor_service_1 = require("./canvas-processor.service");
const canvas_resources_service_1 = require("./canvas-resources.service");
let CanvasEventService = class CanvasEventService {
    constructor(processor, resources) {
        this.processor = processor;
        this.resources = resources;
    }
    async processCourseEvent(event, domain) {
        if (event.body.workflow_state === 'available' ||
            event.body.workflow_state == 'deleted') {
            const { tenant, currentAcademicYear } = await this.processor.findTenantByDomain(domain);
            try {
                const course = await this.resources.fetchCourse(tenant.key, event.body.course_id);
                if (event.body.workflow_state == 'deleted') {
                    await this.processor.handleCourseDeletion(tenant, course);
                }
                const [assignments, teachers, students] = await Promise.all([
                    this.resources.fetchAssignmentsInCourse(tenant.key, course.id),
                    this.resources.fetchTeachersInCourse(tenant.key, course.id),
                    this.resources.fetchStudentsInCourse(tenant.key, course.id),
                ]);
                await this.processor.updateCourse({
                    tenant,
                    currentAcademicYear,
                    course,
                    assignments,
                    teachers,
                    students,
                });
            }
            catch (error) {
                this.processor.logError({ domain, event, error });
            }
        }
    }
    async processAssignmentEvent(event, domain) {
        const { tenant } = await this.processor.findTenantByDomain(domain);
        try {
            const assignment = await this.resources.fetchAssignment(tenant.key, event.metadata.context_id, event.body.assignment_id);
            await this.processor.updateAssignment(tenant, assignment);
        }
        catch (error) {
            this.processor.logError({ domain, event, error });
        }
    }
    async processSubmissionEvent(event, domain) {
        if ((await this.processor.checkAssignment(event.body.assignment_id)) == null) {
            return;
        }
        const { tenant, currentAcademicYear } = await this.processor.findTenantByDomain(domain);
        try {
            const [assignment, course, submission, teachers, [user]] = await Promise.all([
                this.resources.fetchAssignment(tenant.key, event.metadata.context_id, event.body.assignment_id),
                this.resources.fetchCourse(tenant.key, event.metadata.context_id),
                this.resources.fetchSubmission(tenant.key, event.metadata.context_id, event.body.assignment_id, event.body.user_id),
                this.resources.fetchTeachersInCourse(tenant.key, event.metadata.context_id),
                this.resources.fetchUsersInAccount(tenant.key, event.metadata.user_account_id, event.body.user_id),
            ]);
            await this.processor.updateSubmission({
                tenant,
                currentAcademicYear,
                assignment,
                course,
                teachers,
                user,
                submission,
            });
        }
        catch (error) {
            this.processor.logError({ domain, event, error });
        }
    }
    async processEnrollmentEvent(event, domain) {
        if (event.body.type === 'StudentEnrollment' &&
            event.body.workflow_state === 'active') {
            const { tenant, currentAcademicYear } = await this.processor.findTenantByDomain(domain);
            try {
                const [students, course, teachers, assignments] = await Promise.all([
                    this.resources.fetchUsersInAccount(tenant.key, event.metadata.user_account_id, event.body.user_id),
                    this.resources.fetchCourse(tenant.key, event.body.course_id),
                    this.resources.fetchTeachersInCourse(tenant.key, event.body.course_id),
                    this.resources.fetchAssignmentsInCourse(tenant.key, event.body.course_id),
                ]);
                await this.processor.processEnrollmentCreated({
                    tenant,
                    currentAcademicYear,
                    students,
                    course,
                    teachers,
                    assignments,
                });
            }
            catch (error) {
                this.processor.logError({ domain, event, error });
            }
        }
    }
};
exports.CanvasEventService = CanvasEventService;
exports.CanvasEventService = CanvasEventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [canvas_processor_service_1.CanvasProcessorService,
        canvas_resources_service_1.CanvasResourcesService])
], CanvasEventService);
//# sourceMappingURL=canvas-event.service.js.map