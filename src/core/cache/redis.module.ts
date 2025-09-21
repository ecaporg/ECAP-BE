import { redisStore } from 'cache-manager-redis-store';

import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisUrl = configService.get('REDIS_URL');

        try {
          return {
            store: redisStore,
            url: redisUrl,
            ttl: configService.get('REDIS_TTL', 300) * 1000, // 5 хвилин
            retryDelayOnFailover: 100,
            enableReadyCheck: false,
            maxRetriesPerRequest: 2,
          };
        } catch (error) {
          console.warn(
            'Redis connection failed, falling back to in-memory cache:',
            error.message,
          );
          return {
            ttl: configService.get('CACHE_TTL', 300) * 1000, // 5 хвилин
            max: configService.get('CACHE_MAX_ITEMS', 100), // максимум 100 елементів
          };
        }
      },
      inject: [ConfigService],
      isGlobal: true,
    }),
  ],
  exports: [CacheModule],
})
export class RedisModule {}
