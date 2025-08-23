import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CanvasEventsModule } from './canvas-events/canvas-events.module';
import { ComplianceTasksModule } from './compliance-tasks/compliance-tasks.module';
import { createTypeOrmConfig } from './core/config/database.config';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SchoolModule } from './school/school.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    CoreModule,
    AuthModule,
    UsersModule,
    SchoolModule,
    ComplianceTasksModule,
    DashboardModule,
    CanvasEventsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: createTypeOrmConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
