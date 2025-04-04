import { Request } from 'express';

import { PaginationOptions } from '../services/base.service';

/**
 * Extract pagination parameters from request query
 * @param request Express request object
 * @param searchFields Array of fields to search in
 * @returns Pagination options object
 */
export function extractPaginationOptions(
  request: Request,
  searchFields?: string[],
): PaginationOptions {
  const { page, limit, sortBy, sortDirection, search } = request.query;

  // Handle sortBy parameter, which can be a string or an array
  let sortByArray: string[] = [];
  if (sortBy) {
    sortByArray = Array.isArray(sortBy)
      ? sortBy.map((item) => item as string)
      : [sortBy as string];
  }

  // Handle sortDirection parameter, which can be a string or an array
  let sortDirectionArray: ('ASC' | 'DESC')[] = [];
  if (sortDirection) {
    sortDirectionArray = Array.isArray(sortDirection)
      ? sortDirection.map((item) => item as 'ASC' | 'DESC')
      : [sortDirection as 'ASC' | 'DESC'];
  }

  let searchFieldsArray: string[] = [];
  if (searchFields) {
    searchFieldsArray = Array.isArray(searchFields)
      ? searchFields.map((item) => item as string)
      : [searchFields as string];
  }

  return {
    page: page ? parseInt(page as string, 10) : 1,
    limit: limit ? parseInt(limit as string, 10) : 10,
    sortBy: sortByArray,
    sortDirection: sortDirectionArray,
    search: search as string,
    searchFields: searchFieldsArray,
  };
}

/**
 * Create a filter object from request query parameters
 * @param request Express request object
 * @param allowedFilters Array of allowed filter keys
 * @returns Object with filter values
 */
export function extractFilters(
  request: Request,
  allowedFilters: string[],
): Record<string, any> {
  const filters: Record<string, any> = {};

  for (const key of allowedFilters) {
    if (request.query[key] !== undefined) {
      filters[key] = request.query[key];
    }
  }

  return filters;
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
