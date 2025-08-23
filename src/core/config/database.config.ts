import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const createTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isProduction = configService.get('NODE_ENV') === 'production';
  const isVercel = !!configService.get('VERCEL_ENV');

  console.log('Environment:', { isProduction, isVercel });

  const baseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    url: configService.get('POSTGRES_URL'),
    synchronize: false,
    dropSchema: false,
    logging: configService.get('DB_LOGGING') === 'true',
    logger: 'advanced-console',
    subscribers: [__dirname + '/../../**/*.subscriber{.ts,.js}'],
    autoLoadEntities: true,
    cache: { duration: 60000 },
  };

  // Production/Vercel специфічні налаштування
  if (isProduction || isVercel) {
    return {
      ...baseConfig,
      ssl: { rejectUnauthorized: false },
      keepConnectionAlive: false,
      extra: {
        // Serverless оптимізація
        max: 1, // Один з'єднання на функцію
        min: 0,
        acquire: 30000,
        idle: 10000,
        evict: 1000,
        handleDisconnects: true,
        // Використовуємо connection pooling для Supabase
        application_name: 'ecap-backend-vercel',
        statement_timeout: 30000, // 30s timeout для statements
        query_timeout: 30000, // 30s timeout для queries
        connectionTimeoutMillis: 30000, // 30s для з'єднання
        idleTimeoutMillis: 10000, // 10s idle timeout
      },
    };
  }

  // Development налаштування
  return {
    ...baseConfig,
    ssl: false,
    keepConnectionAlive: true,
    extra: {
      max: 10,
      min: 1,
      acquire: 30000,
      idle: 10000,
    },
  };
};
