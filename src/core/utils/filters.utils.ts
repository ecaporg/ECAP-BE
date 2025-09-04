import { DEFAULT_FILTERS_KEYS } from '../constants';

export function getFilterMappingRecord(
  FILTER_KEYS: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(FILTER_KEYS)
      .map(([key, value]) => [DEFAULT_FILTERS_KEYS[key], value])
      .filter(([key]) => key !== undefined),
  );
}
