import { Equal, In } from 'typeorm';

import { BaseFilterDto, SortDirectionEnum } from '../dto/base-filter.dto';
import { PaginationOptions } from '../services/base.service';

type BaseFilterType = BaseFilterDto;

/**
 * Extract pagination parameters from request query
 * @param request Express request object
 * @param searchFields Array of fields to search in
 * @returns Pagination options object
 */
export function extractPaginationOptions<T extends BaseFilterType>(
  options: T,
  searchFields?: string[],
): PaginationOptions<any> {
  const { page, limit, sortBy, sortDirection, search, ...filters } = options;

  let sortByArray: string[] = [];
  if (sortBy) {
    sortByArray = Array.isArray(sortBy)
      ? sortBy.map((item) => item as string)
      : [sortBy as string];
  }

  let sortDirectionArray: SortDirectionEnum[] = [];
  if (sortDirection) {
    sortDirectionArray = Array.isArray(sortDirection)
      ? sortDirection.map((item) => item as SortDirectionEnum)
      : [sortDirection as SortDirectionEnum];
  }

  let searchFieldsArray: string[] = [];
  if (searchFields) {
    searchFieldsArray = Array.isArray(searchFields)
      ? searchFields.map((item) => item as string)
      : [searchFields as string];
  }

  const filtersObject: Record<string, any> = {};

  for (const [key, value] of Object.entries(filters)) {
    if (key.includes('.')) {
      const parts = key.split('.');

      let current = filtersObject;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }

      if (Array.isArray(value)) {
        current[parts[parts.length - 1]] = In(value);
      } else {
        current[parts[parts.length - 1]] = Equal(value);
      }
    } else {
      if (Array.isArray(value)) {
        filtersObject[key] = In(value);
      } else {
        filtersObject[key] = Equal(value);
      }
    }
  }

  return {
    page: page ? page : 1,
    limit: limit,
    sortBy: sortByArray,
    sortDirection: sortDirectionArray,
    search: search as string,
    searchFields: searchFieldsArray,
    filters: filtersObject,
  };
}

/**
 * Create a search condition for multiple fields
 * @param searchTerm Search term
 * @param fields Array of fields to search in
 * @returns Search condition object for TypeORM
 */
export function createSearchCondition(
  searchTerm: string,
  fields: string[],
): Record<string, any> {
  if (!searchTerm || !fields.length) {
    return {};
  }

  return fields.reduce((conditions, field) => {
    conditions[field] = { $like: `%${searchTerm}%` };
    return conditions;
  }, {});
}

/**
 * Create an order condition for multiple fields
 * @param sortBy Array of fields to sort by
 * @param sortDirection Array of sort directions
 * @returns Order condition object for TypeORM
 */
export function createOrderCondition(
  sortBy: string[],
  sortDirection: ('ASC' | 'DESC')[],
): Record<string, any> {
  return sortBy.reduce((conditions, field, index) => {
    if (field.includes('.')) {
      const parts = field.split('.');
      let current = conditions;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
      current[parts[parts.length - 1]] = sortDirection[index] || 'ASC';
    } else {
      conditions[field] = sortDirection[index] || 'ASC';
    }
    return conditions;
  }, {});
}
