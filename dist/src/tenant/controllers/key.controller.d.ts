import { TenantKeyFilterDto } from '../dto/filters.dto';
import { KeyEntity } from '../entities/key.entity';
import { KeyService } from '../services/key.service';
import { TenantService } from '../services/tenant.service';
export declare class KeyController {
    private readonly service;
    private readonly tenantService;
    constructor(service: KeyService, tenantService: TenantService);
    getAccessToken(filter: TenantKeyFilterDto): Promise<KeyEntity>;
    refreshSessionToken(filter: TenantKeyFilterDto, body: {
        session_token: string;
    }): Promise<KeyEntity>;
}
