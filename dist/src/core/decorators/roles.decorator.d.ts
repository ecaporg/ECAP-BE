import { RolesEnum } from '../../users/enums/roles.enum';
export declare function Roles(...roles: RolesEnum[]): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
