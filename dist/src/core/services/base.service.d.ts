import { DeepPartial, FindManyOptions, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { DatedGenericEntity } from '../entity/generic-entity';
export interface PaginationOptions<T = any> {
    page?: number;
    limit?: number;
    sortBy?: string[];
    sortDirection?: ('ASC' | 'DESC')[];
    search?: string;
    searchFields?: string[];
    filters?: FindOptionsWhere<T>;
}
export interface PaginatedResult<T, D = any> {
    items: T[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
        additionalData?: D;
    };
}
export type EntityId = string | number;
export type EntityKey<T> = EntityId | Partial<T>;
export type BaseServiceOptions<T, IDKey> = {
    primaryKeys?: IDKey[];
    defaultRelations?: FindOptionsRelations<T> | string[];
};
export declare class BaseService<T extends DatedGenericEntity, IDKey extends keyof T = any> {
    protected readonly repository: Repository<T>;
    protected readonly primaryKeys: IDKey[];
    protected defaultRelations: FindOptionsRelations<T> | string[];
    constructor(repository: Repository<T>, options?: BaseServiceOptions<T, IDKey>);
    protected createWhereCondition(id: EntityKey<T>): FindOptionsWhere<T>;
    findAll(options?: PaginationOptions<T>, relations?: BaseServiceOptions<T, IDKey>['defaultRelations']): Promise<PaginatedResult<T>>;
    findOne(id: EntityKey<T>, relations?: BaseServiceOptions<T, IDKey>['defaultRelations']): Promise<T>;
    findBy(options: FindManyOptions<T>): Promise<T[]>;
    findOneBy(options: FindOptionsWhere<T>, relations?: BaseServiceOptions<T, IDKey>['defaultRelations']): Promise<T>;
    create(data: DeepPartial<T>): Promise<T>;
    update(id: EntityKey<T>, data: DeepPartial<T>): Promise<T>;
    save(entity: T): Promise<T>;
    delete(id: EntityKey<T>): Promise<void>;
    exists(id: EntityKey<T>): Promise<boolean>;
    count(options?: PaginationOptions<T>): Promise<number>;
    average(...params: Parameters<Repository<T>['average']>): Promise<number>;
    getDefaultQuery(options?: PaginationOptions<T>, relations?: BaseServiceOptions<T, IDKey>['defaultRelations']): FindManyOptions<T>;
}
