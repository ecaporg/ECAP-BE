/* eslint-disable @typescript-eslint/no-var-requires */

import { Assignment } from './assignments';
import { deleteDublicatesAssignmentsFiltered } from './delete-dublicates';

/* eslint-disable @typescript-eslint/no-unused-vars */
const { readFileSync, writeFileSync } = require('fs');

function getTwoAssigmentPerPeriod() {
  const academicYear = {
    from: 2024,
    to: 2025,
  };

  const learningPeriods = [
    {
      start_date: new Date(academicYear.from, 6, 1),
      end_date: new Date(academicYear.from, 7, 3),
    },
    {
      start_date: new Date(academicYear.from, 7, 5),
      end_date: new Date(academicYear.from, 7, 27),
    },
    {
      start_date: new Date(academicYear.from, 7, 28),
      end_date: new Date(academicYear.from, 9, 4),
    },
    {
      start_date: new Date(academicYear.from, 9, 7),
      end_date: new Date(academicYear.from, 10, 22),
    },
    {
      start_date: new Date(academicYear.from, 11, 2),
      end_date: new Date(academicYear.to, 0, 17),
    },
    {
      start_date: new Date(academicYear.to, 0, 22),
      end_date: new Date(academicYear.to, 1, 14),
    },
    {
      start_date: new Date(academicYear.to, 1, 18),
      end_date: new Date(academicYear.to, 2, 21),
    },
    {
      start_date: new Date(academicYear.to, 2, 24),
      end_date: new Date(academicYear.to, 4, 3),
    },
    {
      start_date: new Date(academicYear.to, 4, 5),
      end_date: new Date(academicYear.to, 5, 10),
    },
  ].reverse();

  const allAssignments = JSON.parse(
    readFileSync('assignments.json', 'utf8'),
  ) as Assignment[];

  const courseMap = new Map<string, Assignment[]>();
  const twoAssignmentsPerPeriodPerCourse = [];

  for (const assignment of allAssignments) {
    if (
      !assignment.course_id ||
      !assignment.due_at ||
      assignment.anonymize_students ||
      assignment.anonymous_submissions ||
      !assignment.published
    ) {
      continue;
    }

    if (courseMap.has(assignment.course_id)) {
      courseMap.get(assignment.course_id).push(assignment);
    } else {
      courseMap.set(assignment.course_id, [assignment]);
    }
  }

  for (const [course_id, course] of courseMap.entries()) {
    // from newest to oldest
    const sortedAssignments = course.sort((a, b) => {
      return new Date(b.due_at).getTime() - new Date(a.due_at).getTime();
    });

    // console.log(
    //   sortedAssignments.map((e) => e.due_at),
    //   learningPeriods.map((p) => p.end_date),
    // );

    for (const period of learningPeriods) {
      const firstAssignment = sortedAssignments.find((assignment) => {
        return new Date(assignment.due_at) <= period.end_date;
      });

      const secondAssignment = sortedAssignments.find((assignment) => {
        return (
          new Date(assignment.due_at) <= period.end_date &&
          assignment.id !== firstAssignment?.id
        );
      });

      if (!firstAssignment || !secondAssignment) {
        console.log(
          'Not found assignments for period:',
          period.end_date,
          'And course_id:',
          course_id,
        );
        continue;
      }

      twoAssignmentsPerPeriodPerCourse.push(firstAssignment, secondAssignment);
    }
  }

  return twoAssignmentsPerPeriodPerCourse.filter(Boolean);
}

const twoAssignmentsPerPeriodPerCourse = getTwoAssigmentPerPeriod();

writeFileSync(
  'assignments-filtered.json',
  JSON.stringify(twoAssignmentsPerPeriodPerCourse, null, 2),
);

deleteDublicatesAssignmentsFiltered();

console.log(
  'Filtered assignments saved to assignments-filtered.json. count:',
  twoAssignmentsPerPeriodPerCourse.length,
);
