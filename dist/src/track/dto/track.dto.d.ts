import { TrackEntity } from '../entities/track.entity';
interface Track extends TrackEntity {
}
export declare class CreateTrackDto implements Pick<Track, 'name' | 'end_date' | 'start_date'> {
    name: string;
    end_date: Date;
    start_date: Date;
}
declare const UpdateTrackDto_base: import("@nestjs/common").Type<Partial<CreateTrackDto>>;
export declare class UpdateTrackDto extends UpdateTrackDto_base {
}
export {};
