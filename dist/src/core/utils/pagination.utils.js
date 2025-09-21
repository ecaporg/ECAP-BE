"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPaginationOptions = extractPaginationOptions;
exports.createSearchCondition = createSearchCondition;
exports.createOrderCondition = createOrderCondition;
exports.getAndDeleteField = getAndDeleteField;
exports.assignFilterValue = assignFilterValue;
const typeorm_1 = require("typeorm");
function extractPaginationOptions(options) {
    const { page, limit, sortBy, sortDirection, search, searchFields, ...filters } = options;
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
            assignFilterValue(current, parts[parts.length - 1], value);
        }
        else {
            assignFilterValue(filtersObject, key, value);
        }
    }
    for (const key of searchFields || []) {
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
            filtersObject[key] = (0, typeorm_1.ILike)(search);
        }
        else {
            filtersObject[key] = (0, typeorm_1.ILike)(search);
        }
    }
    return {
        page: page,
        limit: limit,
        sortBy: sortByArray,
        sortDirection: sortDirectionArray,
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
function createOrderCondition(sortBy, sortDirection, createNested = true) {
    if (createNested) {
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
                current[parts[parts.length - 1]] = sortDirection?.[index] || 'ASC';
            }
            else {
                conditions[field] = sortDirection?.[index] || 'ASC';
            }
            return conditions;
        }, {});
    }
    else {
        return sortBy
            .map((field, index) => field + ' ' + (sortDirection?.[index] || 'ASC'))
            .join(', ');
    }
}
function getAndDeleteField(obj, field) {
    if (obj.hasOwnProperty(field)) {
        const value = obj[field];
        delete obj[field];
        return value;
    }
    return undefined;
}
function assignFilterValue(filtersObject, key, value) {
    if (Array.isArray(value) && value.length > 0) {
        filtersObject[key] = value.length === 1 ? (0, typeorm_1.Equal)(value[0]) : (0, typeorm_1.In)(value);
    }
    else if (!Array.isArray(value)) {
        filtersObject[key] = (0, typeorm_1.Equal)(value);
    }
}
//# sourceMappingURL=pagination.utils.js.map