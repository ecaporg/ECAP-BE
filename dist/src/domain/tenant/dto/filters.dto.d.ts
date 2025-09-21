import { BaseFilterDto } from '../../../core';
declare const FILTER_KEYS: {
    ADMIN_ID: "admins.id";
    DIRECTOR_ID: "directors.id";
    TEACHER_ID: "teachers.id";
};
export declare class TenantKeyFilterDto extends BaseFilterDto {
    [FILTER_KEYS.ADMIN_ID]: number[];
    [FILTER_KEYS.DIRECTOR_ID]: number[];
    [FILTER_KEYS.TEACHER_ID]: number[];
}
export {};
