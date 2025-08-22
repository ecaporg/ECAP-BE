import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { SchoolModule } from 'src/school/school.module';
import { UsersModule } from 'src/users/users.module';

import { CanvasEventProcessorController } from './controllers/canvas-event-processor.controller';
import { CanvasEventProcessorService } from './services/canvas-event-processor.service';
import { CanvasResourcesService } from './services/canvas-resources.service';
import { SisResourcesService } from './services/sis-resources.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 300000,
    }),
    SchoolModule,
    UsersModule,
  ],
  providers: [
    CanvasResourcesService,
    SisResourcesService,
    CanvasEventProcessorService,
  ],
  controllers: [CanvasEventProcessorController],
  exports: [
    CanvasResourcesService,
    SisResourcesService,
    CanvasEventProcessorService,
  ],
})
export class CanvasEventsModule {}
