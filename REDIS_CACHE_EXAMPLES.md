# NestJS Redis Caching Examples

## Встановлення залежностей

```bash
yarn add @nestjs/cache-manager cache-manager
yarn add cache-manager-redis-yet redis
```

## Налаштування

### 1. Конфігурація Redis модуля (`src/core/cache/redis.module.ts`)

```typescript
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST', 'localhost'),
        port: configService.get('REDIS_PORT', 6379),
        password: configService.get('REDIS_PASSWORD'),
        db: configService.get('REDIS_DB', 0),
        ttl: configService.get('REDIS_TTL', 300) * 1000, // TTL в мілісекундах
      }),
      inject: [ConfigService],
      isGlobal: true,
    }),
  ],
  exports: [CacheModule],
})
export class RedisModule {}
```

### 2. Змінні середовища (`.env`)

```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
REDIS_TTL=300
```

## Способи використання кешування

### 1. Автоматичне кешування з CacheInterceptor

```typescript
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';

@Controller('api/cache-examples')
export class CacheExampleController {
  @Get('students/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60) // 60 секунд TTL
  async getStudent(@Param('id') id: string) {
    // Цей метод буде автоматично кешований
    // Ключ кешу генерується автоматично на основі URL
    return this.studentService.findOne(id);
  }

  @Get('students/:id/profile')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('student_profile') // Кастомний ключ кешу
  @CacheTTL(120) // 2 хвилини TTL
  async getStudentProfile(@Param('id') id: string) {
    return this.studentService.getProfile(id);
  }
}
```

### 2. Ручне управління кешем

```typescript
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class StudentService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getStudentWithCache(id: number) {
    const cacheKey = `student_${id}`;

    // Спробувати отримати з кешу
    let student = await this.cacheManager.get(cacheKey);

    if (!student) {
      // Cache miss - отримати з бази даних
      student = await this.repository.findOne({ where: { id } });

      // Зберегти в кеш на 5 хвилин (300000 мс)
      await this.cacheManager.set(cacheKey, student, 300000);
    }

    return student;
  }

  async clearStudentCache(id: number) {
    const cacheKey = `student_${id}`;
    await this.cacheManager.del(cacheKey);
  }

  async updateStudent(id: number, data: any) {
    // Оновити в базі даних
    const student = await this.repository.update(id, data);

    // Видалити з кешу, щоб при наступному запиті отримати свіжі дані
    await this.clearStudentCache(id);

    return student;
  }
}
```

### 3. Глобальне кешування на рівні додатка

```typescript
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
```

## Корисні методи Cache Manager

```typescript
// Отримати значення з кешу
const value = await this.cacheManager.get('key');

// Зберегти значення в кеш
await this.cacheManager.set('key', value, ttl);

// Видалити конкретний ключ
await this.cacheManager.del('key');

// Перевірити існування ключа
const exists = (await this.cacheManager.get('key')) !== undefined;

// Очистити весь кеш (для Redis)
await this.cacheManager.store.reset();
```

## Декоратори NestJS для кешування

- `@UseInterceptors(CacheInterceptor)` - автоматичне кешування відповіді
- `@CacheKey('custom_key')` - кастомний ключ кешу
- `@CacheTTL(seconds)` - час життя кешу в секундах

## Переваги стандартного підходу NestJS

1. **Вбудована підтримка** - немає потреби в кастомних рішеннях
2. **Автоматичне кешування** - мінімум коду для базового кешування
3. **Гнучкість** - можливість ручного управління кешем при потребі
4. **Типізація** - повна підтримка TypeScript
5. **Тестування** - легко мокати в тестах

## Тестування контролерів з кешуванням

Доступні ендпойнти для тестування:

- `GET /api/cache-examples/students/:id` - автоматичне кешування
- `GET /api/cache-examples/students/:id/profile` - кастомний ключ кешу
- `GET /api/cache-examples/students/:id/manual` - ручне управління кешем
- `GET /api/cache-examples/cache/clear/:key` - видалення конкретного ключа
- `GET /api/cache-examples/cache/clear-all` - очищення всього кешу
- `GET /api/cache-examples/cache/exists/:key` - перевірка існування ключа
