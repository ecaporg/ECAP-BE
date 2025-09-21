import { ValidationOptions } from 'class-validator';
export declare function IdDecorator(Obj?: any, validationOptions?: ValidationOptions): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
