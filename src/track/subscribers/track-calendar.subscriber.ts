import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  QueryRunner,
} from 'typeorm';

import { Injectable, Logger } from '@nestjs/common';

import { TrackEntity } from '../entities/track.entity';
import { TrackCalendarEntity } from '../entities/track-calendar.entity';

@Injectable()
@EventSubscriber()
export class TrackCalendarSubscriber
  implements EntitySubscriberInterface<TrackEntity>
{
  private readonly logger = new Logger(TrackCalendarSubscriber.name);
  listenTo() {
    return TrackEntity;
  }

  async afterInsert(event: InsertEvent<TrackEntity>) {
    this.logger.log(`Detected insert for Track with id: ${event.entity?.id}`);
    if (event.entity) {
      this.logger.log(
        `Creating TrackCalendar for Track id: ${event.entity.id}`,
      );
      await this.createTrackCalendar(event.entity.id, event.queryRunner);
    }
  }

  private async createTrackCalendar(
    trackId: number,
    queryRunner: QueryRunner,
  ): Promise<void> {
    const startedTransaction = !queryRunner.isTransactionActive;

    if (startedTransaction) {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    }

    try {
      await queryRunner.manager.save(TrackCalendarEntity, {
        id: trackId,
        days: [],
      });

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
