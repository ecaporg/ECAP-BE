import { BaseFilterDto } from 'src/core';
declare const FILTER_SCHOOL_KEYS: {
    TENANT_ID: "tenant_id";
    DIRECTOR_ID: "tenant.directors.id";
    TEACHER_ID: "teacher_school_year_enrollments.teacher_id";
};
export declare class SchoolFilterDto extends BaseFilterDto {
    [FILTER_SCHOOL_KEYS.TENANT_ID]: number[];
    [FILTER_SCHOOL_KEYS.DIRECTOR_ID]: number[];
    [FILTER_SCHOOL_KEYS.TEACHER_ID]: number[];
}
declare const FILTER_ACADEMY_KEYS: {
    TENANT_ID: "tenant_id";
    DIRECTOR_ID: "tenant.directors.id";
    TEACHER_ID: "tenant.schools.teacher_school_year_enrollments.teacher_id";
};
export declare class AcademyFilterDto extends BaseFilterDto {
    [FILTER_ACADEMY_KEYS.TENANT_ID]: number[];
    [FILTER_ACADEMY_KEYS.DIRECTOR_ID]: number[];
    [FILTER_ACADEMY_KEYS.TEACHER_ID]: number[];
}
export {};
