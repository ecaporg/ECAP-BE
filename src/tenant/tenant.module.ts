import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KeyController } from './controllers/key.controller';
import { ErrorEntity } from './entities/error.entity';
import { KeyEntity } from './entities/key.entity';
import { TenantEntity } from './entities/tenant.entity';
import { ErrorService } from './services/error.service';
import { KeyService } from './services/key.service';
import { TenantService } from './services/tenant.service';

@Module({
  controllers: [KeyController],
  imports: [TypeOrmModule.forFeature([TenantEntity, KeyEntity, ErrorEntity])],
  providers: [TenantService, KeyService, ErrorService],
  exports: [TenantService, KeyService, ErrorService],
})
export class TenantModule {}
