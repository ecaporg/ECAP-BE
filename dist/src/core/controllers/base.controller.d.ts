import { BaseService, EntityId, GenericEntity, PaginatedResult, PaginationOptions } from 'src/core';
declare class GenericEntityClass implements GenericEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class TemplateController {
    protected readonly service: BaseService<GenericEntityClass>;
    constructor();
    findAll(options?: PaginationOptions): Promise<PaginatedResult<GenericEntity>>;
    findOne(id: EntityId): Promise<GenericEntity>;
    create(createDto: any): Promise<GenericEntity>;
    patch(id: EntityId, updateDto: any): Promise<GenericEntity>;
    put(id: EntityId, updateDto: any): Promise<GenericEntity>;
    delete(id: EntityId): Promise<void>;
}
export {};
