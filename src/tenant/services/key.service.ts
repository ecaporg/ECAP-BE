import { chromium } from 'playwright';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@/core';

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

  async refreshSessionToken(tenant: TenantEntity) {
    if (
      new Date(tenant.key.updatedAt) <
      new Date(Date.now() - 1000 * 60 * 60 * 24)
    ) {
      const endpoint = new URL(`${tenant.key.url}/login/session_token`);
      const headers = {
        Authorization: `Bearer ${tenant.key.access_token}`,
        'sec-ch-ua':
          '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
      };

      const urlResponse = await fetch(endpoint.toString(), {
        headers,
      });

      const urlData = await urlResponse.json();

      const res = await fetch(urlData.session_url, {
        headers,
      });

      const cookies = Array.from(res.headers.entries()).filter(([, value]) =>
        value.includes('_legacy_normandy_session'),
      );

      if (cookies.length > 0) {
        tenant.key.session_token = cookies[0][1].split('; ')[0];
        await this.save(tenant.key);
      }
    }
    return tenant.key;
  }
}
