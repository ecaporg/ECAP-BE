"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPaginatedCrudResponse = exports.ApiCrudResponse = exports.ApiErrorResponses = exports.ApiPaginatedDataResponse = exports.ApiArrayResponse = exports.ApiCreatedDataResponse = exports.ApiSingleResponse = exports.ApiDataResponse = void 0;
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
exports.ApiDataResponse = ApiDataResponse;
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
const ApiSingleResponse = (type, description) => {
    return (0, common_1.applyDecorators)((0, exports.ApiDataResponse)({
        type,
        description: description || 'Successful operation',
    }), (0, exports.ApiErrorResponses)());
};
exports.ApiSingleResponse = ApiSingleResponse;
const ApiCreatedDataResponse = (type, description) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiCreatedResponse)({
        description: description || 'Resource created successfully',
        schema: {
            properties: {
                data: {
                    $ref: (0, swagger_1.getSchemaPath)(type),
                },
            },
        },
    }), (0, exports.ApiErrorResponses)());
};
exports.ApiCreatedDataResponse = ApiCreatedDataResponse;
const ApiArrayResponse = (type, description) => {
    return (0, common_1.applyDecorators)((0, exports.ApiDataResponse)({
        type,
        isArray: true,
        description: description || 'Array of items',
    }), (0, exports.ApiErrorResponses)());
};
exports.ApiArrayResponse = ApiArrayResponse;
const ApiPaginatedDataResponse = (type, description) => {
    return (0, common_1.applyDecorators)(ApiPaginatedResponse(type, description), (0, exports.ApiErrorResponses)());
};
exports.ApiPaginatedDataResponse = ApiPaginatedDataResponse;
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
    return (0, common_1.applyDecorators)((0, exports.ApiPaginatedDataResponse)(model), (0, exports.ApiErrorResponses)());
};
exports.ApiPaginatedCrudResponse = ApiPaginatedCrudResponse;
//# sourceMappingURL=api.decorators.js.map