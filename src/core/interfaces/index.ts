import { SortDirectionEnum } from '../constants';

export interface PaginationOptions<T = any> {
  page?: number;
  limit?: number;
  sortBy?: string[];
  sortDirection?: SortDirectionEnum[];
  filters?: T;
}

export interface PaginatedResult<T, D = any> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    additionalData?: D;
  };
}

export type EntityId = string | number;

export type EntityKey<T> = EntityId | Partial<T>;
