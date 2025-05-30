import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { TenantService } from '@/tenant/services/tenant.service';

import { CanvasEventProcessorController } from './controllers/canvas-event-processor.controller';
import { CanvasEventProcessorService } from './services/canvas-event-processor.service';
import { CanvasResourcesService } from './services/canvas-resources.service';
import { SisResourcesService } from './services/sis-resources.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 300000,
    }),
  ],
  providers: [
    CanvasResourcesService,
    SisResourcesService,
    CanvasEventProcessorService,
    TenantService,
  ],
  controllers: [CanvasEventProcessorController],
  exports: [
    CanvasResourcesService,
    SisResourcesService,
    CanvasEventProcessorService,
  ],
})
export class CanvasEventsModule {}
