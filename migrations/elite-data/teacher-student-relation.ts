/* eslint-disable @typescript-eslint/no-unused-vars */

import { Assignment } from './assignments';
import { Course } from './courses';
import { Submission } from './submitions';

/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync, writeFileSync } = require('fs');

const submissions = JSON.parse(
  readFileSync('submissions.json', 'utf8'),
) as Submission[][];

const assignmentsMap = new Map<string, Assignment>(
  JSON.parse(readFileSync('assignments-filtered.json', 'utf8')).map(
    (assignment: Assignment) => [assignment.id.toString(), assignment],
  ),
);

const coursesMap = new Map<string, Course>(
  JSON.parse(readFileSync('courses.json', 'utf8')).map((course: Course) => [
    course.id.toString(),
    course,
  ]),
);

console.log(coursesMap.size, assignmentsMap.size, submissions.length);

const teacherStudentMap = new Map<string, Set<string>>();

for (const submission of submissions) {
  const assignment = assignmentsMap.get(
    submission[0]?.assignment_id?.toString(),
  );
  const course = coursesMap.get(assignment?.course_id?.toString());
  const teachers = course?.teachers.map((teacher) => teacher.id);

  if (!teachers) {
    continue;
  }

  for (const student of submission.map((s) => s.user_id).filter(Boolean)) {
    if (!teacherStudentMap.has(student.toString())) {
      teacherStudentMap.set(student.toString(), new Set());
    }
    for (const teacher of teachers) {
      teacherStudentMap.get(student.toString())?.add(teacher.toString());
    }
  }
}

const res = {};

for (const [student, teachers] of teacherStudentMap.entries()) {
  res[student] = Array.from(teachers);
}

writeFileSync('teacher-student-relation.json', JSON.stringify(res, null, 2));

// run
// npx ts-node teacher-student-relation.ts
