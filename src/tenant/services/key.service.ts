import puppeteer from 'puppeteer';
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
    const isProduction = true;

    const launchOptions = {
      args: [
        '--start-maximized',
        ...(isProduction
          ? [
              '--no-sandbox',
              '--disable-setuid-sandbox',
              '--disable-dev-shm-usage',
              '--disable-accelerated-2d-canvas',
              '--no-first-run',
              '--no-zygote',
              '--disable-gpu',
              '--single-process',
              '--disable-background-timer-throttling',
              '--disable-backgrounding-occluded-windows',
              '--disable-renderer-backgrounding',
              '--disable-features=TranslateUI',
              '--disable-ipc-flooding-protection',
              '--disable-web-security',
              '--disable-features=VizDisplayCompositor',
            ]
          : []),
      ],
      defaultViewport: null,
      headless: isProduction ? true : false,
      // Render-specific settings
      protocolTimeout: 120000, // 2 minutes
      // Force Chrome path for Render
      ...(process.env.RENDER && {
        executablePath: '/usr/bin/google-chrome-stable',
      }),
    };

    try {
      return await puppeteer.launch(launchOptions);
    } catch (error) {
      console.error(
        'Failed to launch browser with default config:',
        error.message,
      );

      // Try with explicit executable path for common deployment environments
      const possiblePaths = [
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/google-chrome',
      ];

      for (const executablePath of possiblePaths) {
        try {
          return await puppeteer.launch({
            ...launchOptions,
            executablePath,
          });
        } catch (pathError) {
          console.warn(
            `Failed to launch with ${executablePath}:`,
            pathError.message,
          );
        }
      }

      // If all paths fail, throw the original error
      throw new Error(
        `Failed to launch browser. Original error: ${error.message}. Please ensure Chrome is installed by running: npx puppeteer browsers install chrome`,
      );
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

      // Wrap the entire browser operation with a timeout
      const browserOperation = async () => {
        const browser = await this.launchBrowser();
        let page;

        try {
          page = await browser.newPage();

          page.setDefaultNavigationTimeout(60000);
          page.setDefaultTimeout(60000);

          await page.setExtraHTTPHeaders(headers);

          let navigationSuccess = false;
          const maxRetries = 3;

          for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
              console.log(
                `Navigation attempt ${attempt}/${maxRetries} to: ${urlData.session_url}`,
              );

              let waitUntil;
              let timeout;

              if (attempt === 1) {
                waitUntil = 'load';
                timeout = 120000;
              } else if (attempt === 2) {
                waitUntil = 'domcontentloaded';
                timeout = 90000;
              } else {
                waitUntil = 'networkidle2';
                timeout = 60000;
              }

              await page.goto(urlData.session_url, {
                waitUntil,
                timeout,
              });

              navigationSuccess = true;
              break;
            } catch (navError) {
              console.warn(
                `Navigation attempt ${attempt} failed:`,
                navError.message,
              );

              if (attempt < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }
            }
          }

          // If all navigation attempts failed, try one final approach with no wait conditions
          if (!navigationSuccess) {
            try {
              console.log('Trying final navigation with minimal conditions');
              await page.goto(urlData.session_url, {
                timeout: 60000,
              });

              // Wait for basic page elements to load
              await page
                .waitForFunction(
                  () =>
                    document.readyState === 'complete' ||
                    document.readyState === 'interactive',
                  { timeout: 5000 },
                )
                .catch(() => {}); // Ignore timeout here

              navigationSuccess = true;
            } catch (finalError) {
              throw new Error(
                `All navigation attempts failed. Last error: ${finalError.message}`,
              );
            }
          }

          if (navigationSuccess) {
            await new Promise((resolve) => setTimeout(resolve, 1000));

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
          }
        } finally {
          if (page) {
            await page.close().catch(console.error);
          }
          await browser.close().catch(console.error);
        }
      };

      // Set a global timeout for the entire operation (5 minutes)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => {
            reject(new Error('Browser operation timed out after 5 minutes'));
          },
          5 * 60 * 1000,
        );
      });

      try {
        await Promise.race([browserOperation(), timeoutPromise]);
      } catch (error) {
        console.error('Browser operation failed:', error.message);
        throw error;
      }
    }
    return tenant.key;
  }
}
