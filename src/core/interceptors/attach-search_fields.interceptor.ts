import { IIDGeneric } from 'ecap-lib/dist/types';

import { Injectable } from '@nestjs/common';

import { FILTER_SEPARATOR_FOR_MULTIPLE_VALUES } from '../constants';
import { NestedObjectToDotNotation } from '../utils/types';

import { QueryParamMapperInterceptor } from './query-param-mapper.interceptor';

@Injectable()
export class AttachASearchFieldsInterceptor<
  T extends IIDGeneric = any,
> extends QueryParamMapperInterceptor<{
  searchFields: string;
}> {
  constructor(fields: NestedObjectToDotNotation<T>[]) {
    super({} as any, {
      searchFields: fields.join(FILTER_SEPARATOR_FOR_MULTIPLE_VALUES),
    });
  }
}
