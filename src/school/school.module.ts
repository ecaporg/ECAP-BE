import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnrollmentModule } from '@/enrollment/enrollment.module';
import { StaffModule } from '@/staff/staff.module';
import { StudentsModule } from '@/students/students.module';
import { TenantModule } from '@/tenant/tenant.module';
import { TrackModule } from '@/track/track.module';

import { AcademyController } from './controllers/academy.controller';
import { SchoolController } from './controllers/school.controller';
import { AcademyEntity } from './entities/academy.entity';
import { SchoolEntity } from './entities/school.entity';
import { AcademyService } from './services/academy.service';
import { SchoolService } from './services/school.service';

@Module({
  controllers: [SchoolController, AcademyController],
  imports: [
    TypeOrmModule.forFeature([SchoolEntity, AcademyEntity]),
    StudentsModule,
    StaffModule,
    TrackModule,
    TenantModule,
    EnrollmentModule,
  ],
  providers: [SchoolService, AcademyService],
  exports: [
    SchoolService,
    AcademyService,
    StudentsModule,
    StaffModule,
    TrackModule,
    TenantModule,
    EnrollmentModule,
  ],
})
export class SchoolModule {}
