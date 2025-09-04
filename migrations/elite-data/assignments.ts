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
          '_ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; log_session_id=2ae225e94982be88b8b192d3112ac873; _csrf_token=fwrVNpJafv%2FhD5u4VrmjIW37k8SSqLI9BgqjBhrswLgFTJ9s%2FTYxyYZuqNY07dRTG57Kvabq00o2X%2BJhc96vlw%3D%3D; _legacy_normandy_session=0t1H1h3gpw4D27iG04FxYQ+2yAXO40OuIPaU4nJso1mt-ZNXC9i7mynffXd5xl8Gfet64_FVfIbMrixrONxzslx81rJ56MWOI30yCqc_ksfUOIc0ETwNe4wWFCBNclk4jlKeTFNG7FpTI4ZhO74vIHUmn_XXlAjAaCbnFR2CPfm6fStlfpRXHgxycqsB4ntT1jHFUxWTMquyUfd0YarlFKY-_107hGXmUryQhc4lYnV7GeTvQuU8VQZm2vkux2KQqCOZ4DHR9lk7R37E-8jXCmYFuqvgenCmJUUX4NDzrERITkgFQiUufwRO5WpVmYg7vhXMZdaaswxVHD5V-jp69o1XUu4P9QjYbhNjMbLHS7qH9m20Voqr_FwuP4R_zNXXoLjMAb9W5X-gXSoIAwPYiwq_rpnnL592gzfm12sS1basw.O35Rubo6xwvLSWEJDFv83KzF7Vc.aLlkPg; canvas_session=0t1H1h3gpw4D27iG04FxYQ+2yAXO40OuIPaU4nJso1mt-ZNXC9i7mynffXd5xl8Gfet64_FVfIbMrixrONxzslx81rJ56MWOI30yCqc_ksfUOIc0ETwNe4wWFCBNclk4jlKeTFNG7FpTI4ZhO74vIHUmn_XXlAjAaCbnFR2CPfm6fStlfpRXHgxycqsB4ntT1jHFUxWTMquyUfd0YarlFKY-_107hGXmUryQhc4lYnV7GeTvQuU8VQZm2vkux2KQqCOZ4DHR9lk7R37E-8jXCmYFuqvgenCmJUUX4NDzrERITkgFQiUufwRO5WpVmYg7vhXMZdaaswxVHD5V-jp69o1XUu4P9QjYbhNjMbLHS7qH9m20Voqr_FwuP4R_zNXXoLjMAb9W5X-gXSoIAwPYiwq_rpnnL592gzfm12sS1basw.O35Rubo6xwvLSWEJDFv83KzF7Vc.aLlkPg',
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
};
