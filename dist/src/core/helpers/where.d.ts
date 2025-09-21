import { SelectQueryBuilder } from 'typeorm';
export declare function addInOrEqualsCondition<T>(query: SelectQueryBuilder<T>, field: string, value: (string | number)[]): void;
export declare function formInOrEqualsCondition(field: string, value: (string | number)[], idsAlias?: string): [string, Record<string, any>];
