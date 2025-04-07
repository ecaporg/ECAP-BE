import { Type } from '@nestjs/common';
interface ApiResponseOptions {
    type?: Type<any>;
    isArray?: boolean;
    description?: string;
}
export declare const ApiDataResponse: (options: ApiResponseOptions) => MethodDecorator & ClassDecorator;
export declare const ApiSingleResponse: (type: Type<any>, description?: string) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const ApiCreatedDataResponse: (type: Type<any>, description?: string) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const ApiArrayResponse: (type: Type<any>, description?: string) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const ApiPaginatedDataResponse: (type: Type<any>, description?: string) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const ApiErrorResponses: () => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const ApiCrudResponse: <TModel extends Type<any>>(model: TModel, status?: "ok" | "created") => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const ApiPaginatedCrudResponse: <TModel extends Type<any>>(model: TModel) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
