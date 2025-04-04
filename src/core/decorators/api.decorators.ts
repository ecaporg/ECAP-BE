import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

/**
 * Standard swagger response decorator for paginated results
 */
export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              meta: {
                type: 'object',
                properties: {
                  totalItems: {
                    type: 'number',
                    example: 100,
                  },
                  itemCount: {
                    type: 'number',
                    example: 10,
                  },
                  itemsPerPage: {
                    type: 'number',
                    example: 10,
                  },
                  totalPages: {
                    type: 'number',
                    example: 10,
                  },
                  currentPage: {
                    type: 'number',
                    example: 1,
                  },
                },
              },
            },
          },
        ],
      },
    }),
  );
};

/**
 * Standard swagger response decorator for single item
 */
export const ApiResponse = <TModel extends Type<any>>(
  model: TModel,
  status: 'ok' | 'created' = 'ok',
) => {
  const decorators = [
    ApiExtraModels(model),
    status === 'ok'
      ? ApiOkResponse({
          schema: {
            allOf: [
              {
                properties: {
                  data: { $ref: getSchemaPath(model) },
                  meta: {
                    type: 'object',
                    properties: {
                      timestamp: {
                        type: 'string',
                        format: 'date-time',
                      },
                    },
                  },
                },
              },
            ],
          },
        })
      : ApiCreatedResponse({
          schema: {
            allOf: [
              {
                properties: {
                  data: { $ref: getSchemaPath(model) },
                  meta: {
                    type: 'object',
                    properties: {
                      timestamp: {
                        type: 'string',
                        format: 'date-time',
                      },
                    },
                  },
                },
              },
            ],
          },
        }),
  ];

  return applyDecorators(...decorators);
};

/**
 * Standard swagger response decorator for all standard error responses
 */
export const ApiErrorResponses = () => {
  return applyDecorators(
    ApiBadRequestResponse({ description: 'Bad Request - Validation failed' }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized - JWT token invalid or expired',
    }),
    ApiForbiddenResponse({ description: 'Forbidden - Not enough permissions' }),
    ApiNotFoundResponse({ description: 'Not Found - Resource not found' }),
    ApiInternalServerErrorResponse({ description: 'Internal Server Error' }),
  );
};

/**
 * Combined standard API responses for CRUD operations
 */
export const ApiCrudResponse = <TModel extends Type<any>>(
  model: TModel,
  status: 'ok' | 'created' = 'ok',
) => {
  return applyDecorators(ApiResponse(model, status), ApiErrorResponses());
};

/**
 * Combined standard API responses for paginated results
 */
export const ApiPaginatedCrudResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(ApiPaginatedResponse(model), ApiErrorResponses());
};
