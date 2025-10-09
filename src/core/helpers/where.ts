import { SelectQueryBuilder } from 'typeorm';

export function addInOrEqualsCondition<T>(
  query: SelectQueryBuilder<T>,
  field: string,
  value: (string | number)[],
) {
  const [condition, params] = formInOrEqualsCondition(
    field,
    value,
    field.replace('.', '_') + '_ids',
  );
  if (value.length > 0) {
    query.andWhere(condition, params);
  }
}

export function formInOrEqualsCondition(
  field: string,
  value: (string | number)[],
  idsAlias?: string,
): [string, Record<string, any>] {
  if (!idsAlias) {
    idsAlias = field.replace('.', '_') + '_ids';
  }
  if (value.length > 1) {
    return [`${field} IN (:...${idsAlias})`, { [idsAlias]: value }];
  } else if (value.length === 1) {
    return [`${field} = :${idsAlias}`, { [idsAlias]: value[0] }];
  }
  return ['', {}];
}
