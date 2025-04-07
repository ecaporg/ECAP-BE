"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const core_1 = require("..");
const pagination_utils_1 = require("../utils/pagination.utils");
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll(options) {
        const page = options?.page || 1;
        const limit = options?.limit || 15;
        const sortBy = options?.sortBy || ['createdAt'];
        const sortDirection = options?.sortDirection || ['DESC'];
        const search = options?.search || '';
        const searchFields = options?.searchFields || [];
        const query = {
            skip: (page - 1) * limit,
            take: limit,
            order: (0, pagination_utils_1.createOrderCondition)(sortBy, sortDirection),
        };
        if (search && searchFields.length > 0) {
            const searchConditions = (0, pagination_utils_1.createSearchCondition)(search, searchFields);
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
    async findOne(id) {
        const entity = await this.repository.findOne({
            where: { id },
        });
        if (!entity) {
            throw new core_1.NotFoundException(`Entity with id ${id} not found`);
        }
        return entity;
    }
    async findBy(options) {
        return this.repository.find(options);
    }
    async findOneBy(options) {
        const entity = await this.repository.findOne({ where: options });
        if (!entity) {
            throw new core_1.NotFoundException('Entity not found');
        }
        return entity;
    }
    async create(data) {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }
    async update(id, data) {
        const entity = await this.findOne(id);
        const updated = this.repository.merge(entity, data);
        return this.repository.save(updated);
    }
    async delete(id) {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
    async exists(id) {
        const count = await this.repository.count({
            where: { id },
        });
        return count > 0;
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map