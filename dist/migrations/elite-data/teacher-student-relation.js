"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { readFileSync, writeFileSync } = require('fs');
const submissions = JSON.parse(readFileSync('submissions.json', 'utf8'));
const assignmentsMap = new Map(JSON.parse(readFileSync('assignments-filtered.json', 'utf8')).map((assignment) => [assignment.id.toString(), assignment]));
const coursesMap = new Map(JSON.parse(readFileSync('courses.json', 'utf8')).map((course) => [
    course.id.toString(),
    course,
]));
console.log(coursesMap.size, assignmentsMap.size, submissions.length);
const teacherStudentMap = new Map();
for (const submission of submissions) {
    const assignment = assignmentsMap.get(submission[0]?.assignment_id?.toString());
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
//# sourceMappingURL=teacher-student-relation.js.map