import { BaseService, EntityId, IDGenericEntity, PaginatedResult, PaginationOptions } from '../../core';
declare class GenericEntityClass implements IDGenericEntity {
    id: number;
}
export declare class TemplateController {
    protected readonly service: BaseService<GenericEntityClass>;
    constructor();
    findAll(options?: PaginationOptions): Promise<PaginatedResult<IDGenericEntity>>;
    findOne(id: EntityId): Promise<IDGenericEntity>;
    create(createDto: any): Promise<IDGenericEntity>;
    patch(id: EntityId, updateDto: any): Promise<IDGenericEntity>;
    put(id: EntityId, updateDto: any): Promise<IDGenericEntity>;
    delete(id: EntityId): Promise<void>;
}
export {};
