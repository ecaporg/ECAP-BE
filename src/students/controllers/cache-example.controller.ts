import { Cache } from 'cache-manager';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { StudentService } from '../services/student.service';

@ApiTags('Cache Examples')
@Controller('cache-examples')
export class CacheExampleController {
  constructor(
    private readonly studentService: StudentService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**
   * Автоматичне кешування з використанням вбудованого CacheInterceptor
   * Кеш ключ генерується автоматично на основі URL
   */
  @Get('students/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60) // 60 секунд TTL
  @ApiOperation({ summary: 'Get student with automatic caching' })
  async getStudentCached(@Param('id', ParseIntPipe) id: number) {
    console.log('Fetching student from database...'); // Цей лог з'явиться тільки при cache miss
    return this.studentService.findOne(id);
  }

  /**
   * Кешування з кастомним ключем
   */
  @Get('students/:id/profile')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('student_profile')
  @CacheTTL(120) // 2 хвилини TTL
  @ApiOperation({ summary: 'Get student profile with custom cache key' })
  async getStudentProfile(@Param('id', ParseIntPipe) id: number) {
    console.log('Fetching student profile from database...');
    return {
      student: await this.studentService.findOne(id),
      metadata: {
        cached: true,
        timestamp: new Date(),
      },
    };
  }

  /**
   * Ручне управління кешем
   */
  @Get('students/:id/manual')
  @ApiOperation({ summary: 'Manual cache management example' })
  async getStudentManual(@Param('id', ParseIntPipe) id: number) {
    const cacheKey = `manual_student_${id}`;

    // Спробувати отримати з кешу
    let student = await this.cacheManager.get(cacheKey);

    if (!student) {
      console.log('Cache miss, fetching from database...');
      student = await this.studentService.findOne(id);

      // Зберегти в кеш на 5 хвилин
      await this.cacheManager.set(cacheKey, student, 300000);
    } else {
      console.log('Cache hit!');
    }

    return {
      data: student,
      fromCache: !!student,
    };
  }

  /**
   * Видалення з кешу
   */
  @Get('cache/clear/:key')
  @ApiOperation({ summary: 'Clear specific cache key' })
  async clearCache(@Param('key') key: string) {
    await this.cacheManager.del(key);
    return { message: `Cache key "${key}" cleared` };
  }

  /**
   * Очищення всього кешу (для Redis використовуйте flushAll)
   */
  @Get('cache/clear-all')
  @ApiOperation({ summary: 'Clear all cache' })
  async clearAllCache() {
    // Для Redis потрібно використовувати інший підхід
    try {
      // @ts-ignore - reset може не існувати в деяких store
      await this.cacheManager.store.reset();
      return { message: 'All cache cleared' };
    } catch (error) {
      return { message: 'Cache clear not supported by current store' };
    }
  }

  /**
   * Перевірка існування ключа в кеші
   */
  @Get('cache/exists/:key')
  @ApiOperation({ summary: 'Check if cache key exists' })
  async checkCacheKey(@Param('key') key: string) {
    const value = await this.cacheManager.get(key);
    return {
      key,
      exists: !!value,
      value: value || null,
    };
  }
}
