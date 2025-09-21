import { IIDGeneric } from 'ecap-lib/dist/types';
import { DeepPartial, FindManyOptions, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { EntityKey, PaginatedResult, PaginationOptions, SortDirectionEnum } from '../../core';
export type BaseServiceOptions<T, IDKey> = {
    primaryKeys?: IDKey[];
    defaultRelations?: FindOptionsRelations<T> | string[];
    defaultSortByOptions?: {
        [key: string]: SortDirectionEnum;
    };
};
export declare class BaseService<T extends IIDGeneric<unknown>, IDKey extends keyof T = any> {
    protected readonly repository: Repository<T>;
    protected readonly primaryKeys: IDKey[];
    protected defaultRelations: FindOptionsRelations<T> | string[];
    protected defaultSortByOptions: {
        [key: string]: SortDirectionEnum;
    };
    constructor(repository: Repository<T>, options?: BaseServiceOptions<T, IDKey>);
    protected createWhereCondition(id: EntityKey<T>): FindOptionsWhere<T>;
    findAll(options?: PaginationOptions<T>, relations?: BaseServiceOptions<T, IDKey>['defaultRelations']): Promise<PaginatedResult<T>>;
    findOne(id: EntityKey<T>, relations?: BaseServiceOptions<T, IDKey>['defaultRelations']): Promise<T>;
    findBy(options: FindManyOptions<T>): Promise<T[]>;
    findOneBy(options: FindOptionsWhere<T>, relations?: BaseServiceOptions<T, IDKey>['defaultRelations']): Promise<T>;
    create(data: DeepPartial<T>): Promise<T>;
    bulkCreate(data: DeepPartial<T>[]): Promise<T[]>;
    update(id: EntityKey<T>, data: DeepPartial<T>): Promise<T>;
    save(entity: T): Promise<T>;
    delete(id: EntityKey<T>): Promise<void>;
    deleteBy(where: FindOptionsWhere<T>): Promise<void>;
    exists(id: EntityKey<T>): Promise<boolean>;
    count(options?: PaginationOptions<T>): Promise<number>;
    average(...params: Parameters<Repository<T>['average']>): Promise<number>;
    getDefaultQuery(options?: PaginationOptions<T>, relations?: BaseServiceOptions<T, IDKey>['defaultRelations']): FindManyOptions<T>;
    createBuilderQuery(alias: string): import("typeorm").SelectQueryBuilder<T>;
}
