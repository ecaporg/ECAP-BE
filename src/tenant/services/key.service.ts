import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from 'src/core';

import { KeyEntity } from '../entities/key.entity';
import { TenantEntity } from '../entities/tenant.entity';

@Injectable()
export class KeyService extends BaseService<KeyEntity> {
  constructor(
    @InjectRepository(KeyEntity)
    private keyRepository: Repository<KeyEntity>,
  ) {
    super(keyRepository);
  }

  async refreshSessionToken(tenant: TenantEntity, newSessionToken?: string) {
    if (newSessionToken) {
      tenant.key.session_token = newSessionToken;
      await this.save(tenant.key);
    }
    return tenant.key;
  }
}

