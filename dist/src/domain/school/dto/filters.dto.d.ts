import { BaseFilterDto } from '../../../core';
declare const FILTER_SCHOOL_KEYS: {
    ADMIN_ID: "tenant.admins.id";
    DIRECTOR_ID: "tenant.directors.id";
    TEACHER_ID: "tenant.teachers.id";
};
export declare class SchoolFilterDto extends BaseFilterDto {
    [FILTER_SCHOOL_KEYS.ADMIN_ID]: number[];
    [FILTER_SCHOOL_KEYS.DIRECTOR_ID]: number[];
    [FILTER_SCHOOL_KEYS.TEACHER_ID]: number[];
}
declare const FILTER_ACADEMY_KEYS: {
    ADMIN_ID: "tenant.admins.id";
    DIRECTOR_ID: "tenant.directors.id";
    TEACHER_ID: "tenant.teachers.id";
};
export declare class AcademyFilterDto extends BaseFilterDto {
    [FILTER_ACADEMY_KEYS.ADMIN_ID]: number[];
    [FILTER_ACADEMY_KEYS.DIRECTOR_ID]: number[];
    [FILTER_ACADEMY_KEYS.TEACHER_ID]: number[];
}
export {};
