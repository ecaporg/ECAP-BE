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

  private async launchBrowser() {
    // Lazy loading puppeteer тільки коли потрібно
    const puppeteer = await import('puppeteer-core');

    if (process.env.NODE_ENV === 'production') {
      const chromiumModule = await import('@sparticuz/chromium');
      const chromium = chromiumModule.default || chromiumModule;

      return puppeteer.default.launch({
        args: [
          ...(chromium.args || []),
          '--hide-scrollbars',
          '--disable-web-security',
          '--disable-extensions',
          '--disable-plugins',
          '--disable-images',
          '--disable-javascript',
          '--no-first-run',
          '--disable-default-apps',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
          '--memory-pressure-off',
        ],
        defaultViewport: chromium.defaultViewport || null,
        executablePath: await (chromium.executablePath
          ? chromium.executablePath()
          : '/usr/bin/chromium-browser'),
        headless: chromium.headless !== false,
      });
    } else {
      return puppeteer.default.launch({
        args: ['--start-maximized'],
        defaultViewport: null,
        headless: false,
      });
    }
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

      const browser = await this.launchBrowser();

      try {
        const page = await browser.newPage();

        await page.setExtraHTTPHeaders(headers);

        await page.goto(urlData.session_url, {
          waitUntil: 'networkidle2',
        });

        await new Promise((resolve) => setTimeout(resolve, 3000));

        const cookies = await page.cookies();

        const legacyNormandySessionCookie = cookies.find(
          (cookie) => cookie.name === '_legacy_normandy_session',
        );

        if (legacyNormandySessionCookie) {
          tenant.key.session_token = legacyNormandySessionCookie.value;
          await this.save(tenant.key);
        } else {
          throw new Error('Cookie _legacy_normandy_session not found');
        }
      } finally {
        await browser.close();
      }
    }
    return tenant.key;
  }
}
