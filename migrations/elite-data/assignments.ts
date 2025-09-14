/* eslint-disable @typescript-eslint/no-var-requires */

const { writeFileSync, readFileSync } = require('fs');

const COURSE_FILE = 'courses-filtered.json';

const course_ids = JSON.parse(readFileSync(COURSE_FILE, 'utf8')).map(
  (c: any) => c.id,
);

async function fetchAssignments(courseId) {
  const response = await fetch(
    `https://eliteaa.instructure.com/api/v1/courses/${courseId}/assignment_groups?exclude_assignment_submission_types%5B%5D=wiki_page&exclude_response_fields%5B%5D=description&exclude_response_fields%5B%5D=rubric&include%5B%5D=assignments&include%5B%5D=discussion_topic&include%5B%5D=all_dates&include%5B%5D=module_ids&override_assignment_dates=false&per_page=50`,
    {
      headers: {
        accept: 'application/json+canvas-string-ids, application/json',
        'accept-language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
        'if-none-match': 'W/"da99f58a2c08a6f197ce693b1a63abce"',
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
          '_ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; log_session_id=8bc2847f9636ddfa777795e807ac65a4; canvas_session=N3A1-yc9Mn1Qpew8IuSbdg+Lx72dRH1Fk3zsD-is2oIFfhwrbaSWOMbksj7S5hKh7m-MhkjSN7DRLtKBZvKtpIE6uaIS8Dw0VjirqeSbc307Raqg5Rd3QOAHO9fOf934n_4Czev-29Ko-Yh_L0jCANoTZ40_7c-mFOUCECj5nlFBO7yIzHEs8M3BdGP3dB3AWJm-eGsiymB7zjKeu6t6XMbUajELpY1W3FXh-_CVsZHrlLv1xUAEP7LRFUFbiqiBsMoc9w3UftTfflJXYXLwkQ5yyHHPiKYzxCzuQPPegW99WY2BXm1oC9mZa3BFKNB8sd8xLKbdFQB7D4YYR06nOypcRzanJ0ijKhcpmP1EHRhAzVPn_u7K7ZbzZt3wVin771Ea-35EWfmyaY21Yd5rXsHBknYtljUOi0CQLcSauu8ew.csef-bVbyK6JI9eO-P3oMU6KjQo.aMbQ6Q; _csrf_token=4LwXIco6u77vZydf1AB1qwnAPHkdNjFKzXClDzuyjkyFjVZqiAj%2BiakDE2uBUxfka5hKFX5fQ3iFCtV1bIvbOg%3D%3D',
        Referer: `https://eliteaa.instructure.com/courses/${courseId}/assignments`,
        'Referrer-Policy': 'no-referrer-when-downgrade',
      },
      body: null,
      method: 'GET',
    },
  );

  const data = (await response.json()) as { assignments: any[] }[];
  const assignments = data.flatMap((item) => item.assignments);
  if (!Array.isArray(assignments) || assignments.length === 0) {
    console.error(`No assignments found for course ${courseId}`);
  } else {
    console.log(
      `Found ${assignments.length} assignments for course ${courseId}`,
    );
  }
  return Array.isArray(assignments) ? assignments : [];
}

function saveAssignments(assignments: any[]) {
  writeFileSync('assignments.json', JSON.stringify(assignments, null, 2));
}

async function fetchAllAssignments() {
  const assignments = [];
  for (const courseId of course_ids) {
    try {
      assignments.push(...(await fetchAssignments(courseId)));
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(error);
    }
  }
  saveAssignments(assignments);
}

fetchAllAssignments();

// run
// npx ts-node assignments.ts

export type Assignment = {
  anonymous_submissions?: boolean;
  id: string;
  due_at: string | null;
  unlock_at: string | null;
  lock_at: string | null;
  points_possible: number;
  grading_type: string;
  assignment_group_id: string;
  grading_standard_id: string | null;
  created_at: string;
  updated_at: string;
  peer_reviews: boolean;
  automatic_peer_reviews: boolean;
  position: number;
  grade_group_students_individually: boolean;
  anonymous_peer_reviews: boolean;
  group_category_id: string | null;
  post_to_sis: boolean;
  moderated_grading: boolean;
  omit_from_final_grade: boolean;
  intra_group_peer_reviews: boolean;
  anonymous_instructor_annotations: boolean;
  anonymous_grading: boolean;
  graders_anonymous_to_graders: boolean;
  grader_count: number;
  grader_comments_visible_to_graders: boolean;
  final_grader_id: string | null;
  grader_names_visible_to_final_grader: boolean;
  allowed_attempts: number;
  annotatable_attachment_id: string | null;
  hide_in_gradebook: boolean;
  secure_params: string;
  lti_context_id: string;
  course_id: string;
  name: string;
  submission_types: (
    | 'discussion_topic'
    | 'online_quiz'
    | 'on_paper'
    | 'none'
    | 'external_tool'
    | 'online_text_entry'
    | 'online_url'
    | 'online_upload'
    | 'media_recording'
    | 'student_annotation'
  )[];
  has_submitted_submissions: boolean;
  due_date_required: boolean;
  max_name_length: number;
  graded_submissions_exist: boolean;
  is_quiz_assignment: boolean;
  can_duplicate: boolean;
  original_course_id: string | null;
  original_assignment_id: string | null;
  original_lti_resource_link_id: string | null;
  original_assignment_name: string | null;
  original_quiz_id: string | null;
  workflow_state: string;
  important_dates: boolean;
  muted: boolean;
  html_url: string;
  has_overrides: boolean;
  needs_grading_count: number;
  sis_assignment_id: string | null;
  integration_id: string | null;
  integration_data: Record<string, never>;
  all_dates: {
    due_at: string | null;
    unlock_at: string | null;
    lock_at: string | null;
    base: boolean;
  }[];
  module_ids: string[];
  module_positions: number[];
  published: boolean;
  unpublishable: boolean;
  only_visible_to_overrides: boolean;
  visible_to_everyone: boolean;
  locked_for_user: boolean;
  submissions_download_url: string;
  is_master_course_child_content: boolean;
  restricted_by_master_course: boolean;
  post_manually: boolean;
  anonymize_students: boolean;
  require_lockdown_browser: boolean;
  restrict_quantitative_data: boolean;
  in_closed_grading_period: boolean;
  learning_period?: { start_date: string; end_date: string; name: string };
};
