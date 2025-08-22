import { AttachUserIdInterceptor } from 'src/core';
import { SemesterEntity } from '../entities/semester.entity';
export declare class TrackSemesterFilterInterceptor extends AttachUserIdInterceptor<SemesterEntity> {
    constructor();
}
