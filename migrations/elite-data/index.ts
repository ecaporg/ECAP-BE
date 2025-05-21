/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync } = require('fs');

const data = readFileSync('teachers.json', 'utf8');

const teachers = JSON.parse(data);

console.log(new Set(teachers.map((teacher) => teacher.id)), teachers.length);
