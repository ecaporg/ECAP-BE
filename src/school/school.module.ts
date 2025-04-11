import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StaffModule } from '@/staff/staff.module';
import { StudentsModule } from '@/students/students.module';
import { TrackModule } from '@/track/track.module';

import { FilterController } from './controllers/test.controller';
import { AcademyEntity } from './entities/academy.entity';
import { SchoolEntity } from './entities/school.entity';
import { SemesterEntity } from './entities/semester.entity';
import { TenantEntity } from './entities/tenant.entity';
import { AcademyService } from './services/academy.service';
import { SchoolService } from './services/school.service';
import { SemesterService } from './services/semester.service';
import { TenantService } from './services/tenant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SchoolEntity,
      SemesterEntity,
      TenantEntity,
      AcademyEntity,
    ]),
    StudentsModule,
    StaffModule,
    TrackModule,
  ],
  controllers: [FilterController],
  providers: [SchoolService, SemesterService, TenantService, AcademyService],
  exports: [
    SchoolService,
    SemesterService,
    TenantService,
    AcademyService,
    StudentsModule,
    StaffModule,
    TrackModule,
  ],
})
export class SchoolModule {}
