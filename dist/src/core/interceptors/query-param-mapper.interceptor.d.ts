import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
interface QueryParamMapping {
    [sourceParam: string]: string;
}
export declare class QueryParamMapperInterceptor<T extends QueryParamMapping> implements NestInterceptor<T, any> {
    private paramMapping;
    private defaultValues;
    constructor(paramMapping: T, defaultValues?: T);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
export {};
