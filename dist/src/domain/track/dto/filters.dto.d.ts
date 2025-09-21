import { BaseFilterDto } from '../../../core';
declare const FILTER_TRACK_KEYS: {
    ADMIN_ID: "tenant.admins.id";
    DIRECTOR_ID: "tenant.directors.id";
    TEACHER_ID: "tenant.teachers.id";
};
export declare class TrackFilterDto extends BaseFilterDto {
    [FILTER_TRACK_KEYS.ADMIN_ID]: number[];
    [FILTER_TRACK_KEYS.DIRECTOR_ID]: number[];
    [FILTER_TRACK_KEYS.TEACHER_ID]: number[];
}
declare const FILTER_TRACK_CALENDAR_KEYS: {
    ADMIN_ID: "track.tenant.admins.id";
    DIRECTOR_ID: "track.tenant.directors.id";
    TEACHER_ID: "track.tenant.teachers.id";
};
export declare class TrackCalendarFilterDto extends BaseFilterDto {
    [FILTER_TRACK_CALENDAR_KEYS.ADMIN_ID]: number[];
    [FILTER_TRACK_CALENDAR_KEYS.DIRECTOR_ID]: number[];
    [FILTER_TRACK_CALENDAR_KEYS.TEACHER_ID]: number[];
}
export declare class TrackLearningPeriodFilterDto extends TrackCalendarFilterDto {
}
export declare class TrackSemesterFilterDto extends TrackCalendarFilterDto {
}
export {};
