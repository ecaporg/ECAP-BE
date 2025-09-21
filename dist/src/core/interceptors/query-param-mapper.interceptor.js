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
exports.QueryParamMapperInterceptor = void 0;
const common_1 = require("@nestjs/common");
let QueryParamMapperInterceptor = class QueryParamMapperInterceptor {
    constructor(paramMapping, defaultValues = {}) {
        this.paramMapping = paramMapping;
        this.defaultValues = defaultValues;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const query = request.query;
        Object.entries(this.paramMapping).forEach(([sourceParam, targetParam]) => {
            if (query.hasOwnProperty(sourceParam)) {
                const value = query[sourceParam];
                delete query[sourceParam];
                query[targetParam] = value;
            }
        });
        Object.entries(this.defaultValues).forEach(([param, defaultValue]) => {
            if (!query.hasOwnProperty(param)) {
                query[param] = defaultValue;
            }
        });
        return next.handle();
    }
};
exports.QueryParamMapperInterceptor = QueryParamMapperInterceptor;
exports.QueryParamMapperInterceptor = QueryParamMapperInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, Object])
], QueryParamMapperInterceptor);
//# sourceMappingURL=query-param-mapper.interceptor.js.map