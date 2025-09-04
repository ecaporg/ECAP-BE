# Order of Running Scripts for JSON File Generation

To generate the JSON files used in the `AddEliteData` migration, you need to execute the following scripts **in the same oreder (see bellow)**.
Ensure you are in the elita-date directory of the project (`nestjs\migrations\elite-data`) when running the commands.

1.  **Generate `courses.json`:**
    Script: `migrations/elite-data/courses.ts`
    Command:

    ```bash
    npx ts-node courses.ts
    npx ts-node courses-filtered.ts
    ```

2.  **Generate `peoples.json`:**
    Script: `migrations/elite-data/peoples.ts`
    Command:

    ```bash
    npx ts-node peoples.ts
    ```

3.  **Generate `assignments.json`:**
    Command:

    ```bash
    npx ts-node assignments.ts
    npx ts-node assignments-filtered.ts
    ```

    _(After execution, verify the existence and currency of `assignments-filtered.json`)_

4.  **Generate `submissions.json` (and `assignments-filtered.json`):**
    Script: `migrations/elite-data/submitions.ts` (as listed in the files)
    Command:

    ```bash
    npx ts-node submitions.ts
    ```

5.  **Delete duplicated data if need**
    Script: `migrations/elite-data/delete-dublicates.ts`
    Command:

    ```bash
    npx ts-node delete-dublicates.ts
    ```

6.  **Generate `teacher-student-relation.json`:**
    Script: `migrations/elite-data/teacher-student-relation.ts`
    Command:
    ```bash
    npx ts-node teacher-student-relation.ts
    ```
