import { Type } from '@nestjs/common';
export declare const ApiPaginatedResponse: (type: Type<any>, description?: string) => MethodDecorator & ClassDecorator;
export declare const ApiSingleResponse: (type: Type<any>, description?: string) => MethodDecorator & ClassDecorator;
export declare const ApiCreatedDataResponse: (type: Type<any>, description?: string) => MethodDecorator & ClassDecorator;
export declare const ApiArrayResponse: (type: Type<any>, description?: string) => MethodDecorator & ClassDecorator;
export declare const ApiErrorResponses: () => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const ApiCrudResponse: <TModel extends Type<any>>(model: TModel, status?: "ok" | "created") => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const ApiPaginatedCrudResponse: <TModel extends Type<any>>(model: TModel) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const ApiPaginationQueries: () => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
