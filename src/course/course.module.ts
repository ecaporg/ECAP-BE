import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TenantModule } from '@/tenant/tenant.module';
import { TrackModule } from '@/track/track.module';

import { CourseEntity } from './entities/course.entity';
import { CourseService } from './services/course.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity]),
    TenantModule,
    TrackModule,
  ],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
