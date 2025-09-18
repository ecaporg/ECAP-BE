import { DEFAULT_FILTERS_KEYS } from 'ecap-lib/dist/constants';
import { QueryParamMapping } from 'ecap-lib/dist/types';

export function getFilterMappingRecord<T = QueryParamMapping>(
  FILTER_KEYS: T,
): T {
  return Object.fromEntries(
    Object.entries(FILTER_KEYS)
      .map(([key, value]) => [DEFAULT_FILTERS_KEYS[key], value])
      .filter(([key]) => key !== undefined),
  );
}
