import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BaseService } from '@/core';

import { TeacherController } from './controllers/teacher.controller';
import { DirectorEntity } from './entities/director.entity';
import { AdminEntity, TeacherEntity } from './entities/staff.entity';
import { DirectorService } from './services/director.service';
import { StaffService } from './services/staff.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, TeacherEntity, DirectorEntity]),
  ],
  controllers: [TeacherController],
  providers: [StaffService, DirectorService],
  exports: [StaffService, DirectorService],
})
export class StaffModule {}
