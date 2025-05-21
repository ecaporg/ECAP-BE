/* eslint-disable @typescript-eslint/no-var-requires */
const { appendFileSync } = require('fs');

function fetchPeoples(role_filter_id, page = '1') {
  return fetch(
    `https://eliteaa.instructure.com/api/v1/accounts/1/users?include%5B%5D=last_login&include%5B%5D=avatar_url&include%5B%5D=pronouns&include%5B%5D=email&include%5B%5D=time_zone&include%5B%5D=ui_invoked&per_page=5000&no_avatar_fallback=1&role_filter_id=${role_filter_id}&page=${page}`,
    {
      headers: {
        accept:
          'application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01',
        'accept-language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
        'if-none-match': 'W/"07b197064159eca70bb6a2263a4af9dc"',
        priority: 'u=1, i',
        'sec-ch-ua':
          '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sentry-trace': '460c8645a2844476969e6c01cc1d0220-9c92a7d17d1d0d90-0',
        'x-csrf-token':
          'sXzI4fOtMeYe2s7V7p+IUnvKi5iQDNJ8JlwB8rjKdvn6PpGRlMl1nHOwuJi7rsMFE4ezwMo/sQprGnCI6Poemg==',
        'x-requested-with': 'XMLHttpRequest',
        cookie:
          '_gcl_au=1.1.1130948627.1747650265; _ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; _fbp=fb.1.1747650265761.736434457114054295; c99_user_id=9fb97f7d-cb36-419c-bb05-3eec71d2451b; __q_state_W7bJ3K1WBhKLn2tA=eyJ1dWlkIjoiNGMwZTQ4ZTktYmJjOS00N2ZkLWI4YmQtOWE1YTY1Nzc5YTIwIiwiY29va2llRG9tYWluIjoiaW5zdHJ1Y3R1cmUuY29tIiwiYWN0aXZlU2Vzc2lvbklkIjpudWxsLCJzY3JpcHRJZCI6IjE2NTU0NDM3MDEyMjg3NjY3MzMiLCJtZXNzZW5nZXJFeHBhbmRlZCI6bnVsbCwicHJvbXB0RGlzbWlzc2VkIjpmYWxzZSwiY29udmVyc2F0aW9uSWQiOiIxNjU3OTU0NTMyMzk1Mjc5OTI0In0=; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; ReadSpeakerFloatingSettings=detachPosition=3,725; log_session_id=12d64a5fa16017dc0c8bdc9090a8b4d4; _legacy_normandy_session=riQ_j2d_hQ3jDR2WQhLc8g+xk50YSaJto30s_O-l0rMbuspnzadJ2O13_tMDbBqkEyiPZ8mxALAz1NckiaQT86TvHz7jh1dd9J6SzdP0eaYotc8i9AKqJQyYBp81HPaPuAhZqLpc6G6hvlBp9HQV_JcejMj0Z8FpXMMgXJc7sEMklE0UgW46m-LaRjHDZoHjAE1sA3b_H_Jjs9fTV-93UwHq0fRSmcGNX2K4vxoBq3Pksqx28HOW7aD0O9X48aHcGmEiYjxRZvwsyqNdiqKcmJL4ohiHo116aYZy9Tcid6PQWmQgjnVa8bRJrRZCkHMAzcAs14Vtyb1pEipN9FhRBqSNVhlz62hBR8gwlzhj1OTIV0OnlsrL4G7HoTF_bzq5muEY-bpEtaP31HUpLsu5ZOVVtauABxFRfdXfwpHEb_Vsw.uNHfgyZ4kZLJ_6UwQhC6DJHADmk.aCzz5w; canvas_session=riQ_j2d_hQ3jDR2WQhLc8g+xk50YSaJto30s_O-l0rMbuspnzadJ2O13_tMDbBqkEyiPZ8mxALAz1NckiaQT86TvHz7jh1dd9J6SzdP0eaYotc8i9AKqJQyYBp81HPaPuAhZqLpc6G6hvlBp9HQV_JcejMj0Z8FpXMMgXJc7sEMklE0UgW46m-LaRjHDZoHjAE1sA3b_H_Jjs9fTV-93UwHq0fRSmcGNX2K4vxoBq3Pksqx28HOW7aD0O9X48aHcGmEiYjxRZvwsyqNdiqKcmJL4ohiHo116aYZy9Tcid6PQWmQgjnVa8bRJrRZCkHMAzcAs14Vtyb1pEipN9FhRBqSNVhlz62hBR8gwlzhj1OTIV0OnlsrL4G7HoTF_bzq5muEY-bpEtaP31HUpLsu5ZOVVtauABxFRfdXfwpHEb_Vsw.uNHfgyZ4kZLJ_6UwQhC6DJHADmk.aCzz5w; _csrf_token=sXzI4fOtMeYe2s7V7p%2BIUnvKi5iQDNJ8JlwB8rjKdvn6PpGRlMl1nHOwuJi7rsMFE4ezwMo%2FsQprGnCI6Poemg%3D%3D',
        Referer: 'https://eliteaa.instructure.com/accounts/1/users',
        'Referrer-Policy': 'no-referrer-when-downgrade',
      },
      body: null,
      method: 'GET',
    },
  );
}

async function fetchStudents(page = '1') {
  const response = await fetchPeoples('3', page);
  const data = await response.json();

  console.log(data);
  appendFileSync('students.json', JSON.stringify(data, null, 2));
}

async function fetchTeachers(page = '1') {
  const response = await fetchPeoples('4', page);
  const data = await response.json();

  console.log(data);
  appendFileSync('teachers.json', JSON.stringify(data, null, 2));
}

async function fetchAll() {
  for (let i = 1; i <= 120; i++) {
    try {
      await fetchStudents(i.toString());
      await fetchTeachers(i.toString());
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.log(error);
    }
  }
}

fetchAll();


export type People = {
  id: string;
  name: string;
  created_at: string;
  sortable_name: string;
  short_name: string;
  sis_user_id: string;
  integration_id: string | null;
  sis_import_id: string | null;
  login_id: string;
  avatar_url: string | null;
  email: string;
  last_login: string;
  time_zone: string;
};
