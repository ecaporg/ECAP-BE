/* eslint-disable @typescript-eslint/no-unused-vars */

import { Assignment } from './assignments';
import { Submission } from './submitions';

/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync, writeFileSync } = require('fs');

export const deleteDublicatesAssignmentsFiltered = () => {
  const arrBefore = JSON.parse(
    readFileSync('assignments-filtered.json', 'utf8'),
  );
  const assignmentsMap = new Map<string, Assignment>(
    arrBefore.map((assignment: Assignment) => [
      assignment.id.toString(),
      assignment,
    ]),
  );

  const arrAfter = Array.from(assignmentsMap.values());

  writeFileSync('assignments-filtered.json', JSON.stringify(arrAfter, null, 2));
  console.log(
    'Removed duplicates from assignments-filtered.json. before:',
    arrBefore.length,
    'after:',
    arrAfter.length,
  );
};

export const deleteDublicatesSubmissions = () => {
  const submissionsBefore = JSON.parse(
    readFileSync('submissions.json', 'utf8'),
  ) as Submission[][];

  const submissionsMap = new Map<string, Submission[]>(
    submissionsBefore.map((submissionArray) => [
      JSON.stringify(submissionArray),
      submissionArray,
    ]),
  );

  const submissionsAfter = Array.from(submissionsMap.values());
  writeFileSync('submissions.json', JSON.stringify(submissionsAfter, null, 2));
  console.log(
    'Removed duplicates from submissions.json. before:',
    submissionsBefore.length,
    'after:',
    submissionsAfter.length,
  );
};

// deleteDublicatesAssignmentsFiltered();
// deleteDublicatesSubmissions();

// run npx ts-node delete-dublicates.ts
