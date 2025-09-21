"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInOrEqualsCondition = addInOrEqualsCondition;
exports.formInOrEqualsCondition = formInOrEqualsCondition;
function addInOrEqualsCondition(query, field, value) {
    const [condition, params] = formInOrEqualsCondition(field, value, field.replace('.', '_') + '_ids');
    if (value.length > 0) {
        query.andWhere(condition, params);
    }
}
function formInOrEqualsCondition(field, value, idsAlias = 'ids') {
    if (value.length > 1) {
        return [`${field} IN (:...${idsAlias})`, { [idsAlias]: value }];
    }
    else if (value.length === 1) {
        return [`${field} = :${idsAlias}`, { [idsAlias]: value[0] }];
    }
    return ['', {}];
}
//# sourceMappingURL=where.js.map