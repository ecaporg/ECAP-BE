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
          '_ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; log_session_id=64b0aab48c1409f29f6433173c0c7c68; _legacy_normandy_session=yQPkM17MSFAwMtcH8GfBgg+agkwuBLM0JjPRoy8pVc0AlAB64IKhsEp4omq0PTyIkLhSvT6HXXpFDqInUOKIJbB1b3FpxpZ_AXmKbqx5RHyhfAqQDZx6L6UO9MHehmATEpwwlp_yZQ1HUhk7sZPj_qJeCF-VNumqUtNfe9lFydTQs8dRa3qZeE-VE8NtFgahmdSNjKbAsgJrsQojltJzasew1yDmk5R93OSY9HPHIVImvwUabAsiAkClIVsHYCYX4qinTgGZjSRPIq28e7_6a8-LOqIn_2ccwXmxI1ltavfBMQ_Lpv6D1_xl34CvXMouUKtDPkgsAzZ_ro3wE5SyW9Azl49vw_R82lZw1pXhYP4k3r7Cp3Wqgq6hekDSkhG6C8Xed58NEnQegC6vyUiP2AezQP7pFGbfFFEt8Izd3dijw._Why10BsgsaBBszoPve041HRbtE.aKlEJA; canvas_session=yQPkM17MSFAwMtcH8GfBgg+agkwuBLM0JjPRoy8pVc0AlAB64IKhsEp4omq0PTyIkLhSvT6HXXpFDqInUOKIJbB1b3FpxpZ_AXmKbqx5RHyhfAqQDZx6L6UO9MHehmATEpwwlp_yZQ1HUhk7sZPj_qJeCF-VNumqUtNfe9lFydTQs8dRa3qZeE-VE8NtFgahmdSNjKbAsgJrsQojltJzasew1yDmk5R93OSY9HPHIVImvwUabAsiAkClIVsHYCYX4qinTgGZjSRPIq28e7_6a8-LOqIn_2ccwXmxI1ltavfBMQ_Lpv6D1_xl34CvXMouUKtDPkgsAzZ_ro3wE5SyW9Azl49vw_R82lZw1pXhYP4k3r7Cp3Wqgq6hekDSkhG6C8Xed58NEnQegC6vyUiP2AezQP7pFGbfFFEt8Izd3dijw._Why10BsgsaBBszoPve041HRbtE.aKlEJA; _csrf_token=3jeCLT3OUa7ZSSXgh758z4R0XDAqwT5tjHnDWFStOBK9QM9cWogfmoBxE7r%2FlT%2BZ0Rc3dE%2F4XD%2B8LK4qH8FfWQ%3D%3D',
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
