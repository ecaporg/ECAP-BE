"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const core_1 = require("../../core");
const pagination_utils_1 = require("../utils/pagination.utils");
class BaseService {
    constructor(repository, options = {}) {
        this.repository = repository;
        this.primaryKeys = options.primaryKeys || ['id'];
        this.defaultRelations = options.defaultRelations || [];
        this.defaultSortByOptions = options.defaultSortByOptions || {
            id: core_1.SortDirectionEnum.ASC,
        };
    }
    createWhereCondition(id) {
        const where = {};
        if (this.primaryKeys.length === 1 &&
            (typeof id === 'string' || typeof id === 'number')) {
            where[this.primaryKeys[0]] = id;
            return where;
        }
        if (typeof id !== 'object' || id === null) {
            throw new Error(`Expected object with keys: ${this.primaryKeys.join(', ')}`);
        }
        for (const key of this.primaryKeys) {
            if (!(key in id)) {
                throw new Error(`Missing key part: ${String(key)}`);
            }
            where[key] = id[key];
        }
        return where;
    }
    async findAll(options, relations) {
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
    async findOne(id, relations) {
        const where = this.createWhereCondition(id);
        const entity = await this.repository.findOne({
            relations: relations || this.defaultRelations,
            where,
        });
        if (!entity) {
            throw new core_1.NotFoundException(`Entity with ${String(this.primaryKeys)} ${id} not found`);
        }
        return entity;
    }
    async findBy(options) {
        return this.repository.find({
            relations: this.defaultRelations,
            ...options,
        });
    }
    async findOneBy(options, relations) {
        const entity = await this.repository.findOne({
            relations: relations || this.defaultRelations,
            where: options,
        });
        if (!entity) {
            throw new core_1.NotFoundException('Entity not found');
        }
        return entity;
    }
    async create(data) {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }
    async bulkCreate(data) {
        const entities = this.repository.create(data);
        return this.repository.save(entities);
    }
    async update(id, data) {
        const entity = await this.findOne(id);
        const updated = this.repository.merge(entity, data);
        return this.repository.save(updated);
    }
    async save(entity) {
        return this.repository.save(entity);
    }
    async delete(id) {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
    async deleteBy(where) {
        const entities = await this.repository.find({ where });
        await this.repository.remove(entities);
    }
    async exists(id) {
        const where = this.createWhereCondition(id);
        const count = await this.repository.count({ where });
        return count > 0;
    }
    async count(options) {
        const filters = options?.filters || {};
        return this.repository.count({ where: filters });
    }
    async average(...params) {
        return this.repository.average(...params);
    }
    getDefaultQuery(options, relations) {
        const page = options?.page || 1;
        const limit = options?.limit || 15;
        const sortBy = options?.sortBy || Object.keys(this.defaultSortByOptions);
        const sortDirection = options?.sortDirection || Object.values(this.defaultSortByOptions);
        const filters = options?.filters || {};
        const query = {
            skip: (page - 1) * limit,
            take: limit,
            order: (0, pagination_utils_1.createOrderCondition)(sortBy, sortDirection),
            relations: relations || this.defaultRelations,
            where: filters,
        };
        return query;
    }
    createBuilderQuery(alias) {
        return this.repository.createQueryBuilder(alias);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map