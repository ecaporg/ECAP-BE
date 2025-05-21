/* eslint-disable @typescript-eslint/no-var-requires */
const { appendFileSync } = require('fs');

async function fetchCourses(page = '1') {
  const response = await fetch(
    `https://eliteaa.instructure.com/api/v1/accounts/1/courses?sort=sis_course_id&order=asc&search_by=course&include%5B%5D=total_students&include%5B%5D=active_teachers&include%5B%5D=subaccount&include%5B%5D=term&include%5B%5D=concluded&include%5B%5D=ui_invoked&include%5B%5D=total_scores&include%5B%5D=sections&teacher_limit=25&per_page=1500&no_avatar_fallback=1&page=${page}`,
    {
      headers: {
        accept:
          'application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01',
        'accept-language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
        baggage:
          'sentry-environment=Production,sentry-release=canvas-lms%4020250507.340,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=1c7f8bbc212c4ec0b2e95e240e94cddd,sentry-sample_rate=0.005,sentry-sampled=false',
        'if-none-match': 'W/"257923f101d3d17b65499b14515e6939"',
        priority: 'u=1, i',
        'sec-ch-ua':
          '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sentry-trace': '1c7f8bbc212c4ec0b2e95e240e94cddd-989260f3f060930c-0',
        'x-csrf-token':
          'MVBgKnUgvvCaHR60MyaMNT2FHaQ4CkEyQcvzgfh/6sB6EjlaEkT6ivd3aPlmF8diVcgl/GI5IkQMjYL7qE+Cow==',
        'x-requested-with': 'XMLHttpRequest',
        cookie:
          '_gcl_au=1.1.1130948627.1747650265; _ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; _fbp=fb.1.1747650265761.736434457114054295; c99_user_id=9fb97f7d-cb36-419c-bb05-3eec71d2451b; __q_state_W7bJ3K1WBhKLn2tA=eyJ1dWlkIjoiNGMwZTQ4ZTktYmJjOS00N2ZkLWI4YmQtOWE1YTY1Nzc5YTIwIiwiY29va2llRG9tYWluIjoiaW5zdHJ1Y3R1cmUuY29tIiwiYWN0aXZlU2Vzc2lvbklkIjpudWxsLCJzY3JpcHRJZCI6IjE2NTU0NDM3MDEyMjg3NjY3MzMiLCJtZXNzZW5nZXJFeHBhbmRlZCI6bnVsbCwicHJvbXB0RGlzbWlzc2VkIjpmYWxzZSwiY29udmVyc2F0aW9uSWQiOiIxNjU3OTU0NTMyMzk1Mjc5OTI0In0=; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; ReadSpeakerFloatingSettings=detachPosition=3,725; log_session_id=12d64a5fa16017dc0c8bdc9090a8b4d4; _legacy_normandy_session=6occku5wJz2drq0iP2R3VA+Vwe6_unALU9JX3M4FzGy_J5NpEOik5YwxvaxOd2Hd7Ulwy7-gatBZhX1JoHqGXx23BFcdazMCrl2gtAkQ_UXk2Uc_3wlpnD4DgSMLl0Qep-MmT7LJUw1uSHk6nYHr_TzboQATKj-gCVrrsXh0qxi5CESZJYwhWZ6Pc0pK_vcGwSYfLXhP9xoL5Cy7tTvMbxfugDoKCYWc3KNvoHMD91N3y0BsgaA8LdRwK76BjmSvqmKSp1R2ysX5PydKV3PDA6q_SgNAaQKyUwrYEUQTgNOpeYSsw-IKLcVULDD6lEBJGmgkEUc75CpHP5V7-dtfIFGhzkWUochMCf1BZYzw5SgQCRFwcna_uouQQwNUAmYH4QKZ0cQCKLFGpqySd48t8EGugTySQsW1uTBaTVVWcMgRg.OB8ncePBPAtD_VxIEStDqw8q2A8.aCzwBA; canvas_session=6occku5wJz2drq0iP2R3VA+Vwe6_unALU9JX3M4FzGy_J5NpEOik5YwxvaxOd2Hd7Ulwy7-gatBZhX1JoHqGXx23BFcdazMCrl2gtAkQ_UXk2Uc_3wlpnD4DgSMLl0Qep-MmT7LJUw1uSHk6nYHr_TzboQATKj-gCVrrsXh0qxi5CESZJYwhWZ6Pc0pK_vcGwSYfLXhP9xoL5Cy7tTvMbxfugDoKCYWc3KNvoHMD91N3y0BsgaA8LdRwK76BjmSvqmKSp1R2ysX5PydKV3PDA6q_SgNAaQKyUwrYEUQTgNOpeYSsw-IKLcVULDD6lEBJGmgkEUc75CpHP5V7-dtfIFGhzkWUochMCf1BZYzw5SgQCRFwcna_uouQQwNUAmYH4QKZ0cQCKLFGpqySd48t8EGugTySQsW1uTBaTVVWcMgRg.OB8ncePBPAtD_VxIEStDqw8q2A8.aCzwBA; _csrf_token=MVBgKnUgvvCaHR60MyaMNT2FHaQ4CkEyQcvzgfh%2F6sB6EjlaEkT6ivd3aPlmF8diVcgl%2FGI5IkQMjYL7qE%2BCow%3D%3D',
        Referer: 'https://eliteaa.instructure.com/accounts/1?',
        'Referrer-Policy': 'no-referrer-when-downgrade',
      },
      body: null,
      method: 'GET',
    },
  );

  const data = await response.json();

  appendFileSync('courses.json', JSON.stringify(data, null, 2));
}

async function fetchAllCourses() {
  for (let i = 1; i <= 60; i++) {
    try {
      await fetchCourses(i.toString());
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.log(error);
    }
  }
}

fetchAllCourses();

export type Course = {
  id: string;
  name: string;
  account_id: string;
  uuid: string;
  start_at: string | null;
  grading_standard_id: string;
  is_public: boolean;
  created_at: string;
  course_code: string;
  default_view: string;
  root_account_id: string;
  enrollment_term_id: string;
  license: string;
  grade_passback_setting: string | null;
  end_at: string | null;
  public_syllabus: boolean;
  public_syllabus_to_auth: boolean;
  storage_quota_mb: number;
  is_public_to_auth_users: boolean;
  homeroom_course: boolean;
  course_color: string | null;
  friendly_name: string | null;
  term: {
    id: string;
    name: string;
    start_at: string;
    end_at: string;
    created_at: string;
    workflow_state: string;
    grading_period_group_id: string | null;
    sis_term_id: string;
    sis_import_id: string | null;
  };
  apply_assignment_group_weights: boolean;
  total_students: number;
  teachers: {
    id: string;
    anonymous_id: string;
    display_name: string;
    avatar_image_url: string;
    html_url: string;
    pronouns: string | null;
  }[];
  subaccount_id: string;
  subaccount_name: string;
  calendar: {
    ics: string;
  };
  time_zone: string;
  concluded: boolean;
  blueprint: boolean;
  template: boolean;
  sis_course_id: string;
  sis_import_id: string | null;
  integration_id: string | null;
  hide_final_grades: boolean;
  workflow_state: string;
  restrict_enrollments_to_course_dates: boolean;
};
