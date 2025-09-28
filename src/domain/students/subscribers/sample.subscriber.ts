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
        await queryRunner.query(
          `
          WITH assignment_stats AS (
            SELECT
              sle.id,
              COUNT(slea.student_lp_enrollment_id) as total_assignments,
              COUNT(CASE WHEN s.status = 'COMPLETED' THEN 1 END) as completed_assignments,
              CASE
                WHEN COUNT(slea.student_lp_enrollment_id) > 0 THEN
                  (COUNT(CASE WHEN s.status = 'COMPLETED' THEN 1 END)::decimal / COUNT(slea.student_lp_enrollment_id)::decimal) * 100
                ELSE 0
              END as calculated_percentage,
              CASE
                WHEN COUNT(slea.student_lp_enrollment_id) = 0 THEN false
                WHEN COUNT(slea.student_lp_enrollment_id) = COUNT(CASE WHEN s.status = 'COMPLETED' THEN 1 END) THEN true
                ELSE false
              END as is_completed
            FROM student_lp_enrollments sle
            LEFT JOIN student_lp_enrollment_assignments slea ON slea.student_lp_enrollment_id = sle.id
            LEFT JOIN samples s ON s.id = slea.sample_id
            WHERE sle.id = $1
            GROUP BY sle.id
          )
        UPDATE student_lp_enrollments
        SET
          percentage = assignment_stats.calculated_percentage,
          completed = assignment_stats.is_completed
        FROM assignment_stats
        WHERE student_lp_enrollments.id = assignment_stats.id;`,
          [studentLPEnrollment.id],
        );

        this.logger.log(
          `Successfully updated stats for Student LP enrollment where sample id: ${sampleId}`,
        );
        if (startedTransaction) {
          await queryRunner.commitTransaction();
        }
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
