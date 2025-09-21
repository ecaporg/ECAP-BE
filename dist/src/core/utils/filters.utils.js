"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterMappingRecord = getFilterMappingRecord;
const constants_1 = require("ecap-lib/dist/constants");
function getFilterMappingRecord(FILTER_KEYS) {
    return Object.fromEntries(Object.entries(FILTER_KEYS)
        .map(([key, value]) => [constants_1.DEFAULT_FILTERS_KEYS[key], value])
        .filter(([key]) => key !== undefined));
}
//# sourceMappingURL=filters.utils.js.map