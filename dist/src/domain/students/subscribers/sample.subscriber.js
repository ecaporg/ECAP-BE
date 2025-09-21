"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SampleSubscriber_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleSubscriber = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const student_enrollment_entity_1 = require("../../enrollment/entities/student-enrollment.entity");
const sample_entity_1 = require("../../students/entities/sample.entity");
let SampleSubscriber = SampleSubscriber_1 = class SampleSubscriber {
    constructor() {
        this.logger = new common_1.Logger(SampleSubscriber_1.name);
    }
    listenTo() {
        return sample_entity_1.SampleEntity;
    }
    async afterUpdate(event) {
        this.logger.log(`Detected update for Sample with id: ${event.entity?.id}`);
        this.logger.log(`Updated columns: ${event.updatedColumns.map((c) => c.propertyName).join(', ')}`);
        if (event.entity &&
            event.updatedColumns.some((column) => column.propertyName === 'status') &&
            event.entity.status === sample_entity_1.SampleStatus.COMPLETED) {
            this.logger.log(`Updating stats for Student LP enrollment where sample id: ${event.entity.id}`);
            await this.updateStudentLPEnrollmentStats(event.entity.id, event.queryRunner);
        }
    }
    async afterRemove(event) {
        this.logger.log(`Detected remove for Sample with id: ${event.entity?.id}`);
        if (event.entity && event.entity.id) {
            this.logger.log(`Updating stats for Student LP enrollment where sample id: ${event.entity.id}`);
            await this.updateStudentLPEnrollmentStats(event.entity.id, event.queryRunner);
        }
    }
    async updateStudentLPEnrollmentStats(sampleId, queryRunner) {
        const startedTransaction = !queryRunner.isTransactionActive;
        if (startedTransaction) {
            await queryRunner.connect();
            await queryRunner.startTransaction();
        }
        try {
            const sample = await queryRunner.manager.findOne(sample_entity_1.SampleEntity, {
                where: { id: sampleId },
                relations: {
                    student_lp_enrollment_assignment: {
                        student_lp_enrollment: true,
                    },
                },
            });
            for (const studentLPEnrollment of [
                sample.student_lp_enrollment_assignment.student_lp_enrollment,
            ]) {
                const samples = await queryRunner.manager.find(sample_entity_1.SampleEntity, {
                    where: {
                        student_lp_enrollment_assignment: {
                            student_lp_enrollment: {
                                id: studentLPEnrollment.id,
                            },
                        },
                    },
                });
                const totalSamples = samples.length;
                const completedSamples = samples.filter((sample) => sample.status === sample_entity_1.SampleStatus.COMPLETED).length;
                const percentage = totalSamples > 0
                    ? parseFloat(((completedSamples * 100.0) / totalSamples).toFixed(2))
                    : 0;
                const completed = totalSamples > 0 && completedSamples === totalSamples;
                studentLPEnrollment.percentage = percentage;
                studentLPEnrollment.completed = completed;
                this.logger.log(`Stats calculated for Student LP enrollment ${studentLPEnrollment.id}: completed=${completed}, percentage=${percentage}`);
            }
            await queryRunner.manager.save(student_enrollment_entity_1.StudentLPEnrollmentEntity, sample.student_lp_enrollment_assignment.student_lp_enrollment);
            this.logger.log(`Successfully updated stats for Student LP enrollment where sample id: ${sampleId}`);
            if (startedTransaction) {
                await queryRunner.commitTransaction();
            }
        }
        catch (error) {
            if (startedTransaction) {
                await queryRunner.rollbackTransaction();
            }
            this.logger.error(error);
        }
        finally {
            if (startedTransaction) {
                await queryRunner.release();
            }
        }
    }
};
exports.SampleSubscriber = SampleSubscriber;
exports.SampleSubscriber = SampleSubscriber = SampleSubscriber_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EventSubscriber)()
], SampleSubscriber);
//# sourceMappingURL=sample.subscriber.js.map