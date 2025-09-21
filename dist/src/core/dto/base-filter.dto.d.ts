import { SortDirectionEnum } from '../constants';
export declare class BaseFilterDto {
    page?: number;
    limit?: number;
    sortBy?: string[];
    sortDirection?: SortDirectionEnum[];
    search?: string;
    searchFields?: string[];
}
