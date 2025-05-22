/* eslint-disable @typescript-eslint/no-var-requires */

const { writeFileSync } = require('fs');

const course_ids = [
  '7291',
  '6570',
  '7245',
  '7238',
  '7326',
  '7234',
  '7099',
  '7235',
  '6972',
  '7228',
  '6812',
  '7094',
  '7219',
  '7101',
  '7241',
  '7239',
  '7257',
  '7090',
  '7243',
  '7260',
  '7227',
  '7246',
  '7266',
  '7155',
  '7157',
  '7267',
  '7156',
  '7306',
  '7289',
  '7059',
  '7270',
  '7221',
  '7087',
  '6759',
  '7232',
  '6820',
  '7274',
  '6808',
  '7277',
  '7151',
  '7307',
  '7214',
  '7255',
  '7102',
  '6810',
  '7150',
  '7092',
  '7233',
  '7229',
  '7223',
  '7236',
  '7269',
  '7216',
  '7258',
  '7253',
  '6816',
  '6974',
  '7275',
  '7287',
  '6970',
  '7240',
  '7276',
  '7211',
  '7248',
  '7273',
  '7250',
  '7226',
  '7213',
  '7149',
  '6764',
  '7254',
  '7220',
  '7152',
  '7262',
  '7237',
  '7249',
  '7225',
  '7212',
  '7154',
  '6968',
  '7268',
  '7251',
  '6966',
  '7278',
  '7256',
  '6818',
  '7325',
  '7272',
  '7328',
  '6814',
  '7085',
  '7224',
  '7095',
  '7096',
  '7097',
  '7098',
  '7244',
  '7217',
  '7264',
  '7259',
  '7327',
  '7242',
  '7252',
  '7038',
  '7218',
  '7222',
  '7283',
  '6976',
  '6761',
  '7247',
  '7308',
  '7153',
  '7088',
  '7230',
  '7215',
  '7231',
  '7100',
];

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
          '_gcl_au=1.1.1130948627.1747650265; _ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; _fbp=fb.1.1747650265761.736434457114054295; c99_user_id=9fb97f7d-cb36-419c-bb05-3eec71d2451b; __q_state_W7bJ3K1WBhKLn2tA=eyJ1dWlkIjoiNGMwZTQ4ZTktYmJjOS00N2ZkLWI4YmQtOWE1YTY1Nzc5YTIwIiwiY29va2llRG9tYWluIjoiaW5zdHJ1Y3R1cmUuY29tIiwiYWN0aXZlU2Vzc2lvbklkIjpudWxsLCJzY3JpcHRJZCI6IjE2NTU0NDM3MDEyMjg3NjY3MzMiLCJtZXNzZW5nZXJFeHBhbmRlZCI6bnVsbCwicHJvbXB0RGlzbWlzc2VkIjpmYWxzZSwiY29udmVyc2F0aW9uSWQiOiIxNjU3OTU0NTMyMzk1Mjc5OTI0In0=; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; ReadSpeakerFloatingSettings=detachPosition=3,725; log_session_id=12d64a5fa16017dc0c8bdc9090a8b4d4; _legacy_normandy_session=g21FLYYMYMC7RvMSPtyiwA+7NR-wqvHhqPphAA8qTcFbYmV6AV4MHUCtGZxzHNADumga3xond7X4M5nlRlxRRmrh3hMiSn1OpG2FMm4xdV2sGaQp6-gyy-B3Tl52MSkrLsvHvNeldn47xxTv4S0Lx5HFpopRx3o4XdgligcL3KJ-uctGiL1F6Qh3xD76CvD3_AvVH8AHlTn7VZjCgpr3IuFl8PxoXhfnoxIZJGxl0-EKLuZzEh_27Nd8sArTPxbVTLVKt4le4IYji91akLIGWcKpHPbmfNkNznrvQStdQnC4Z1wlSuFlgALYlWdixm6uwm3DxGJ0N3mfIEUehs47_ulyEg3Aw4XoD0nd4369pZPLynXTQYJLPV3GEi3-7KH0rg3dsMU6FRMCMAfmN5h0O0eLPofve1a_9tNrqwDMVoyiTQO_qqDUazXyWjXz2hLWe1La1Yv_0INvvUXRxZWvpN8OcSJf9CI5c2CFexaHcFB0Yj6i9UBABBePbiTgvT_W9o.vwYHgAJCCI8LxNW_XUZvCOUmgI4.aC4WOA; canvas_session=g21FLYYMYMC7RvMSPtyiwA+7NR-wqvHhqPphAA8qTcFbYmV6AV4MHUCtGZxzHNADumga3xond7X4M5nlRlxRRmrh3hMiSn1OpG2FMm4xdV2sGaQp6-gyy-B3Tl52MSkrLsvHvNeldn47xxTv4S0Lx5HFpopRx3o4XdgligcL3KJ-uctGiL1F6Qh3xD76CvD3_AvVH8AHlTn7VZjCgpr3IuFl8PxoXhfnoxIZJGxl0-EKLuZzEh_27Nd8sArTPxbVTLVKt4le4IYji91akLIGWcKpHPbmfNkNznrvQStdQnC4Z1wlSuFlgALYlWdixm6uwm3DxGJ0N3mfIEUehs47_ulyEg3Aw4XoD0nd4369pZPLynXTQYJLPV3GEi3-7KH0rg3dsMU6FRMCMAfmN5h0O0eLPofve1a_9tNrqwDMVoyiTQO_qqDUazXyWjXz2hLWe1La1Yv_0INvvUXRxZWvpN8OcSJf9CI5c2CFexaHcFB0Yj6i9UBABBePbiTgvT_W9o.vwYHgAJCCI8LxNW_XUZvCOUmgI4.aC4WOA; _csrf_token=RTbRmjXp7JLcfxgXam8PkFfMV6rBpLmOM0WVEvhB9ocOdIjqUo2o6LEVblo%2FXkTHP4Fv8puX2vh%2BA%2BRoqHGe5A%3D%3D',
        Referer: `https://eliteaa.instructure.com/courses/${courseId}/assignments`,
        'Referrer-Policy': 'no-referrer-when-downgrade',
      },
      body: null,
      method: 'GET',
    },
  );

  const data = (await response.json()) as { assignments: any[] }[];
  return data.flatMap((item) => item.assignments);
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
