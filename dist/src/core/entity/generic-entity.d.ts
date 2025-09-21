import { ICanvasGeneric, IDatedGeneric, IGeneric, IIDCanvasGeneric, IIDGeneric, ITenantGeneric } from 'ecap-lib/dist/types';
export { EntityId, EntityKey } from 'ecap-lib/dist/types';
export declare abstract class IDIntGenericEntity implements IIDGeneric {
    id: number;
}
export declare abstract class IDGenericEntity implements IIDGeneric {
    id: number;
}
export declare abstract class DatedGenericEntity implements IDatedGeneric {
    updatedAt: Date;
    createdAt: Date;
}
export declare abstract class GenericEntity extends DatedGenericEntity implements IGeneric {
    id: number;
}
export declare abstract class CanvasGenericEntity extends GenericEntity implements ICanvasGeneric {
    canvas_id?: string;
}
export declare abstract class IDCanvasGenericEntity extends IDGenericEntity implements IIDCanvasGeneric {
    canvas_id?: string;
}
export declare abstract class TenantGenericEntity extends IDGenericEntity implements ITenantGeneric {
    tenant_id: number;
}
