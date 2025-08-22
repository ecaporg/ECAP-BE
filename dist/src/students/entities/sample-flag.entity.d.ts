import { DatedGenericEntity } from 'src/core';
import { UserEntity } from 'src/users/entities/user.entity';
import { SampleEntity } from './sample.entity';
export declare class SampleFlagEntity extends DatedGenericEntity {
    id: number;
    user_id: number;
    user: UserEntity;
    sample: SampleEntity;
}
export declare class SampleFlagErrorEntity extends SampleFlagEntity {
    comment: string;
}
export declare class SampleFlagMissingWorkEntity extends SampleFlagEntity {
    reason: string;
}
export declare class SampleFlagCompletedEntity extends SampleFlagEntity {
    message: string;
}
export declare class SampleFlagRejectedEntity extends SampleFlagEntity {
    reason: string;
}
