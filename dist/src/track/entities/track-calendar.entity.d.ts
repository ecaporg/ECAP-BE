import { DatedGenericEntity } from 'src/core';
import { TrackEntity } from './track.entity';
export interface CalendarDay {
    day: Date;
    type: string;
}
export declare class TrackCalendarEntity extends DatedGenericEntity {
    id: number;
    days: CalendarDay[];
    track: TrackEntity;
}
