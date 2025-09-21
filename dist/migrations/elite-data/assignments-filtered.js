"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_dublicates_1 = require("./delete-dublicates");
const { readFileSync, writeFileSync } = require('fs');
const academicYear = {
    from: 2025,
    to: 2026,
};
const learningPeriods_A = [
    {
        name: `LP1`,
        start_date: new Date(academicYear.from, 6, 1),
        end_date: new Date(academicYear.from, 7, 2),
    },
    {
        name: `LP2`,
        start_date: new Date(academicYear.from, 7, 4),
        end_date: new Date(academicYear.from, 7, 26),
    },
    {
        name: `LP3`,
        start_date: new Date(academicYear.from, 7, 27),
        end_date: new Date(academicYear.from, 9, 3),
    },
    {
        name: `LP4`,
        start_date: new Date(academicYear.from, 9, 6),
        end_date: new Date(academicYear.from, 10, 21),
    },
    {
        name: `LP5`,
        start_date: new Date(academicYear.from, 11, 1),
        end_date: new Date(academicYear.to, 0, 16),
    },
    {
        name: `LP6`,
        start_date: new Date(academicYear.to, 0, 21),
        end_date: new Date(academicYear.to, 1, 12),
    },
    {
        name: `LP7`,
        start_date: new Date(academicYear.to, 1, 17),
        end_date: new Date(academicYear.to, 2, 20),
    },
    {
        name: `LP8`,
        start_date: new Date(academicYear.to, 2, 23),
        end_date: new Date(academicYear.to, 4, 2),
    },
    {
        name: `LP9`,
        start_date: new Date(academicYear.to, 4, 4),
        end_date: new Date(academicYear.to, 5, 11),
    },
].reverse();
const learningPeriods_B = [
    {
        name: `LP1`,
        start_date: new Date(academicYear.from, 7, 27),
        end_date: new Date(academicYear.from, 9, 3),
    },
    {
        name: `LP2`,
        start_date: new Date(academicYear.from, 9, 6),
        end_date: new Date(academicYear.from, 10, 21),
    },
    {
        name: `LP3`,
        start_date: new Date(academicYear.from, 11, 1),
        end_date: new Date(academicYear.to, 0, 16),
    },
    {
        name: `LP4`,
        start_date: new Date(academicYear.to, 0, 21),
        end_date: new Date(academicYear.to, 1, 12),
    },
    {
        name: `LP5`,
        start_date: new Date(academicYear.to, 1, 17),
        end_date: new Date(academicYear.to, 2, 20),
    },
    {
        name: `LP6`,
        start_date: new Date(academicYear.to, 2, 23),
        end_date: new Date(academicYear.to, 4, 1),
    },
    {
        name: `LP7`,
        start_date: new Date(academicYear.to, 4, 4),
        end_date: new Date(academicYear.to, 5, 11),
    },
].reverse();
function getTwoAssigmentPerPeriod() {
    const allAssignments = JSON.parse(readFileSync('assignments.json', 'utf8'));
    const assignmentMap = new Map();
    const courseMap = new Map(JSON.parse(readFileSync('courses-filtered.json', 'utf8')).map((c) => [c.id.toString(), c]));
    const twoAssignmentsPerPeriodPerCourse = [];
    for (const assignment of allAssignments) {
        if (!assignment.course_id ||
            !assignment.due_at ||
            !assignment.published ||
            assignment.anonymize_students ||
            assignment.anonymous_submissions ||
            assignment.submission_types.includes('external_tool')) {
            continue;
        }
        if (assignmentMap.has(assignment.course_id)) {
            assignmentMap.get(assignment.course_id).push(assignment);
        }
        else {
            assignmentMap.set(assignment.course_id, [assignment]);
        }
    }
    for (const [course_id, courseAssignments] of assignmentMap.entries()) {
        const sortedAssignments = courseAssignments.sort((a, b) => {
            return new Date(b.due_at).getTime() - new Date(a.due_at).getTime();
        });
        const learningPeriods = courseMap
            .get(course_id)
            ?.name.match(/\b\d*B\b|[\(\[]B[\)\]]/g)
            ? learningPeriods_B
            : learningPeriods_A;
        for (const period of learningPeriods) {
            const firstAssignment = sortedAssignments.find((assignment) => {
                return new Date(assignment.due_at) <= period.end_date;
            });
            const secondAssignment = sortedAssignments.find((assignment) => {
                return (new Date(assignment.due_at) <= period.end_date &&
                    assignment.id !== firstAssignment?.id);
            });
            if (!firstAssignment || !secondAssignment) {
                console.log('Not found assignments for period:', period.end_date, 'And course_id:', course_id);
                continue;
            }
            firstAssignment['learning_period'] = period;
            secondAssignment['learning_period'] = period;
            twoAssignmentsPerPeriodPerCourse.push(firstAssignment, secondAssignment);
        }
    }
    return twoAssignmentsPerPeriodPerCourse.filter(Boolean);
}
const twoAssignmentsPerPeriodPerCourse = getTwoAssigmentPerPeriod();
writeFileSync('assignments-filtered.json', JSON.stringify(twoAssignmentsPerPeriodPerCourse, null, 2));
(0, delete_dublicates_1.deleteDublicatesAssignmentsFiltered)();
console.log('Filtered assignments saved to assignments-filtered.json. count:', twoAssignmentsPerPeriodPerCourse.length);
//# sourceMappingURL=assignments-filtered.js.map