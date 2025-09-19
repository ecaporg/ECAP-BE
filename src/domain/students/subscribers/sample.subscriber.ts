import {
  EntitySubscriberInterface,
  EventSubscriber,
  QueryRunner,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';

import { Injectable, Logger } from '@nestjs/common';

import { StudentLPEnrollmentEntity } from '../../enrollment/entities/student-enrollment.entity';
import {
  SampleEntity,
  SampleStatus,
} from '../../students/entities/sample.entity';

@Injectable()
@EventSubscriber()
export class SampleSubscriber
  implements EntitySubscriberInterface<SampleEntity>
{
  private readonly logger = new Logger(SampleSubscriber.name);
  listenTo() {
    return SampleEntity;
  }

  // async afterInsert(event: InsertEvent<SampleEntity>) {
  //   this.logger.log(`Detected insert for Sample with id: ${event.entity?.id}`);
  //   if (event.entity && event.entity.student_lp_enrollment_id) {
  //     this.logger.log(
  //       `Updating stats for Student LP enrollment id: ${event.entity.student_lp_enrollment_id}`,
  //     );
  //     await this.updateStudentLPEnrollmentStats(
  //       event.entity.student_lp_enrollment_id,
  //       event.queryRunner,
  //     );
  //   }
  // }

  async afterUpdate(event: UpdateEvent<SampleEntity>): Promise<void> {
    this.logger.log(`Detected update for Sample with id: ${event.entity?.id}`);
    this.logger.log(
      `Updated columns: ${event.updatedColumns.map((c) => c.propertyName).join(', ')}`,
    );

    if (
      event.entity &&
      event.updatedColumns.some((column) => column.propertyName === 'status') &&
      event.entity.status === SampleStatus.COMPLETED
    ) {
      this.logger.log(
        `Updating stats for Student LP enrollment where sample id: ${event.entity.id}`,
      );
      await this.updateStudentLPEnrollmentStats(
        event.entity.id,
        event.queryRunner,
      );
    }
  }

  async afterRemove(event: RemoveEvent<SampleEntity>) {
    this.logger.log(`Detected remove for Sample with id: ${event.entity?.id}`);
    if (event.entity && event.entity.id) {
      this.logger.log(
        `Updating stats for Student LP enrollment where sample id: ${event.entity.id}`,
      );
      await this.updateStudentLPEnrollmentStats(
        event.entity.id,
        event.queryRunner,
      );
    }
  }

  private async updateStudentLPEnrollmentStats(
    sampleId: number,
    queryRunner: QueryRunner,
  ): Promise<void> {
    const startedTransaction = !queryRunner.isTransactionActive;
    if (startedTransaction) {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    }
    try {
      const sample = await queryRunner.manager.findOne(SampleEntity, {
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
        const samples = await queryRunner.manager.find(SampleEntity, {
          where: {
            student_lp_enrollment_assignment: {
              student_lp_enrollment: {
                id: studentLPEnrollment.id,
              },
            },
          },
        });
        const totalSamples = samples.length;
        const completedSamples = samples.filter(
          (sample) => sample.status === SampleStatus.COMPLETED,
        ).length;
        const percentage =
          totalSamples > 0
            ? parseFloat(((completedSamples * 100.0) / totalSamples).toFixed(2))
            : 0;
        const completed = totalSamples > 0 && completedSamples === totalSamples;
        studentLPEnrollment.percentage = percentage;
        studentLPEnrollment.completed = completed;
        this.logger.log(
          `Stats calculated for Student LP enrollment ${studentLPEnrollment.id}: completed=${completed}, percentage=${percentage}`,
        );
      }
      await queryRunner.manager.save(
        StudentLPEnrollmentEntity,
        sample.student_lp_enrollment_assignment.student_lp_enrollment,
      );
      this.logger.log(
        `Successfully updated stats for Student LP enrollment where sample id: ${sampleId}`,
      );
      if (startedTransaction) {
        await queryRunner.commitTransaction();
      }
    } catch (error) {
      if (startedTransaction) {
        await queryRunner.rollbackTransaction();
      }
      this.logger.error(error);
    } finally {
      if (startedTransaction) {
        await queryRunner.release();
      }
    }
  }
}
