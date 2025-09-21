"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { readFileSync, writeFileSync, existsSync } = require('fs');
const INPUT_FILE = 'courses.json';
const OUTPUT_FILE = 'courses-filtered.json';
function filterCourses() {
    try {
        if (!existsSync(INPUT_FILE)) {
            console.error(`❌File ${INPUT_FILE} doesn't exist!`);
            return;
        }
        const rawData = readFileSync(INPUT_FILE, 'utf8');
        const allCourses = JSON.parse(rawData);
        const date = new Date('2025-06-01T00:00:00Z');
        const filteredCourses = allCourses.filter((course) => {
            return course.total_students > 0 && new Date(course.term.start_at) > date;
        });
        writeFileSync(OUTPUT_FILE, JSON.stringify(filteredCourses, null, 2));
        console.log(`\n💾 Save filtered courses into ${OUTPUT_FILE}`);
    }
    catch (error) { }
}
filterCourses();
//# sourceMappingURL=courses-filtered.js.map