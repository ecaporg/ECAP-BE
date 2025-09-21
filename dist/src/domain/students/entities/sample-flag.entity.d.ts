import { ISampleFlag, ISampleFlagCompleted, ISampleFlagError, ISampleFlagMissingWork, ISampleFlagRejected } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { UserEntity } from '../../../auth/entities/user.entity';
import { DatedGenericEntity } from '../../../core';
import { SampleEntity } from './sample.entity';
export declare class SampleFlagEntity extends DatedGenericEntity implements ISampleFlag {
    id: number;
    user_id: number;
    user: Relation<UserEntity>;
    sample: Relation<SampleEntity>;
}
export declare class SampleFlagErrorEntity extends SampleFlagEntity implements ISampleFlagError {
    comment: string;
}
export declare class SampleFlagMissingWorkEntity extends SampleFlagEntity implements ISampleFlagMissingWork {
    reason: string;
}
export declare class SampleFlagCompletedEntity extends SampleFlagEntity implements ISampleFlagCompleted {
    message: string;
}
export declare class SampleFlagRejectedEntity extends SampleFlagEntity implements ISampleFlagRejected {
    reason: string;
}
