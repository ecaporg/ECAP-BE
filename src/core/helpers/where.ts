import { SelectQueryBuilder } from 'typeorm';

export function addInOrEqualsCondition<T>(
  query: SelectQueryBuilder<T>,
  field: string,
  value: (string | number)[],
) {
  if (value.length > 1) {
    query.andWhere(`${field} IN (:...ids)`, { ids: value });
  } else if (value.length === 1) {
    query.andWhere(`${field} = :id`, { id: value[0] });
  }
}
