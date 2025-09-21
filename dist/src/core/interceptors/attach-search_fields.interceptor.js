"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachASearchFieldsInterceptor = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const query_param_mapper_interceptor_1 = require("./query-param-mapper.interceptor");
let AttachASearchFieldsInterceptor = class AttachASearchFieldsInterceptor extends query_param_mapper_interceptor_1.QueryParamMapperInterceptor {
    constructor(fields) {
        super({}, {
            searchFields: fields.join(constants_1.FILTER_SEPARATOR_FOR_MULTIPLE_VALUES),
        });
    }
};
exports.AttachASearchFieldsInterceptor = AttachASearchFieldsInterceptor;
exports.AttachASearchFieldsInterceptor = AttachASearchFieldsInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Array])
], AttachASearchFieldsInterceptor);
//# sourceMappingURL=attach-search_fields.interceptor.js.map