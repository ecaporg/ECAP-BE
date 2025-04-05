import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { NotFoundException } from '@/core';

import { GenericEntity } from '../generic-entity';
import {
  createOrderCondition,
  createSearchCondition,
} from '../utils/pagination.utils';

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

export class BaseService<T extends GenericEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(options?: PaginationOptions): Promise<PaginatedResult<T>> {
    const page = options?.page || 1;
    const limit = options?.limit || 15;
    const sortBy = options?.sortBy || ['createdAt'];
    const sortDirection = options?.sortDirection || ['DESC'];
    const search = options?.search || '';
    const searchFields = options?.searchFields || [];

    const query: FindManyOptions<T> = {
      skip: (page - 1) * limit,
      take: limit,
      order: createOrderCondition(sortBy, sortDirection),
    };

    if (search && searchFields.length > 0) {
      const searchConditions: FindOptionsWhere<T> = createSearchCondition(
        search,
        searchFields,
      );

      query.where = searchConditions;
    }

    const [items, totalItems] = await this.repository.findAndCount(query);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });

    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity;
  }

  async findBy(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOneBy(options: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.repository.findOne({ where: options });

    if (!entity) {
      throw new NotFoundException('Entity not found');
    }

    return entity;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    const entity = await this.findOne(id);
    const updated = this.repository.merge(entity, data);
    return this.repository.save(updated);
  }

  async delete(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.repository.count({
      where: { id } as unknown as FindOptionsWhere<T>,
    });
    return count > 0;
  }
}
