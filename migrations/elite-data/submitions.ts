/* eslint-disable @typescript-eslint/no-var-requires */

import { Assignment } from './assignments';

/* eslint-disable @typescript-eslint/no-unused-vars */
const { readFileSync, writeFileSync } = require('fs');

const twoAssignmentsPerPeriodPerCourse = JSON.parse(
  readFileSync('assignments-filtered.json', 'utf8'),
) as Assignment[];

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
        cookie:
          '_ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; _csrf_token=y%2B6na9ZdykdprBSS7Ch7bnRlQwQWQ2zg7smdkVv4NZL5jMsdsxuPdQreTMPHYBIkBFUkPV1zWculrvT%2BLKp49Q%3D%3D; log_session_id=f227845c1d00cbbd5e66fb794ecc7dc1; canvas_session=_J_Wz98nsm9pIYKS3oY_ZA+FecaoWrUfQyl8FiBBmuyJDoUAuyNMpXbts_xLbzX_XbGotPMvFQ87m-qBf_eiD6X7CXj6Vxm6aUZiqJuWkexvJP6sj9iICDM7UklwuS1FGAPLRKjvlvA5d-zD8POZyvpJ9bKW1EpzSv61rRctijjcHptcfvY_Gwn1nI5f2rCND1pAidIqI486xynTxijusJvT85QOsSBIIY5Xfnbkiq1q3ghdBbmtYaoxhWfiqk5TX75xzYxCbJ4jbXMgAr2LA4Mqxv30LqzanlzjWYCqfiK9sLp-kLLuEkPEfEhfrteishcX94MmAmGIR2JziGJ2UWW.ElCvBnhWW8Obb9wmqBoSLdkeu64.aNuLPg',
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
