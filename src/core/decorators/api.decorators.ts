import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { ErrorResponseDto } from '../dto/error-response.dto';

/**
 * Interface for API responses options
 */
interface ApiResponseOptions {
  type?: Type<any>;
  isArray?: boolean;
  description?: string;
}

/**
 * Custom decorator for API response with data property wrapper
 */
export const ApiDataResponse = (options: ApiResponseOptions) => {
  const { type, isArray = false, description } = options;

  if (!type) {
    return ApiOkResponse({
      description: description || 'Successful operation',
    });
  }

  return ApiOkResponse({
    description: description || 'Successful operation',
    schema: {
      properties: {
        data: isArray
          ? {
              type: 'array',
              items: { $ref: getSchemaPath(type) },
            }
          : {
              $ref: getSchemaPath(type),
            },
      },
    },
  });
};

/**
 * Custom decorator for API response with pagination
 */
const ApiPaginatedResponse = (type: Type<any>, description?: string) => {
  return ApiOkResponse({
    description: description || 'Successful paginated response',
    schema: {
      properties: {
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(type) },
        },
        meta: {
          type: 'object',
          properties: {
            total: {
              type: 'number',
              example: 100,
            },
            page: {
              type: 'number',
              example: 1,
            },
            limit: {
              type: 'number',
              example: 10,
            },
            pages: {
              type: 'number',
              example: 10,
            },
          },
        },
      },
    },
  });
};

/**
 * Standard swagger response decorator for single item response
 */
export const ApiSingleResponse = (type: Type<any>, description?: string) => {
  return applyDecorators(
    ApiDataResponse({
      type,
      description: description || 'Successful operation',
    }),
    ApiErrorResponses(),
  );
};

/**
 * Standard swagger response decorator for created resource
 */
export const ApiCreatedDataResponse = (
  type: Type<any>,
  description?: string,
) => {
  return applyDecorators(
    ApiCreatedResponse({
      description: description || 'Resource created successfully',
      schema: {
        properties: {
          data: {
            $ref: getSchemaPath(type),
          },
        },
      },
    }),
    ApiErrorResponses(),
  );
};

/**
 * Standard swagger response decorator for array responses
 */
export const ApiArrayResponse = (type: Type<any>, description?: string) => {
  return applyDecorators(
    ApiDataResponse({
      type,
      isArray: true,
      description: description || 'Array of items',
    }),
    ApiErrorResponses(),
  );
};

/**
 * Standard swagger response decorator for paginated responses
 */
export const ApiPaginatedDataResponse = (
  type: Type<any>,
  description?: string,
) => {
  return applyDecorators(
    ApiPaginatedResponse(type, description),
    ApiErrorResponses(),
  );
};

/**
 * Standard swagger response decorator for all standard error responses
 */
export const ApiErrorResponses = () => {
  const errorSchema = {
    $ref: getSchemaPath(ErrorResponseDto),
  };

  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Bad Request - Validation failed',
      schema: errorSchema,
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized - JWT token invalid or expired',
      schema: errorSchema,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden - Not enough permissions',
      schema: errorSchema,
    }),
    ApiNotFoundResponse({
      description: 'Not Found - Resource not found',
      schema: errorSchema,
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal Server Error',
      schema: errorSchema,
    }),
  );
};

/**
 * Combined standard API responses for CRUD operations
 */
export const ApiCrudResponse = <TModel extends Type<any>>(
  model: TModel,
  status: 'ok' | 'created' = 'ok',
) => {
  return status === 'created'
    ? applyDecorators(ApiCreatedDataResponse(model), ApiErrorResponses())
    : applyDecorators(ApiSingleResponse(model), ApiErrorResponses());
};

/**
 * Combined standard API responses for paginated results
 */
export const ApiPaginatedCrudResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(ApiPaginatedDataResponse(model), ApiErrorResponses());
};
