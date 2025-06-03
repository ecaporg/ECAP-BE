import {
  DeepPartial,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { NotFoundException } from '@/core';

import { DatedGenericEntity } from '../entity/generic-entity';
import {
  createOrderCondition,
  createSearchCondition,
} from '../utils/pagination.utils';

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

export class BaseService<
  T extends DatedGenericEntity,
  IDKey extends keyof T = any,
> {
  protected readonly primaryKeys: IDKey[];
  protected defaultRelations: FindOptionsRelations<T> | string[];

  constructor(
    protected readonly repository: Repository<T>,
    options: BaseServiceOptions<T, IDKey> = {},
  ) {
    this.primaryKeys = Array.isArray(options.primaryKeys)
      ? options.primaryKeys
      : ['id' as IDKey];

    this.defaultRelations = options.defaultRelations || [];
  }

  protected createWhereCondition(id: EntityKey<T>): FindOptionsWhere<T> {
    const where = {} as FindOptionsWhere<T>;

    if (
      this.primaryKeys.length === 1 &&
      (typeof id === 'string' || typeof id === 'number')
    ) {
      where[this.primaryKeys[0] as any] = id;
      return where;
    }

    if (typeof id !== 'object' || id === null) {
      throw new Error(
        `Expected object with keys: ${this.primaryKeys.join(', ')}`,
      );
    }

    for (const key of this.primaryKeys) {
      if (!(key in id)) {
        throw new Error(`Missing key part: ${String(key)}`);
      }
      where[key as any] = (id as any)[key];
    }

    return where;
  }

  async findAll(
    options?: PaginationOptions<T>,
    relations?: BaseServiceOptions<T, IDKey>['defaultRelations'],
  ): Promise<PaginatedResult<T>> {
    const query = this.getDefaultQuery(options, relations);

    const [items, totalItems] = await this.repository.findAndCount(query);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: query.take,
        totalPages: Math.ceil(totalItems / query.take),
        currentPage: options?.page || 1,
      },
    };
  }

  async findOne(
    id: EntityKey<T>,
    relations?: BaseServiceOptions<T, IDKey>['defaultRelations'],
  ): Promise<T> {
    const where = this.createWhereCondition(id);
    const entity = await this.repository.findOne({
      relations: relations || this.defaultRelations,
      where,
    });

    if (!entity) {
      throw new NotFoundException(
        `Entity with ${String(this.primaryKeys)} ${id} not found`,
      );
    }

    return entity;
  }

  async findBy(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find({
      relations: this.defaultRelations,
      ...options,
    });
  }

  async findOneBy(
    options: FindOptionsWhere<T>,
    relations?: BaseServiceOptions<T, IDKey>['defaultRelations'],
  ): Promise<T> {
    const entity = await this.repository.findOne({
      relations: relations || this.defaultRelations,
      where: options,
    });

    if (!entity) {
      throw new NotFoundException('Entity not found');
    }

    return entity;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: EntityKey<T>, data: DeepPartial<T>): Promise<T> {
    const entity = await this.findOne(id);
    const updated = this.repository.merge(entity, data);
    return this.repository.save(updated);
  }

  async save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  async delete(id: EntityKey<T>): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }

  async exists(id: EntityKey<T>): Promise<boolean> {
    const where = this.createWhereCondition(id);
    const count = await this.repository.count({ where });
    return count > 0;
  }

  async count(options?: PaginationOptions<T>): Promise<number> {
    const filters = options?.filters || {};
    return this.repository.count({ where: filters });
  }

  async average(
    ...params: Parameters<Repository<T>['average']>
  ): Promise<number> {
    return this.repository.average(...params);
  }

  getDefaultQuery(
    options?: PaginationOptions<T>,
    relations?: BaseServiceOptions<T, IDKey>['defaultRelations'],
  ): FindManyOptions<T> {
    const page = options?.page || 1;
    const limit = options?.limit || 12;
    const sortBy = options?.sortBy || ['createdAt'];
    const sortDirection = options?.sortDirection || ['DESC'];
    const search = options?.search || '';
    const searchFields = options?.searchFields || [];
    const filters = options?.filters || {};

    const query: FindManyOptions<T> = {
      skip: (page - 1) * limit,
      take: limit,
      order: createOrderCondition(sortBy, sortDirection),
      relations: relations || this.defaultRelations,
      where: filters,
    };

    if (search && searchFields.length > 0) {
      const searchConditions: FindOptionsWhere<T> = createSearchCondition(
        search,
        searchFields,
      );

      query.where = {
        ...query.where,
        ...searchConditions,
      };
    }

    return query;
  }
}
