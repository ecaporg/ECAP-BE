import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { CanvasEventsModule } from '@/canvas-events/canvas-events.module';
import { ComplianceTasksModule } from '@/compliance-tasks/compliance-tasks.module';
import { CoreModule } from '@/core/core.module';
import { DashboardModule } from '@/dashboard/dashboard.module';
import { SchoolModule } from '@/school/school.module';
import { UsersModule } from '@/users/users.module';
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
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        url: configService.get('POSTGRES_URL'),
        synchronize: false,
        dropSchema: false,
        ssl: true,
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
  providers: [AppService],
})
export class AppModule {}
