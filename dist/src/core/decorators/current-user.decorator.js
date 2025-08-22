"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((propertyPath, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
        return null;
    }
    if (!propertyPath) {
        return user;
    }
    const getNestedProperty = (obj, path) => {
        return path.split('.').reduce((prev, curr) => {
            return prev && prev[curr] !== undefined ? prev[curr] : null;
        }, obj);
    };
    return getNestedProperty(user, propertyPath);
});
//# sourceMappingURL=current-user.decorator.js.map