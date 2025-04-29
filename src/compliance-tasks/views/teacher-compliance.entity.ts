import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
    SELECT 
      assignment_periods.course_id as course_id,
      teacher.id as teacher_id,
      user.firstname as teacher_firstname,
      user.lastname as teacher_lastname,
      COUNT(DISTINCT assignment_periods.student_id) as student_count,
      COUNT(CASE WHEN samples.status = 'COMPLETED' THEN samples.id END) as completed_count,
      COUNT(CASE WHEN samples.status = 'FLAGGED_TO_ADMIN' THEN samples.id END) as flagged_count,
      COUNT(CASE WHEN samples.status NOT IN ('COMPLETED', 'FLAGGED_TO_ADMIN') THEN samples.id END) as incompleted_count,
      BOOL_AND(samples.status = 'COMPLETED') as is_complated,
      (COUNT(CASE WHEN samples.status = 'COMPLETED' THEN samples.id END)::float / COUNT(assignment_periods.student_id)::float) * 100 as completion_percentage
    FROM assignment_periods
    LEFT JOIN course ON course.id = assignment_periods.course_id
    LEFT JOIN teacher ON teacher.id = course.teacher_id
    LEFT JOIN "user" ON "user".id = teacher.user_id
    LEFT JOIN school ON school.id = course.school_id
    LEFT JOIN academic_year ON academic_year.id = course.academic_year_id
    LEFT JOIN samples ON samples.assignment_period_id = assignment_periods.id
    LEFT JOIN student ON student.id = assignment_periods.student_id
    LEFT JOIN academy ON academy.id = student.academy_id
    GROUP BY assignment_periods.course_id, teacher.id, user.firstname, user.lastname
  `,
})
export class TeacherComplianceView {
  @ViewColumn()
  course_id: number;

  @ViewColumn()
  teacher_id: number;

  @ViewColumn()
  teacher_firstname: string;

  @ViewColumn()
  teacher_lastname: string;

  @ViewColumn()
  student_count: number;

  @ViewColumn()
  completed_count: number;

  @ViewColumn()
  flagged_count: number;

  @ViewColumn()
  incompleted_count: number;

  @ViewColumn()
  is_complated: boolean;

  @ViewColumn()
  completion_percentage: number;
}
