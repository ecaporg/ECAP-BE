import { TrackCalendarEntity } from '../entities/track-calendar.entity';
interface TrackCalendar extends TrackCalendarEntity {
}
export declare class CalendarDayDto {
    day: Date;
    type: string;
}
export declare class CreateTrackCalendarDto implements Pick<TrackCalendar, 'days' | 'id'> {
    days: CalendarDayDto[];
    id: number;
}
declare const UpdateTrackCalendarDto_base: import("@nestjs/common").Type<Partial<CreateTrackCalendarDto>>;
export declare class UpdateTrackCalendarDto extends UpdateTrackCalendarDto_base {
}
export {};
