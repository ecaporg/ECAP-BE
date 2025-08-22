import { BaseFilterDto } from '../dto/base-filter.dto';
import { PaginationOptions } from '../services/base.service';
type BaseFilterType = BaseFilterDto;
export declare function extractPaginationOptions<T extends BaseFilterType>(options: T, searchFields?: string[]): PaginationOptions<any>;
export declare function createSearchCondition(searchTerm: string, fields: string[]): Record<string, any>;
export declare function createOrderCondition(sortBy: string[], sortDirection: ('ASC' | 'DESC')[]): Record<string, any>;
export {};
