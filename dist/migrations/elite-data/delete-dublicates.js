"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDublicatesSubmissions = exports.deleteDublicatesAssignmentsFiltered = void 0;
const { readFileSync, writeFileSync } = require('fs');
const deleteDublicatesAssignmentsFiltered = () => {
    const arrBefore = JSON.parse(readFileSync('assignments-filtered.json', 'utf8'));
    const assignmentsMap = new Map(arrBefore.map((assignment) => [
        assignment.id.toString(),
        assignment,
    ]));
    const arrAfter = Array.from(assignmentsMap.values());
    writeFileSync('assignments-filtered.json', JSON.stringify(arrAfter, null, 2));
    console.log('Removed duplicates from assignments-filtered.json. before:', arrBefore.length, 'after:', arrAfter.length);
};
exports.deleteDublicatesAssignmentsFiltered = deleteDublicatesAssignmentsFiltered;
const deleteDublicatesSubmissions = () => {
    const submissionsBefore = JSON.parse(readFileSync('submissions.json', 'utf8'));
    const submissionsMap = new Map(submissionsBefore.map((submissionArray) => [
        JSON.stringify(submissionArray),
        submissionArray,
    ]));
    const submissionsAfter = Array.from(submissionsMap.values());
    writeFileSync('submissions.json', JSON.stringify(submissionsAfter, null, 2));
    console.log('Removed duplicates from submissions.json. before:', submissionsBefore.length, 'after:', submissionsAfter.length);
};
exports.deleteDublicatesSubmissions = deleteDublicatesSubmissions;
//# sourceMappingURL=delete-dublicates.js.map