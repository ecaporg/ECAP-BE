import { SemesterEntity } from '../entities/semester.entity';
interface TrackSemester extends SemesterEntity {
}
export declare class CreateTrackSemesterDto implements Pick<TrackSemester, 'track_id' | 'start_date' | 'end_date' | 'name'> {
    name: string;
    track_id: number;
    start_date: Date;
    end_date: Date;
}
declare const UpdateTrackSemesterDto_base: import("@nestjs/common").Type<Partial<CreateTrackSemesterDto>>;
export declare class UpdateTrackSemesterDto extends UpdateTrackSemesterDto_base {
}
export {};
