import { EntitySubscriberInterface, RemoveEvent, UpdateEvent } from 'typeorm';
import { SampleEntity } from '../../students/entities/sample.entity';
export declare class SampleSubscriber implements EntitySubscriberInterface<SampleEntity> {
    private readonly logger;
    listenTo(): typeof SampleEntity;
    afterUpdate(event: UpdateEvent<SampleEntity>): Promise<void>;
    afterRemove(event: RemoveEvent<SampleEntity>): Promise<void>;
    private updateStudentLPEnrollmentStats;
}
