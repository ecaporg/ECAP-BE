import { BaseFilterDto } from 'src/core';
declare const FILTER_TRACK_KEYS: {
    TENANT_ID: "tenant_id";
    DIRECTOR_ID: "tenant.directors.id";
    TEACHER_ID: "tenant.schools.teacher_school_year_enrollments.teacher_id";
};
export declare class TrackFilterDto extends BaseFilterDto {
    [FILTER_TRACK_KEYS.TENANT_ID]: number[];
    [FILTER_TRACK_KEYS.DIRECTOR_ID]: number[];
    [FILTER_TRACK_KEYS.TEACHER_ID]: number[];
}
declare const FILTER_TRACK_CALENDAR_KEYS: {
    TENANT_ID: "track.tenant_id";
    DIRECTOR_ID: "track.tenant.directors.id";
    TEACHER_ID: "track.tenant.schools.teacher_school_year_enrollments.teacher_id";
};
export declare class TrackCalendarFilterDto extends BaseFilterDto {
    [FILTER_TRACK_CALENDAR_KEYS.TENANT_ID]: number[];
    [FILTER_TRACK_CALENDAR_KEYS.DIRECTOR_ID]: number[];
    [FILTER_TRACK_CALENDAR_KEYS.TEACHER_ID]: number[];
}
export declare class TrackLearningPeriodFilterDto extends TrackCalendarFilterDto {
}
export declare class TrackSemesterFilterDto extends TrackCalendarFilterDto {
}
export {};
