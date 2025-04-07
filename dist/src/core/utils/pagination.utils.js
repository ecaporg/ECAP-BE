"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPaginationOptions = extractPaginationOptions;
exports.extractFilters = extractFilters;
exports.createSearchCondition = createSearchCondition;
exports.createOrderCondition = createOrderCondition;
function extractPaginationOptions(request, searchFields) {
    const { page, limit, sortBy, sortDirection, search } = request.query;
    let sortByArray = [];
    if (sortBy) {
        sortByArray = Array.isArray(sortBy)
            ? sortBy.map((item) => item)
            : [sortBy];
    }
    let sortDirectionArray = [];
    if (sortDirection) {
        sortDirectionArray = Array.isArray(sortDirection)
            ? sortDirection.map((item) => item)
            : [sortDirection];
    }
    let searchFieldsArray = [];
    if (searchFields) {
        searchFieldsArray = Array.isArray(searchFields)
            ? searchFields.map((item) => item)
            : [searchFields];
    }
    return {
        page: page ? parseInt(page, 10) : 1,
        limit: limit ? parseInt(limit, 10) : 10,
        sortBy: sortByArray,
        sortDirection: sortDirectionArray,
        search: search,
        searchFields: searchFieldsArray,
    };
}
function extractFilters(request, allowedFilters) {
    const filters = {};
    for (const key of allowedFilters) {
        if (request.query[key] !== undefined) {
            filters[key] = request.query[key];
        }
    }
    return filters;
}
function createSearchCondition(searchTerm, fields) {
    if (!searchTerm || !fields.length) {
        return {};
    }
    return fields.reduce((conditions, field) => {
        conditions[field] = { $like: `%${searchTerm}%` };
        return conditions;
    }, {});
}
function createOrderCondition(sortBy, sortDirection) {
    return sortBy.reduce((conditions, field, index) => {
        conditions[field] = sortDirection[index] || 'ASC';
        return conditions;
    }, {});
}
//# sourceMappingURL=pagination.utils.js.map