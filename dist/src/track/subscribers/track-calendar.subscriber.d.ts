import { EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { TrackEntity } from '../entities/track.entity';
export declare class TrackCalendarSubscriber implements EntitySubscriberInterface<TrackEntity> {
    private readonly logger;
    listenTo(): typeof TrackEntity;
    afterInsert(event: InsertEvent<TrackEntity>): Promise<void>;
    private createTrackCalendar;
}
