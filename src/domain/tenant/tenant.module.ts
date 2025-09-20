import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KeyController } from './controllers/key.controller';
import { KeyEntity } from './entities/key.entity';
import { TenantEntity } from './entities/tenant.entity';
import { KeyService } from './services/key.service';
import { TenantService } from './services/tenant.service';

@Module({
  controllers: [KeyController],
  imports: [TypeOrmModule.forFeature([TenantEntity, KeyEntity])],
  providers: [TenantService, KeyService],
  exports: [TenantService, KeyService],
})
export class TenantModule {}
