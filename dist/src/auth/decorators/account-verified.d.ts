export type IStrategyType = 'local' | 'jwt' | 'jwt-refresh' | 'jwt-forgot-password' | 'jwt-change-email';
export declare function AccountVerified(strategyType: IStrategyType): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
