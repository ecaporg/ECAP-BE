import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ComplianceTasksModule } from './app/compliance-tasks/compliance-tasks.module';
import { DashboardModule } from './app/dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './auth/users.module';
import { CoreModule } from './core/core.module';
import { SchoolModule } from './domain/school/school.module';
import { CanvasEventsModule } from './webhook/canvas-events/canvas-events.module';
import { AppController } from './app.controller';
@Module({
  imports: [
    CoreModule,
    // AuthModule,
    // UsersModule,
    // SchoolModule,
    // ComplianceTasksModule,
    // DashboardModule,
    // CanvasEventsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        url: configService.get('POSTGRES_URL'),
        synchronize: false,
        dropSchema: false,
        ssl: false,
        logging: false,
        logger: 'advanced-console',
        subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],
        autoLoadEntities: true,
        cache: { duration: 60000 },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
