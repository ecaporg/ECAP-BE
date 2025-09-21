import { IIDGeneric } from 'ecap-lib/dist/types';
import { NestedObjectToDotNotation } from '../utils/types';
import { QueryParamMapperInterceptor } from './query-param-mapper.interceptor';
export declare class AttachASearchFieldsInterceptor<T extends IIDGeneric = any> extends QueryParamMapperInterceptor<{
    searchFields: string;
}> {
    constructor(fields: NestedObjectToDotNotation<T>[]);
}
