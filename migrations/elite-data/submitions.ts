/* eslint-disable @typescript-eslint/no-var-requires */

import { Assignment } from './assignments';

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

  for (const course of courseMap.values()) {
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

      //   console.log(firstAssignment?.due_at, period.end_date);

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

async function fetchSubmissions(courseId: string, assignmentId: string) {
  const response = await fetch(
    `https://eliteaa.instructure.com/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions?per_page=500`,
    {
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
        'if-none-match': 'W/"8492789d16cac66099c21b843e983a03"',
        priority: 'u=1, i',
        'sec-ch-ua':
          '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-requested-with': 'XMLHttpRequest',
        cookie:
          '_gcl_au=1.1.1130948627.1747650265; _ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; _fbp=fb.1.1747650265761.736434457114054295; c99_user_id=9fb97f7d-cb36-419c-bb05-3eec71d2451b; __q_state_W7bJ3K1WBhKLn2tA=eyJ1dWlkIjoiNGMwZTQ4ZTktYmJjOS00N2ZkLWI4YmQtOWE1YTY1Nzc5YTIwIiwiY29va2llRG9tYWluIjoiaW5zdHJ1Y3R1cmUuY29tIiwiYWN0aXZlU2Vzc2lvbklkIjpudWxsLCJzY3JpcHRJZCI6IjE2NTU0NDM3MDEyMjg3NjY3MzMiLCJtZXNzZW5nZXJFeHBhbmRlZCI6bnVsbCwicHJvbXB0RGlzbWlzc2VkIjpmYWxzZSwiY29udmVyc2F0aW9uSWQiOiIxNjU3OTU0NTMyMzk1Mjc5OTI0In0=; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; ReadSpeakerFloatingSettings=detachPosition=3,725; log_session_id=12d64a5fa16017dc0c8bdc9090a8b4d4; _legacy_normandy_session=zaYSNVkJn7z8oQPP5S3uNg+HqzMPNW-12FpRGtfgThzhpBQepuAOSbnocnT-zTz7u689NDWTrJZel69Ke4RP2mTfBlBVL1TJAVRKDNrgkC7HnkHK4LJFSx-F3v2hOuVhwP7FvAUtGE9As1PaJF75iLEvEzkxDgwDRGYgM1MoCFTGwphceHWffs82wdd5HDwa-YPwmR7O1-HtWeh9n6rYqJThI7BBCdYh1im3KyFAYXcCjqpKPngbLEb_AFvRTXhm2OiGmrFhmtUE2rNfJe8yliveZcS1cX9h5tQu7W3JjRybJrMDFLqxomWlsxbTqcX05341ARLAo3xB9eN4HT0GzV4Y7ajQrvjqFRfgEDZsZMtmYsCJvdkaLAf0xp6VwNH04DGbR73obJQZfMDuCJwgPLOJD8ddz99SwgKWHeHgNPTYnBstFEoMXYchJKflAWM7LSEuOe3TAlKrC2SttTsGye7ZUqhpdnVjHjVAJdx-i8flxG8rRQC3P387AQy2oGjyri-ZZi4cPcwUK-bQA-3r5Of.Q6RPolTjmkpvJOT-rgKlANCeKM4.aC-dIQ; canvas_session=zaYSNVkJn7z8oQPP5S3uNg+HqzMPNW-12FpRGtfgThzhpBQepuAOSbnocnT-zTz7u689NDWTrJZel69Ke4RP2mTfBlBVL1TJAVRKDNrgkC7HnkHK4LJFSx-F3v2hOuVhwP7FvAUtGE9As1PaJF75iLEvEzkxDgwDRGYgM1MoCFTGwphceHWffs82wdd5HDwa-YPwmR7O1-HtWeh9n6rYqJThI7BBCdYh1im3KyFAYXcCjqpKPngbLEb_AFvRTXhm2OiGmrFhmtUE2rNfJe8yliveZcS1cX9h5tQu7W3JjRybJrMDFLqxomWlsxbTqcX05341ARLAo3xB9eN4HT0GzV4Y7ajQrvjqFRfgEDZsZMtmYsCJvdkaLAf0xp6VwNH04DGbR73obJQZfMDuCJwgPLOJD8ddz99SwgKWHeHgNPTYnBstFEoMXYchJKflAWM7LSEuOe3TAlKrC2SttTsGye7ZUqhpdnVjHjVAJdx-i8flxG8rRQC3P387AQy2oGjyri-ZZi4cPcwUK-bQA-3r5Of.Q6RPolTjmkpvJOT-rgKlANCeKM4.aC-dIQ; _csrf_token=HWo3P8T0Y%2Bu6UKF0fIip2v99r6HOKjxG%2F21H%2BltTOx5WKG5Po5Ankdc61zkpueKNlzCX%2BZQZXzCyKzaAC2NTfQ%3D%3D',
        Referer: `https://eliteaa.instructure.com/courses/${courseId}/assignments/${assignmentId}/submissions`,
        'Referrer-Policy': 'no-referrer-when-downgrade',
      },
      body: null,
      method: 'GET',
    },
  );

  const data = await response.json();
  return data;
}

async function fetchAllSubmissions() {
  const submissions = [];
  for (const assignment of twoAssignmentsPerPeriodPerCourse) {
    console.log(assignment.course_id, assignment.id);
    try {
      submissions.push(
        await fetchSubmissions(assignment.course_id, assignment.id),
      );
    } catch (error) {
      console.error(error);
    }
  }
  writeFileSync('submissions.json', JSON.stringify(submissions, null, 2));
}

fetchAllSubmissions();

export type CanvasWorkflowState =
  | 'submitted'
  | 'pending_review'
  | 'graded'
  | 'unsubmitted';

export type Submission = {
  id: string;
  body: string;
  url: string | null;
  grade: string;
  score: number;
  submitted_at: string;
  assignment_id: string;
  user_id: string | number;
  submission_type: string;
  workflow_state: CanvasWorkflowState;
  grade_matches_current_submission: boolean;
  graded_at: string;
  grader_id: string;
  attempt: number;
  cached_due_date: string;
  excused: string | null;
  late_policy_status: string | null;
  points_deducted: string | null;
  grading_period_id: string | null;
  extra_attempts: string | null;
  posted_at: string;
  redo_request: boolean;
  custom_grade_status_id: string | null;
  sticker: string | null;
  late: boolean;
  missing: boolean;
  seconds_late: number;
  entered_grade: string;
  entered_score: number;
  preview_url: string;
  anonymous_id: string;
};

// run
// npx ts-node submitions.ts
