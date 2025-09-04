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
          '_ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; log_session_id=2ae225e94982be88b8b192d3112ac873; _csrf_token=fwrVNpJafv%2FhD5u4VrmjIW37k8SSqLI9BgqjBhrswLgFTJ9s%2FTYxyYZuqNY07dRTG57Kvabq00o2X%2BJhc96vlw%3D%3D; _legacy_normandy_session=0t1H1h3gpw4D27iG04FxYQ+2yAXO40OuIPaU4nJso1mt-ZNXC9i7mynffXd5xl8Gfet64_FVfIbMrixrONxzslx81rJ56MWOI30yCqc_ksfUOIc0ETwNe4wWFCBNclk4jlKeTFNG7FpTI4ZhO74vIHUmn_XXlAjAaCbnFR2CPfm6fStlfpRXHgxycqsB4ntT1jHFUxWTMquyUfd0YarlFKY-_107hGXmUryQhc4lYnV7GeTvQuU8VQZm2vkux2KQqCOZ4DHR9lk7R37E-8jXCmYFuqvgenCmJUUX4NDzrERITkgFQiUufwRO5WpVmYg7vhXMZdaaswxVHD5V-jp69o1XUu4P9QjYbhNjMbLHS7qH9m20Voqr_FwuP4R_zNXXoLjMAb9W5X-gXSoIAwPYiwq_rpnnL592gzfm12sS1basw.O35Rubo6xwvLSWEJDFv83KzF7Vc.aLlkPg; canvas_session=0t1H1h3gpw4D27iG04FxYQ+2yAXO40OuIPaU4nJso1mt-ZNXC9i7mynffXd5xl8Gfet64_FVfIbMrixrONxzslx81rJ56MWOI30yCqc_ksfUOIc0ETwNe4wWFCBNclk4jlKeTFNG7FpTI4ZhO74vIHUmn_XXlAjAaCbnFR2CPfm6fStlfpRXHgxycqsB4ntT1jHFUxWTMquyUfd0YarlFKY-_107hGXmUryQhc4lYnV7GeTvQuU8VQZm2vkux2KQqCOZ4DHR9lk7R37E-8jXCmYFuqvgenCmJUUX4NDzrERITkgFQiUufwRO5WpVmYg7vhXMZdaaswxVHD5V-jp69o1XUu4P9QjYbhNjMbLHS7qH9m20Voqr_FwuP4R_zNXXoLjMAb9W5X-gXSoIAwPYiwq_rpnnL592gzfm12sS1basw.O35Rubo6xwvLSWEJDFv83KzF7Vc.aLlkPg',
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
