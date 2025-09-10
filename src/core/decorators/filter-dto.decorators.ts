import { Transform } from 'class-transformer';
import { IsArray, IsOptional, ValidationOptions } from 'class-validator';

import { applyDecorators } from '@nestjs/common';

import { FILTER_SEPARATOR_FOR_MULTIPLE_VALUES } from '../constants';

export function IdDecorator(
  Obj: any = String,
  validationOptions?: ValidationOptions,
) {
  return applyDecorators(
    Transform(({ value }) =>
      typeof value === 'string'
        ? value.split(FILTER_SEPARATOR_FOR_MULTIPLE_VALUES).map(Obj)
        : Array.isArray(value)
          ? value.map(Obj)
          : [Obj(value)],
    ),
    IsArray({
      ...validationOptions,
    }),
    IsOptional(),
  );
}
