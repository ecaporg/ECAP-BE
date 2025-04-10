import { NestFactory } from '@nestjs/core';

import { AcademyService } from './school/services/academy.service';
import { SchoolService } from './school/services/school.service';
import { TenantService } from './school/services/tenant.service';
import { DirectorService } from './staff/services/director.service';
import { StaffService } from './staff/services/staff.service';
import { StudentService } from './students/services/student.service';
import { SubjectService } from './track/services/subject.service';
import { TrackService } from './track/services/track.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  try {
    console.log('===== ПОЧАТОК ТЕСТУВАННЯ СЕРВІСІВ =====');

    // Отримуємо всі необхідні сервіси
    const tenantService = app.get(TenantService);
    const schoolService = app.get(SchoolService);
    const academyService = app.get(AcademyService);
    const trackService = app.get(TrackService);
    const subjectService = app.get(SubjectService);
    const studentService = app.get(StudentService);
    const directorService = app.get(DirectorService);
    const staffService = app.get(StaffService);

    // Перевіряємо наявність тенантів
    console.log('\n----- Тенанти -----');
    const tenantsResult = await tenantService.findAll();
    console.log(`Знайдено ${tenantsResult.meta.totalItems} тенантів`);
    console.table(tenantsResult.items);

    if (tenantsResult.items.length > 0) {
      // Перевіряємо школи
      console.log('\n----- Школи -----');
      const schoolsResult = await schoolService.findAll();
      console.log(`Знайдено ${schoolsResult.meta.totalItems} шкіл`);
      console.table(schoolsResult.items);

      // Перевіряємо академії
      console.log('\n----- Академії -----');
      const academiesResult = await academyService.findAll();
      console.log(`Знайдено ${academiesResult.meta.totalItems} академій`);
      console.table(academiesResult.items);

      // Перевіряємо треки
      console.log('\n----- Треки -----');
      const tracksResult = await trackService.findAll();
      console.log(`Знайдено ${tracksResult.meta.totalItems} треків`);
      console.table(tracksResult.items);

      if (tracksResult.items.length > 0) {
        // Перевіряємо предмети
        console.log('\n----- Предмети -----');
        const subjectsResult = await subjectService.findAll();
        console.log(`Знайдено ${subjectsResult.meta.totalItems} предметів`);
        console.table(subjectsResult.items);
      }

      // Перевіряємо студентів
      console.log('\n----- Студенти -----');
      const studentsResult = await studentService.findAll();
      console.log(`Знайдено ${studentsResult.meta.totalItems} студентів`);
      console.table(studentsResult.items);

      if (schoolsResult.items.length > 0) {
        const firstSchool = schoolsResult.items[0];

        // Перевіряємо директорів
        console.log('\n----- Директори -----');
        const directorsResult = await directorService.findAll();
        console.log(`Знайдено ${directorsResult.meta.totalItems} директорів`);
        console.table(directorsResult.items);

        // Перевіряємо вчителів
        console.log('\n----- Вчителі -----');
        const teachers = await staffService.findTeachersBySchoolId(
          firstSchool.id,
        );
        console.log(
          `Знайдено ${teachers.length} вчителів у школі ${firstSchool.name}`,
        );
        console.table(teachers);
      }
    }

    console.log('\n===== ТЕСТУВАННЯ ЗАВЕРШЕНО =====');
  } catch (error) {
    console.error(`Error: ${error.message}`, error.stack);
  } finally {
    await app.close();
  }
}

bootstrap();
