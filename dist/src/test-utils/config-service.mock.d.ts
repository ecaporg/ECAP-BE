import { ConfigService } from '@nestjs/config';
export declare const mockConfigService: (values: Record<string, unknown>) => {
    provide: typeof ConfigService;
    useValue: {
        get: jest.Mock<unknown, [key: string, defaultValue: string], any>;
    };
};
