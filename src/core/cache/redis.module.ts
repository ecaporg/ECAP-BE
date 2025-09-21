// import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';
        const redisUrl = configService.get('REDIS_URL');

        // if (isProduction && redisUrl) {
        //   return {
        //     store: redisStore,
        //     url: redisUrl,
        //     ttl: configService.get('REDIS_TTL', 300) * 1000, // 5 хвилин
        //   };
        // }

        return {
          ttl: configService.get('CACHE_TTL', 300) * 1000, // 5 хвилин
          max: configService.get('CACHE_MAX_ITEMS', 100), // максимум 100 елементів
        };
      },
      inject: [ConfigService],
      isGlobal: true,
    }),
  ],
  exports: [CacheModule],
})
export class RedisModule {}
