/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFileSync } = require('fs');

const file_name = 'courses.json';

async function fetchCourses(page = '1') {
  try {
    const response = await fetch(
      `https://eliteaa.instructure.com/api/v1/accounts/1/courses?sort=sis_course_id&order=asc&search_by=course&include%5B%5D=total_students&include%5B%5D=active_teachers&include%5B%5D=subaccount&include%5B%5D=term&include%5B%5D=concluded&include%5B%5D=ui_invoked&include%5B%5D=grading_periods&include%5B%5D=sections&teacher_limit=25&per_page=1500&no_avatar_fallback=1&page=${page}`,
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
            '_ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; log_session_id=de6c72e5bff4d226a5a3cbba1c03c16e; canvas_session=IS6V_caF21hEIouMJICMuA+nKSla8Ekkhgbo0-53nrlHylYCuJwxC6we_A-HOcCFlvH64Pu1w_tl_ymwb87ACI17e6uheLLv2q2JPRfYHNi7G7svsfvYCRBLZeAYzwN6NjTNLcDhvt-s-COgEa3Xf9eHcC3cKPDdx5WrcvLlNOhknuXElnpGvGfJt_Rx3LhKvNbqSILZy7ef6TO2-bikNk_CD0MLdNEol2UUbtEft7HePc5JFLlqs_mT_zarsvMor-sAK5OA9TgsxveCPoZVOagk-IWY6peiiX9asDxC8sez7cDlQldbhQHsLpErBZp9Y2Adwp7-e0a-8z3lSKSPFtb5o4PusHEh-d1_BEQfAf99MYY20lSUBIaPkvfRLGrv40GqzW1BzchE1MAp1y8StWP2Jd50w1NTAFMeGSt0_bEZA.q4n3gnIAwXfMgm6WW8SR4DSR-4c.aON0qA; _csrf_token=Q%2BBWjwvf1JKgsJJryKu6aYlLc4uO7Ml0tfuTdpI4RVsorG%2FdUZn%2F%2F9XFvROk8%2FtZzw1Eu%2Ffev1vNvacYonVzdA%3D%3D',
          Referer: 'https://eliteaa.instructure.com/accounts/1?',
          'Referrer-Policy': 'no-referrer-when-downgrade',
        },
        body: null,
        method: 'GET',
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchAllCourses() {
  const allCourses = [];
  for (let i = 1; i <= 60; i++) {
    console.log('step:', i);
    try {
      const courses = await fetchCourses(i.toString());
      allCourses.push(...courses);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(error);
    }
  }

  writeFileSync(file_name, JSON.stringify(allCourses, null, 2));
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
  all_users?: any[];
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

// run
// npx ts-node courses.ts
