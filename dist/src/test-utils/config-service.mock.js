"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockConfigService = void 0;
const config_1 = require("@nestjs/config");
const mockConfigService = (values) => {
    const configService = {
        provide: config_1.ConfigService,
        useValue: {
            get: jest.fn((key, defaultValue) => {
                return values[key] || defaultValue;
            }),
        },
    };
    return configService;
};
exports.mockConfigService = mockConfigService;
//# sourceMappingURL=config-service.mock.js.map