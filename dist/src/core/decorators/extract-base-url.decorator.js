"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractBaseUrl = void 0;
const common_1 = require("@nestjs/common");
exports.ExtractBaseUrl = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const protocol = request.protocol;
    const host = request.get('host');
    return `${protocol}://${host}`;
});
//# sourceMappingURL=extract-base-url.decorator.js.map