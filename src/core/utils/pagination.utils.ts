import { BaseFilterDto, SortDirectionEnum } from '../dto/base-filter.dto';
import { PaginationOptions } from '../services/base.service';

/**
 * Extract pagination parameters from request query
 * @param request Express request object
 * @param searchFields Array of fields to search in
 * @returns Pagination options object
 */
export function extractPaginationOptions<T extends BaseFilterDto>(
  options: T,
  searchFields?: string[],
): PaginationOptions {
  const { page, limit, sortBy, sortDirection, search, ...filters } = options;

  console.log(options, filters);

  // Handle sortBy parameter, which can be a string or an array
  let sortByArray: string[] = [];
  if (sortBy) {
    sortByArray = Array.isArray(sortBy)
      ? sortBy.map((item) => item as string)
      : [sortBy as string];
  }

  // Handle sortDirection parameter, which can be a string or an array
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

  const filtersObject = Object.fromEntries(
    Object.entries(filters).map(([key, value]) => [key, value as string]),
  );

  return {
    page: page ? page : 1,
    limit: limit ? limit : 15,
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
    conditions[field] = sortDirection[index] || 'ASC';
    return conditions;
  }, {});
}
