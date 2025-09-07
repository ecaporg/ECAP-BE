/* eslint-disable @typescript-eslint/ban-types */
import { DEFAULT_FILTERS_KEYS } from '../constants';

interface QueryParamMapping
  extends Partial<Record<keyof typeof DEFAULT_FILTERS_KEYS, string>> {}

export function getFilterMappingRecord<T = QueryParamMapping>(
  FILTER_KEYS: T,
): T {
  return Object.fromEntries(
    Object.entries(FILTER_KEYS)
      .map(([key, value]) => [DEFAULT_FILTERS_KEYS[key], value])
      .filter(([key]) => key !== undefined),
  );
}
