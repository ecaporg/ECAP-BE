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
            '_ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; log_session_id=8bc2847f9636ddfa777795e807ac65a4; canvas_session=N3A1-yc9Mn1Qpew8IuSbdg+Lx72dRH1Fk3zsD-is2oIFfhwrbaSWOMbksj7S5hKh7m-MhkjSN7DRLtKBZvKtpIE6uaIS8Dw0VjirqeSbc307Raqg5Rd3QOAHO9fOf934n_4Czev-29Ko-Yh_L0jCANoTZ40_7c-mFOUCECj5nlFBO7yIzHEs8M3BdGP3dB3AWJm-eGsiymB7zjKeu6t6XMbUajELpY1W3FXh-_CVsZHrlLv1xUAEP7LRFUFbiqiBsMoc9w3UftTfflJXYXLwkQ5yyHHPiKYzxCzuQPPegW99WY2BXm1oC9mZa3BFKNB8sd8xLKbdFQB7D4YYR06nOypcRzanJ0ijKhcpmP1EHRhAzVPn_u7K7ZbzZt3wVin771Ea-35EWfmyaY21Yd5rXsHBknYtljUOi0CQLcSauu8ew.csef-bVbyK6JI9eO-P3oMU6KjQo.aMbQ6Q; _csrf_token=4LwXIco6u77vZydf1AB1qwnAPHkdNjFKzXClDzuyjkyFjVZqiAj%2BiakDE2uBUxfka5hKFX5fQ3iFCtV1bIvbOg%3D%3D',
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
