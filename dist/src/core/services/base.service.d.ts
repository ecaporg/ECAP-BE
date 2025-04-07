import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { GenericEntity } from '../generic-entity';
export interface PaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string[];
    sortDirection?: ('ASC' | 'DESC')[];
    search?: string;
    searchFields?: string[];
}
export interface PaginatedResult<T> {
    items: T[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}
export declare class BaseService<T extends GenericEntity> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>);
    findAll(options?: PaginationOptions): Promise<PaginatedResult<T>>;
    findOne(id: number): Promise<T>;
    findBy(options: FindManyOptions<T>): Promise<T[]>;
    findOneBy(options: FindOptionsWhere<T>): Promise<T>;
    create(data: DeepPartial<T>): Promise<T>;
    update(id: number, data: DeepPartial<T>): Promise<T>;
    delete(id: number): Promise<void>;
    exists(id: number): Promise<boolean>;
}
