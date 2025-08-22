export declare enum SortDirectionEnum {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class BaseFilterDto {
    page?: number;
    limit?: number;
    sortBy?: string[];
    sortDirection?: SortDirectionEnum[];
    search?: string;
}
