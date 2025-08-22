import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeacherController } from './controllers/teacher.controller';
import {
  AdminEntity,
  DirectorEntity,
  TeacherEntity,
} from './entities/staff.entity';
import {
  AdminService,
  DirectorService,
  TeacherService,
} from './services/staff.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, TeacherEntity, DirectorEntity]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService, AdminService, DirectorService],
  exports: [TeacherService, AdminService, DirectorService],
})
export class StaffModule {}
