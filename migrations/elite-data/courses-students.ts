/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFileSync, readFileSync, existsSync } = require('fs');

import { Course } from './courses';

const INPUT_FILE = 'courses-filtered.json';

async function fetchStudentForCourse(
  courseId: string,
  page: number = 1,
): Promise<any[]> {
  try {
    const response = await fetch(
      `https://eliteaa.instructure.com/api/v1/courses/${courseId}/users?per_page=200&page=${page}`,
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
            '_ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; log_session_id=2ae225e94982be88b8b192d3112ac873; _csrf_token=fwrVNpJafv%2FhD5u4VrmjIW37k8SSqLI9BgqjBhrswLgFTJ9s%2FTYxyYZuqNY07dRTG57Kvabq00o2X%2BJhc96vlw%3D%3D; _legacy_normandy_session=0t1H1h3gpw4D27iG04FxYQ+2yAXO40OuIPaU4nJso1mt-ZNXC9i7mynffXd5xl8Gfet64_FVfIbMrixrONxzslx81rJ56MWOI30yCqc_ksfUOIc0ETwNe4wWFCBNclk4jlKeTFNG7FpTI4ZhO74vIHUmn_XXlAjAaCbnFR2CPfm6fStlfpRXHgxycqsB4ntT1jHFUxWTMquyUfd0YarlFKY-_107hGXmUryQhc4lYnV7GeTvQuU8VQZm2vkux2KQqCOZ4DHR9lk7R37E-8jXCmYFuqvgenCmJUUX4NDzrERITkgFQiUufwRO5WpVmYg7vhXMZdaaswxVHD5V-jp69o1XUu4P9QjYbhNjMbLHS7qH9m20Voqr_FwuP4R_zNXXoLjMAb9W5X-gXSoIAwPYiwq_rpnnL592gzfm12sS1basw.O35Rubo6xwvLSWEJDFv83KzF7Vc.aLlkPg; canvas_session=0t1H1h3gpw4D27iG04FxYQ+2yAXO40OuIPaU4nJso1mt-ZNXC9i7mynffXd5xl8Gfet64_FVfIbMrixrONxzslx81rJ56MWOI30yCqc_ksfUOIc0ETwNe4wWFCBNclk4jlKeTFNG7FpTI4ZhO74vIHUmn_XXlAjAaCbnFR2CPfm6fStlfpRXHgxycqsB4ntT1jHFUxWTMquyUfd0YarlFKY-_107hGXmUryQhc4lYnV7GeTvQuU8VQZm2vkux2KQqCOZ4DHR9lk7R37E-8jXCmYFuqvgenCmJUUX4NDzrERITkgFQiUufwRO5WpVmYg7vhXMZdaaswxVHD5V-jp69o1XUu4P9QjYbhNjMbLHS7qH9m20Voqr_FwuP4R_zNXXoLjMAb9W5X-gXSoIAwPYiwq_rpnnL592gzfm12sS1basw.O35Rubo6xwvLSWEJDFv83KzF7Vc.aLlkPg',
          Referer: `https://eliteaa.instructure.com/courses/${courseId}/users`,
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
  if (!existsSync(INPUT_FILE)) {
    console.error(`❌File ${INPUT_FILE} doesn't exist!`);
    return;
  }

  const rawData = readFileSync(INPUT_FILE, 'utf8');
  const allCourses: Course[] = JSON.parse(rawData);

  for (const course of allCourses) {
    console.log('step:', course.id);
    course.all_users = await fetchStudentForCourse(course.id);
    if (
      course.all_users.length <
      course.total_students + course.teachers.length
    ) {
      for (let page = 2; page < 2; page++) {
        course.all_users.push(
          ...(await fetchStudentForCourse(course.id, page)),
        );
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  writeFileSync(INPUT_FILE, JSON.stringify(allCourses, null, 2));
}

fetchAllCourses();

// run
// npx ts-node courses-students.ts
