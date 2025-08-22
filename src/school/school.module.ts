import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnrollmentModule } from 'src/enrollment/enrollment.module';
import { StaffModule } from 'src/staff/staff.module';
import { StudentsModule } from 'src/students/students.module';
import { TenantModule } from 'src/tenant/tenant.module';
import { TrackModule } from 'src/track/track.module';

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
