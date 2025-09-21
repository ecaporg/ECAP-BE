import { BaseFilterDto } from '../../../core';
declare const FILTER_KEYS: {
    ADMIN_ID: "tenant.admins.id";
    DIRECTOR_ID: "tenant.directors.id";
};
export declare class TeachersFilterDto extends BaseFilterDto {
    [FILTER_KEYS.ADMIN_ID]: number[];
    [FILTER_KEYS.DIRECTOR_ID]: number[];
}
export {};
