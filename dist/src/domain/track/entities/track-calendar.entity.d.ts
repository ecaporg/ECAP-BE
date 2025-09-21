import { ITrackCalendar } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { IDGenericEntity } from '../../../core';
import { TrackEntity } from './track.entity';
export interface CalendarDay {
    day: Date;
    type: string;
}
export declare class TrackCalendarEntity extends IDGenericEntity implements ITrackCalendar {
    id: number;
    days: CalendarDay[];
    track: Relation<TrackEntity>;
}
