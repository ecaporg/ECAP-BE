"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdDecorator = IdDecorator;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
function IdDecorator(Obj = String, validationOptions) {
    return (0, common_1.applyDecorators)((0, class_transformer_1.Transform)(({ value }) => typeof value === 'string'
        ? value.split(constants_1.FILTER_SEPARATOR_FOR_MULTIPLE_VALUES).map(Obj)
        : Array.isArray(value)
            ? value.map(Obj)
            : [Obj(value)]), (0, class_validator_1.IsArray)({
        ...validationOptions,
    }), (0, class_validator_1.IsOptional)());
}
//# sourceMappingURL=filter-dto.decorators.js.map