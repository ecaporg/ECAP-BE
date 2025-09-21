import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { UsersModule } from '../../auth/users.module';
import { SchoolModule } from '../../domain/school/school.module';

import { CanvasEventController } from './controllers/event.controller';
import { CanvasEventService } from './services/canvas-event.service';
import { CanvasProcessorService } from './services/canvas-processor.service';
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
    CanvasProcessorService,
    CanvasEventService,
  ],
  controllers: [CanvasEventController],
  exports: [
    CanvasResourcesService,
    SisResourcesService,
    CanvasProcessorService,
    CanvasEventService,
  ],
})
export class CanvasEventsModule {}
