export declare abstract class DatedGenericEntity {
    updatedAt: Date;
    createdAt: Date;
}
export declare abstract class GenericEntity extends DatedGenericEntity {
    id: number;
}
