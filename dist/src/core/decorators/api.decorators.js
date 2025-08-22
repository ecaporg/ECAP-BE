"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPaginationQueries = exports.ApiPaginatedCrudResponse = exports.ApiCrudResponse = exports.ApiErrorResponses = exports.ApiArrayResponse = exports.ApiCreatedDataResponse = exports.ApiSingleResponse = exports.ApiPaginatedResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const error_response_dto_1 = require("../dto/error-response.dto");
const ApiDataResponse = (options) => {
    const { type, isArray = false, description } = options;
    if (!type) {
        return (0, swagger_1.ApiOkResponse)({
            description: description || 'Successful operation',
        });
    }
    return (0, swagger_1.ApiOkResponse)({
        description: description || 'Successful operation',
        schema: {
            properties: {
                data: isArray
                    ? {
                        type: 'array',
                        items: { $ref: (0, swagger_1.getSchemaPath)(type) },
                    }
                    : {
                        $ref: (0, swagger_1.getSchemaPath)(type),
                    },
            },
        },
    });
};
const ApiPaginatedResponse = (type, description) => {
    return (0, swagger_1.ApiOkResponse)({
        description: description || 'Successful paginated response',
        schema: {
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: (0, swagger_1.getSchemaPath)(type) },
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
exports.ApiPaginatedResponse = ApiPaginatedResponse;
const ApiSingleResponse = (type, description) => {
    return ApiDataResponse({
        type,
        description: description || 'Successful operation',
    });
};
exports.ApiSingleResponse = ApiSingleResponse;
const ApiCreatedDataResponse = (type, description) => {
    return (0, swagger_1.ApiCreatedResponse)({
        description: description || 'Resource created successfully',
        schema: {
            properties: {
                data: {
                    $ref: (0, swagger_1.getSchemaPath)(type),
                },
            },
        },
    });
};
exports.ApiCreatedDataResponse = ApiCreatedDataResponse;
const ApiArrayResponse = (type, description) => {
    return ApiDataResponse({
        type,
        isArray: true,
        description: description || 'Array of items',
    });
};
exports.ApiArrayResponse = ApiArrayResponse;
const ApiErrorResponses = () => {
    const errorSchema = {
        $ref: (0, swagger_1.getSchemaPath)(error_response_dto_1.ErrorResponseDto),
    };
    return (0, common_1.applyDecorators)((0, swagger_1.ApiBadRequestResponse)({
        description: 'Bad Request - Validation failed',
        schema: errorSchema,
    }), (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized - JWT token invalid or expired',
        schema: errorSchema,
    }), (0, swagger_1.ApiForbiddenResponse)({
        description: 'Forbidden - Not enough permissions',
        schema: errorSchema,
    }), (0, swagger_1.ApiNotFoundResponse)({
        description: 'Not Found - Resource not found',
        schema: errorSchema,
    }), (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Internal Server Error',
        schema: errorSchema,
    }));
};
exports.ApiErrorResponses = ApiErrorResponses;
const ApiCrudResponse = (model, status = 'ok') => {
    return status === 'created'
        ? (0, common_1.applyDecorators)((0, exports.ApiCreatedDataResponse)(model), (0, exports.ApiErrorResponses)())
        : (0, common_1.applyDecorators)((0, exports.ApiSingleResponse)(model), (0, exports.ApiErrorResponses)());
};
exports.ApiCrudResponse = ApiCrudResponse;
const ApiPaginatedCrudResponse = (model) => {
    return (0, common_1.applyDecorators)((0, exports.ApiPaginatedResponse)(model), (0, exports.ApiErrorResponses)());
};
exports.ApiPaginatedCrudResponse = ApiPaginatedCrudResponse;
const ApiPaginationQueries = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number',
    }), (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of items per page',
    }), (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        required: false,
        type: [String],
        description: 'Sort by field',
    }), (0, swagger_1.ApiQuery)({
        name: 'sortDirection',
        required: false,
        enum: ['ASC', 'DESC'],
        isArray: true,
        description: 'Sort direction for each sortBy field',
    }), (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        type: String,
        description: 'Search query',
    }));
};
exports.ApiPaginationQueries = ApiPaginationQueries;
//# sourceMappingURL=api.decorators.js.map