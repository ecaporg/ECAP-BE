import { Equal, ILike, In } from 'typeorm';

import { SortDirectionEnum } from '../constants';
import { BaseFilterDto } from '../dto/base-filter.dto';
import { PaginationOptions } from '../interfaces';

type BaseFilterType = BaseFilterDto;

/**
 * Extract pagination parameters from request query
 * @param request Express request object
 * @param searchFields Array of fields to search in
 * @returns Pagination options object
 */
export function extractPaginationOptions<T extends BaseFilterType>(
  options: T,
): PaginationOptions<any> {
  const {
    page,
    limit,
    sortBy,
    sortDirection,
    search,
    searchFields,
    ...filters
  } = options;

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

      assignFilterValue(current, parts[parts.length - 1], value);
    } else {
      assignFilterValue(filtersObject, key, value);
    }
  }

  for (const key of searchFields || []) {
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

      filtersObject[key] = ILike(search);
    } else {
      filtersObject[key] = ILike(search);
    }
  }

  return {
    page: page,
    limit: limit,
    sortBy: sortByArray,
    sortDirection: sortDirectionArray,
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
  sortDirection: SortDirectionEnum[],
  createNested = true,
): Record<string, any> {
  if (createNested) {
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
        current[parts[parts.length - 1]] = sortDirection?.[index] || 'ASC';
      } else {
        conditions[field] = sortDirection?.[index] || 'ASC';
      }
      return conditions;
    }, {});
  } else {
    return sortBy
      .map((field, index) => field + ' ' + (sortDirection?.[index] || 'ASC'))
      .join(', ') as any;
  }
}

/** Get and delete a field from an object
 * @param obj Object to extract the field from
 * @param field Field to extract
 * @returns Value of the extracted field or undefined if not found
 */
export function getAndDeleteField<T, K extends keyof T>(
  obj: T,
  field: K,
): T[K] | undefined {
  if (obj.hasOwnProperty(field)) {
    const value = obj[field];
    delete obj[field];
    return value;
  }
  return undefined;
}

/**
 * Assign a filter value to a filters object
 * @param filtersObject Filters object to assign the value to
 * @param key Key of the filter
 * @param value Value of the filter
 */
export function assignFilterValue(
  filtersObject: Record<string, any>,
  key: string,
  value: any,
) {
  if (Array.isArray(value) && value.length > 0) {
    filtersObject[key] = value.length === 1 ? Equal(value[0]) : In(value);
  } else if (!Array.isArray(value)) {
    filtersObject[key] = Equal(value);
  }
}
