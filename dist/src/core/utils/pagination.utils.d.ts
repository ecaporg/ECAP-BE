import { Request } from 'express';
import { PaginationOptions } from '../services/base.service';
export declare function extractPaginationOptions(request: Request, searchFields?: string[]): PaginationOptions;
export declare function extractFilters(request: Request, allowedFilters: string[]): Record<string, any>;
export declare function createSearchCondition(searchTerm: string, fields: string[]): Record<string, any>;
export declare function createOrderCondition(sortBy: string[], sortDirection: ('ASC' | 'DESC')[]): Record<string, any>;
