"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPaginationOptions = extractPaginationOptions;
exports.createSearchCondition = createSearchCondition;
exports.createOrderCondition = createOrderCondition;
const typeorm_1 = require("typeorm");
function extractPaginationOptions(options, searchFields) {
    const { page, limit, sortBy, sortDirection, search, ...filters } = options;
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
    const filtersObject = {};
    for (const [key, value] of Object.entries(filters)) {
        if (key.includes('.')) {
            const parts = key.split('.');
            let current = filtersObject;
            for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];
                if (!current[part]) {
                    current[part] = {};
                }
                current = current[part];
            }
            if (Array.isArray(value)) {
                current[parts[parts.length - 1]] = (0, typeorm_1.In)(value);
            }
            else {
                current[parts[parts.length - 1]] = (0, typeorm_1.Equal)(value);
            }
        }
        else {
            if (Array.isArray(value)) {
                filtersObject[key] = (0, typeorm_1.In)(value);
            }
            else {
                filtersObject[key] = (0, typeorm_1.Equal)(value);
            }
        }
    }
    return {
        page: page,
        limit: limit,
        sortBy: sortByArray,
        sortDirection: sortDirectionArray,
        search: search,
        searchFields: searchFieldsArray,
        filters: filtersObject,
    };
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
        if (field.includes('.')) {
            const parts = field.split('.');
            let current = conditions;
            for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];
                if (!current[part]) {
                    current[part] = {};
                }
                current = current[part];
            }
            current[parts[parts.length - 1]] = sortDirection[index] || 'ASC';
        }
        else {
            conditions[field] = sortDirection[index] || 'ASC';
        }
        return conditions;
    }, {});
}
//# sourceMappingURL=pagination.utils.js.map