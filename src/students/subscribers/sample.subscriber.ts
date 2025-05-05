import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  QueryRunner,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';

import { Injectable, Logger } from '@nestjs/common';

import { AssignmentPeriodEntity } from '@/school/entities/assignment.entity';
import { SampleEntity, SampleStatus } from '@/students/entities/sample.entity';

@Injectable()
@EventSubscriber()
export class SampleSubscriber
  implements EntitySubscriberInterface<SampleEntity>
{
  private readonly logger = new Logger(SampleSubscriber.name);
  listenTo() {
    return SampleEntity;
  }

  async afterInsert(event: InsertEvent<SampleEntity>) {
    this.logger.log(`Detected insert for Sample with id: ${event.entity?.id}`);
    if (event.entity && event.entity.assignment_period_id) {
      this.logger.log(
        `Updating stats for AssignmentPeriod id: ${event.entity.assignment_period_id}`,
      );
      await this.updateAssignmentPeriodStats(
        event.entity.assignment_period_id,
        event.queryRunner,
      );
    }
  }

  async afterUpdate(event: UpdateEvent<SampleEntity>): Promise<void> {
    this.logger.log(`Detected update for Sample with id: ${event.entity?.id}`);
    this.logger.log(
      `Updated columns: ${event.updatedColumns.map((c) => c.propertyName).join(', ')}`,
    );

    if (
      event.entity &&
      event.entity.assignment_period_id &&
      event.updatedColumns.some((column) => column.propertyName === 'status')
    ) {
      this.logger.log(
        `Updating stats for AssignmentPeriod id: ${event.entity.assignment_period_id}`,
      );
      await this.updateAssignmentPeriodStats(
        event.entity.assignment_period_id,
        event.queryRunner,
      );
    }
  }

  async afterRemove(event: RemoveEvent<SampleEntity>) {
    this.logger.log(`Detected remove for Sample with id: ${event.entity?.id}`);
    if (event.entity && event.entity.assignment_period_id) {
      this.logger.log(
        `Updating stats for AssignmentPeriod id: ${event.entity.assignment_period_id}`,
      );
      await this.updateAssignmentPeriodStats(
        event.entity.assignment_period_id,
        event.queryRunner,
      );
    }
  }

  private async updateAssignmentPeriodStats(
    assignmentPeriodId: number,
    queryRunner: QueryRunner,
  ): Promise<void> {
    const startedTransaction = !queryRunner.isTransactionActive;

    if (startedTransaction) {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    }

    try {
      const samples = await queryRunner.manager.find(SampleEntity, {
        where: { assignment_period_id: assignmentPeriodId },
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

      this.logger.log(
        `Stats calculated for AssignmentPeriod ${assignmentPeriodId}: completed=${completed}, percentage=${percentage}`,
      );

      await queryRunner.manager.update(
        AssignmentPeriodEntity,
        { id: assignmentPeriodId },
        {
          percentage,
          completed,
        },
      );

      this.logger.log(
        `Successfully updated stats for AssignmentPeriod ${assignmentPeriodId}`,
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
