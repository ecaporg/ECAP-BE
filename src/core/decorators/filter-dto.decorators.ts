import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

import { applyDecorators } from '@nestjs/common';

// Ключ метадати для маппінгу полів
export const OUT_FIELD_KEY = 'out-field';

export function IdDecorator(Obj: any) {
  return applyDecorators(
    Transform(({ value }) =>
      typeof value === 'string'
        ? value.split(',').map(Obj)
        : Array.isArray(value)
          ? value.map(Obj)
          : [Obj(value)],
    ),
    IsArray(),
    IsOptional(),
  );
}

/**
 * Decorator to mark a field for output transformation.
 * Uses NestJS metadata mechanism.
 *
 * @param outputFieldName - Name of the field in the output DTO
 *
 * @example
 * ```typescript
 * class InFilterDto {
 *   @Out('targetField')
 *   @IsString()
 *   sourceField: string;
 * }
 *
 * class OutFilterDto {
 *   targetField: string;
 * }
 * ```
 */
export function Out(outputFieldName: string) {
  return function (target: any, propertyKey: string | symbol) {
    Reflect.defineMetadata(OUT_FIELD_KEY, outputFieldName, target, propertyKey);
  };
}
