/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFileSync, readFileSync } = require('fs');

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
          '_ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; log_session_id=8bc2847f9636ddfa777795e807ac65a4; canvas_session=N3A1-yc9Mn1Qpew8IuSbdg+Lx72dRH1Fk3zsD-is2oIFfhwrbaSWOMbksj7S5hKh7m-MhkjSN7DRLtKBZvKtpIE6uaIS8Dw0VjirqeSbc307Raqg5Rd3QOAHO9fOf934n_4Czev-29Ko-Yh_L0jCANoTZ40_7c-mFOUCECj5nlFBO7yIzHEs8M3BdGP3dB3AWJm-eGsiymB7zjKeu6t6XMbUajELpY1W3FXh-_CVsZHrlLv1xUAEP7LRFUFbiqiBsMoc9w3UftTfflJXYXLwkQ5yyHHPiKYzxCzuQPPegW99WY2BXm1oC9mZa3BFKNB8sd8xLKbdFQB7D4YYR06nOypcRzanJ0ijKhcpmP1EHRhAzVPn_u7K7ZbzZt3wVin771Ea-35EWfmyaY21Yd5rXsHBknYtljUOi0CQLcSauu8ew.csef-bVbyK6JI9eO-P3oMU6KjQo.aMbQ6Q; _csrf_token=4LwXIco6u77vZydf1AB1qwnAPHkdNjFKzXClDzuyjkyFjVZqiAj%2BiakDE2uBUxfka5hKFX5fQ3iFCtV1bIvbOg%3D%3D',
        Referer: 'https://eliteaa.instructure.com/accounts/1/users',
        'Referrer-Policy': 'no-referrer-when-downgrade',
      },
      body: null,
      method: 'GET',
    },
  );
}

async function fetchStudents(page = '1') {
  try {
    const response = await fetchPeoples('3', page);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchTeachers(page = '1') {
  try {
    const response = await fetchPeoples('4', page);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchDirectors(page = '1') {
  try {
    const response = await fetchPeoples('22', page);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchSISStudent(fromFile = false) {
  if (fromFile) {
    const data = readFileSync('./students.json', 'utf-8');
    return JSON.parse(data)
      .filter((p) => p.sis)
      .map((p) => p.sis);
  }

  try {
    const response = await fetch(
      'https://mountainelite.plsis.com/mod.php/admin/registration/studentlist.php?action[getEntityListPageJson]=1',
      {
        headers: {
          accept: 'text/javascript',
          'accept-language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'sec-ch-ua':
            '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-requested-with': 'XMLHttpRequest',
          cookie: 'PHPSESSID=kbB8xmiB7uUd0GJC362syw',
          Referer:
            'https://mountainelite.plsis.com/mod.php/admin/registration/studentlist.php?action[Prompt][list]=1&__sp_window_id__=1895903786',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: '_method=GET&dt%5Bdraw%5D=2&dt%5Bcolumns%5D%5B0%5D%5Bdata%5D=&dt%5Bcolumns%5D%5B0%5D%5Bname%5D=checkbox&dt%5Bcolumns%5D%5B0%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B0%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B0%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B0%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B0%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B1%5D%5Bdata%5D=entity_sequence&dt%5Bcolumns%5D%5B1%5D%5Bname%5D=entity_sequence&dt%5Bcolumns%5D%5B1%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B1%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B1%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B1%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B1%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B2%5D%5Bdata%5D=combo_preferred_name&dt%5Bcolumns%5D%5B2%5D%5Bname%5D=entity_name&dt%5Bcolumns%5D%5B2%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B2%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B2%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B2%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B2%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B3%5D%5Bdata%5D=entity_name&dt%5Bcolumns%5D%5B3%5D%5Bname%5D=legal_name&dt%5Bcolumns%5D%5B3%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B3%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B3%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B3%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B3%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B4%5D%5Bdata%5D=preferred_name&dt%5Bcolumns%5D%5B4%5D%5Bname%5D=preferred_name&dt%5Bcolumns%5D%5B4%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B4%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B4%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B4%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B4%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B5%5D%5Bdata%5D=entity_id&dt%5Bcolumns%5D%5B5%5D%5Bname%5D=entity_id&dt%5Bcolumns%5D%5B5%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B5%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B5%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B5%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B5%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B6%5D%5Bdata%5D=entity_district_id&dt%5Bcolumns%5D%5B6%5D%5Bname%5D=entity_district_id&dt%5Bcolumns%5D%5B6%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B6%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B6%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B6%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B6%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B7%5D%5Bdata%5D=entity_legacy_id&dt%5Bcolumns%5D%5B7%5D%5Bname%5D=entity_legacy_id&dt%5Bcolumns%5D%5B7%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B7%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B7%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B7%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B7%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B8%5D%5Bdata%5D=scope_title&dt%5Bcolumns%5D%5B8%5D%5Bname%5D=scope_title&dt%5Bcolumns%5D%5B8%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B8%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B8%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B8%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B8%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B9%5D%5Bdata%5D=lccgradelevels_gradelevel&dt%5Bcolumns%5D%5B9%5D%5Bname%5D=lccgradelevels_title&dt%5Bcolumns%5D%5B9%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B9%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B9%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B9%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B9%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B10%5D%5Bdata%5D=entity_state_id&dt%5Bcolumns%5D%5B10%5D%5Bname%5D=entity_state_id&dt%5Bcolumns%5D%5B10%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B10%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B10%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B10%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B10%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B11%5D%5Bdata%5D=schooltracks_title&dt%5Bcolumns%5D%5B11%5D%5Bname%5D=schooltracks_title&dt%5Bcolumns%5D%5B11%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B11%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B11%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B11%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B11%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B12%5D%5Bdata%5D=edprograms_name&dt%5Bcolumns%5D%5B12%5D%5Bname%5D=edprograms_name&dt%5Bcolumns%5D%5B12%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B12%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B12%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B12%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B12%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B13%5D%5Bdata%5D=lc_name&dt%5Bcolumns%5D%5B13%5D%5Bname%5D=lc_name&dt%5Bcolumns%5D%5B13%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B13%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B13%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B13%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B13%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B14%5D%5Bdata%5D=age_years&dt%5Bcolumns%5D%5B14%5D%5Bname%5D=age_years&dt%5Bcolumns%5D%5B14%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B14%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B14%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B14%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B14%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B15%5D%5Bdata%5D=birthdate&dt%5Bcolumns%5D%5B15%5D%5Bname%5D=birthdate&dt%5Bcolumns%5D%5B15%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B15%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B15%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B15%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B15%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B16%5D%5Bdata%5D=map_genders_title&dt%5Bcolumns%5D%5B16%5D%5Bname%5D=map_genders_title&dt%5Bcolumns%5D%5B16%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B16%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B16%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B16%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B16%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B17%5D%5Bdata%5D=city&dt%5Bcolumns%5D%5B17%5D%5Bname%5D=city&dt%5Bcolumns%5D%5B17%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B17%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B17%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B17%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B17%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B18%5D%5Bdata%5D=counties_title&dt%5Bcolumns%5D%5B18%5D%5Bname%5D=counties_title&dt%5Bcolumns%5D%5B18%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B18%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B18%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B18%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B18%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B19%5D%5Bdata%5D=homephone&dt%5Bcolumns%5D%5B19%5D%5Bname%5D=homephone&dt%5Bcolumns%5D%5B19%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B19%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B19%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B19%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B19%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B20%5D%5Bdata%5D=homeemail&dt%5Bcolumns%5D%5B20%5D%5Bname%5D=homeemail&dt%5Bcolumns%5D%5B20%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B20%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B20%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B20%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B20%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B21%5D%5Bdata%5D=schoolemail&dt%5Bcolumns%5D%5B21%5D%5Bname%5D=schoolemail&dt%5Bcolumns%5D%5B21%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B21%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B21%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B21%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B21%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B22%5D%5Bdata%5D=contiguous_start&dt%5Bcolumns%5D%5B22%5D%5Bname%5D=contiguous_start&dt%5Bcolumns%5D%5B22%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B22%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B22%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B22%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B22%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B23%5D%5Bdata%5D=contiguous_finish&dt%5Bcolumns%5D%5B23%5D%5Bname%5D=contiguous_finish&dt%5Bcolumns%5D%5B23%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B23%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B23%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B23%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B23%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B24%5D%5Bdata%5D=csisexitreasons_reporting_id&dt%5Bcolumns%5D%5B24%5D%5Bname%5D=csisexitreasons_reporting_id&dt%5Bcolumns%5D%5B24%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B24%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B24%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B24%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B24%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B25%5D%5Bdata%5D=enrollments_status_title&dt%5Bcolumns%5D%5B25%5D%5Bname%5D=enrollments_status_title&dt%5Bcolumns%5D%5B25%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B25%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B25%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B25%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B25%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B26%5D%5Bdata%5D=migrated&dt%5Bcolumns%5D%5B26%5D%5Bname%5D=migrated&dt%5Bcolumns%5D%5B26%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B26%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B26%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B26%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B26%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B27%5D%5Bdata%5D=parents_json&dt%5Bcolumns%5D%5B27%5D%5Bname%5D=parents&dt%5Bcolumns%5D%5B27%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B27%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B27%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B27%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B27%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B28%5D%5Bdata%5D=parents_name&dt%5Bcolumns%5D%5B28%5D%5Bname%5D=parents_name&dt%5Bcolumns%5D%5B28%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B28%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B28%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B28%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B28%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B29%5D%5Bdata%5D=parents_email&dt%5Bcolumns%5D%5B29%5D%5Bname%5D=parents_email&dt%5Bcolumns%5D%5B29%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B29%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B29%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B29%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B29%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B30%5D%5Bdata%5D=primary_staff_name&dt%5Bcolumns%5D%5B30%5D%5Bname%5D=primary_staff_name&dt%5Bcolumns%5D%5B30%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B30%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B30%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B30%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B30%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B31%5D%5Bdata%5D=primary_staffpositions_title&dt%5Bcolumns%5D%5B31%5D%5Bname%5D=primary_staffpositions_title&dt%5Bcolumns%5D%5B31%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B31%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B31%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B31%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B31%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B32%5D%5Bdata%5D=staff_name&dt%5Bcolumns%5D%5B32%5D%5Bname%5D=staff_name&dt%5Bcolumns%5D%5B32%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B32%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B32%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B32%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B32%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B33%5D%5Bdata%5D=staffpositions_title&dt%5Bcolumns%5D%5B33%5D%5Bname%5D=staffpositions_title&dt%5Bcolumns%5D%5B33%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B33%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B33%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B33%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B33%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B34%5D%5Bdata%5D=students_groups_title&dt%5Bcolumns%5D%5B34%5D%5Bname%5D=students_groups_title&dt%5Bcolumns%5D%5B34%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B34%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B34%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B34%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B34%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B35%5D%5Bdata%5D=any_tags&dt%5Bcolumns%5D%5B35%5D%5Bname%5D=any_tags&dt%5Bcolumns%5D%5B35%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B35%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B35%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B35%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B35%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B36%5D%5Bdata%5D=&dt%5Bcolumns%5D%5B36%5D%5Bname%5D=quick_links&dt%5Bcolumns%5D%5B36%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B36%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B36%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B36%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B36%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B37%5D%5Bdata%5D=id&dt%5Bcolumns%5D%5B37%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B37%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B37%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B38%5D%5Bdata%5D=aka_name&dt%5Bcolumns%5D%5B38%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B38%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B38%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B39%5D%5Bdata%5D=entity_fieldname&dt%5Bcolumns%5D%5B39%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B39%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B39%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B40%5D%5Bdata%5D=entity_id&dt%5Bcolumns%5D%5B40%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B40%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B40%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B41%5D%5Bdata%5D=entity_name&dt%5Bcolumns%5D%5B41%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B41%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B41%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B42%5D%5Bdata%5D=preferred_name&dt%5Bcolumns%5D%5B42%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B42%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B42%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B43%5D%5Bdata%5D=lccgradelevels_title&dt%5Bcolumns%5D%5B43%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B43%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B43%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B44%5D%5Bdata%5D=staff_id&dt%5Bcolumns%5D%5B44%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B44%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B44%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B45%5D%5Bdata%5D=entity_id&dt%5Bcolumns%5D%5B45%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B45%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B45%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B46%5D%5Bdata%5D=entity_tableref&dt%5Bcolumns%5D%5B46%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B46%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B46%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B47%5D%5Bdata%5D=scope_id&dt%5Bcolumns%5D%5B47%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B47%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B47%5D%5Bvisible%5D=true&dt%5Border%5D%5B0%5D%5Bcolumn%5D=1&dt%5Border%5D%5B0%5D%5Bdir%5D=asc&dt%5Border%5D%5B1%5D%5Bcolumn%5D=2&dt%5Border%5D%5B1%5D%5Bdir%5D=asc&dt%5Bstart%5D=0&dt%5Blength%5D=-1&dt%5Bsearch%5D%5Bvalue%5D=&dt%5Bsearch%5D%5Bregex%5D=false&filters=%7B%22has_enrollments%22%3A%5B%221%22%5D%7D&asof_start=07%2F01%2F2025&asof_finish=06%2F11%2F2026&include_enrollments_status=1&include_enrollments_status_counts=0&inclusion_tags_all=1&exclusion_tags_all=1&__sp_window_id__=1895903786&__csrf_token__=PrpIViHviHgD3K7hlO8MgZ42r-DzdAq3F9nSe8rX5tzy92mCSR-aacyF4EPjo0tuVtbkIpdE4jGqEk4rud7m3XzF&lform=1&schoolyear=2025+-+2026',
        method: 'POST',
      },
    );
    const { returnJSON } = await response.json();
    console.log(returnJSON);
    return returnJSON.dt.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function fetchSISTeacher(fromFile = false) {
  if (fromFile) {
    const data = readFileSync('./teachers.json', 'utf-8');
    return JSON.parse(data)
      .filter((p) => p.sis)
      .map((p) => p.sis);
  }

  try {
    const response = await fetch(
      'https://mountainelite.plsis.com/mod.php/admin/staff_list.php?action[getEntityListPageJson]=1',
      {
        headers: {
          accept: 'text/javascript',
          'accept-language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'sec-ch-ua':
            '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-requested-with': 'XMLHttpRequest',
          cookie: 'PHPSESSID=kbB8xmiB7uUd0GJC362syw',
          Referer:
            'https://mountainelite.plsis.com/mod.php/admin/staff_list.php?action[prompt]%5Blist%5D=1&&__sp_window_id__=1895903786',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: '_method=GET&dt%5Bdraw%5D=4&dt%5Bcolumns%5D%5B0%5D%5Bdata%5D=&dt%5Bcolumns%5D%5B0%5D%5Bname%5D=checkbox&dt%5Bcolumns%5D%5B0%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B0%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B0%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B0%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B0%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B1%5D%5Bdata%5D=combo_preferred_name&dt%5Bcolumns%5D%5B1%5D%5Bname%5D=entity_name&dt%5Bcolumns%5D%5B1%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B1%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B1%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B1%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B1%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B2%5D%5Bdata%5D=entity_name&dt%5Bcolumns%5D%5B2%5D%5Bname%5D=legal_name&dt%5Bcolumns%5D%5B2%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B2%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B2%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B2%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B2%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B3%5D%5Bdata%5D=preferred_name&dt%5Bcolumns%5D%5B3%5D%5Bname%5D=preferred_name&dt%5Bcolumns%5D%5B3%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B3%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B3%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B3%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B3%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B4%5D%5Bdata%5D=staffpositions_title&dt%5Bcolumns%5D%5B4%5D%5Bname%5D=staffpositions_title&dt%5Bcolumns%5D%5B4%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B4%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B4%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B4%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B4%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B5%5D%5Bdata%5D=entity_id&dt%5Bcolumns%5D%5B5%5D%5Bname%5D=entity_id&dt%5Bcolumns%5D%5B5%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B5%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B5%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B5%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B5%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B6%5D%5Bdata%5D=entity_legacy_id&dt%5Bcolumns%5D%5B6%5D%5Bname%5D=entity_legacy_id&dt%5Bcolumns%5D%5B6%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B6%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B6%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B6%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B6%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B7%5D%5Bdata%5D=scope_title&dt%5Bcolumns%5D%5B7%5D%5Bname%5D=scope_title&dt%5Bcolumns%5D%5B7%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B7%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B7%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B7%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B7%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B8%5D%5Bdata%5D=lc_name&dt%5Bcolumns%5D%5B8%5D%5Bname%5D=lc_name&dt%5Bcolumns%5D%5B8%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B8%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B8%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B8%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B8%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B9%5D%5Bdata%5D=contiguous_start&dt%5Bcolumns%5D%5B9%5D%5Bname%5D=contiguous_start&dt%5Bcolumns%5D%5B9%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B9%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B9%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B9%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B9%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B10%5D%5Bdata%5D=contiguous_finish&dt%5Bcolumns%5D%5B10%5D%5Bname%5D=contiguous_finish&dt%5Bcolumns%5D%5B10%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B10%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B10%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B10%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B10%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B11%5D%5Bdata%5D=age_years&dt%5Bcolumns%5D%5B11%5D%5Bname%5D=age_years&dt%5Bcolumns%5D%5B11%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B11%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B11%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B11%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B11%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B12%5D%5Bdata%5D=birthdate&dt%5Bcolumns%5D%5B12%5D%5Bname%5D=birthdate&dt%5Bcolumns%5D%5B12%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B12%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B12%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B12%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B12%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B13%5D%5Bdata%5D=contactphone&dt%5Bcolumns%5D%5B13%5D%5Bname%5D=contactphone&dt%5Bcolumns%5D%5B13%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B13%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B13%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B13%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B13%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B14%5D%5Bdata%5D=homeemail&dt%5Bcolumns%5D%5B14%5D%5Bname%5D=homeemail&dt%5Bcolumns%5D%5B14%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B14%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B14%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B14%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B14%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B15%5D%5Bdata%5D=schoolemail&dt%5Bcolumns%5D%5B15%5D%5Bname%5D=schoolemail&dt%5Bcolumns%5D%5B15%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B15%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B15%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B15%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B15%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B16%5D%5Bdata%5D=counties_title&dt%5Bcolumns%5D%5B16%5D%5Bname%5D=counties_title&dt%5Bcolumns%5D%5B16%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B16%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B16%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B16%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B16%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B17%5D%5Bdata%5D=address&dt%5Bcolumns%5D%5B17%5D%5Bname%5D=address&dt%5Bcolumns%5D%5B17%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B17%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B17%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B17%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B17%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B18%5D%5Bdata%5D=enrollments_status_title&dt%5Bcolumns%5D%5B18%5D%5Bname%5D=enrollments_status_title&dt%5Bcolumns%5D%5B18%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B18%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B18%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B18%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B18%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B19%5D%5Bdata%5D=&dt%5Bcolumns%5D%5B19%5D%5Bname%5D=quick_links&dt%5Bcolumns%5D%5B19%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B19%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B19%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B19%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B19%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B20%5D%5Bdata%5D=id&dt%5Bcolumns%5D%5B20%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B20%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B20%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B21%5D%5Bdata%5D=aka_name&dt%5Bcolumns%5D%5B21%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B21%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B21%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B22%5D%5Bdata%5D=entity_fieldname&dt%5Bcolumns%5D%5B22%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B22%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B22%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B23%5D%5Bdata%5D=entity_id&dt%5Bcolumns%5D%5B23%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B23%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B23%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B24%5D%5Bdata%5D=entity_name&dt%5Bcolumns%5D%5B24%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B24%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B24%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B25%5D%5Bdata%5D=preferred_name&dt%5Bcolumns%5D%5B25%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B25%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B25%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B26%5D%5Bdata%5D=entity_id&dt%5Bcolumns%5D%5B26%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B26%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B26%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B27%5D%5Bdata%5D=entity_tableref&dt%5Bcolumns%5D%5B27%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B27%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B27%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B28%5D%5Bdata%5D=scope_id&dt%5Bcolumns%5D%5B28%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B28%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B28%5D%5Bvisible%5D=true&dt%5Border%5D%5B0%5D%5Bcolumn%5D=1&dt%5Border%5D%5B0%5D%5Bdir%5D=asc&dt%5Bstart%5D=0&dt%5Blength%5D=-1&dt%5Bsearch%5D%5Bvalue%5D=&dt%5Bsearch%5D%5Bregex%5D=false&filters=%7B%22has_enrollments%22%3A%5B%221%22%5D%7D&asof_start=07%2F01%2F2025&asof_finish=06%2F11%2F2026&schoolyear=2025+-+2026&include_enrollments_status=1&include_enrollments_status_counts=0&inclusion_tags_all=1&exclusion_tags_all=1&__sp_window_id__=1895903786&__csrf_token__=9xwubMXdbw9Tbx6_rrwBBkELn1qZPohB-HyWLJUt5xNZPs_kc_uojrvVU_O9mRhj0QnZEi0uqLNc_etv7oEc3LNu&lform=1',
        method: 'POST',
      },
    );
    const { returnJSON } = await response.json();
    console.log(returnJSON);
    return returnJSON.dt.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

const mergeStudentsAndSIS = (
  students: People[],
  sis: SisStudent[],
  key = 'entity_district_id',
) => {
  return students.map((student) => {
    const sisStudent = sis.find(
      (s) => s[key].toString() === student.sis_user_id,
    );
    return { ...student, sis: sisStudent };
  });
};

async function fetchAll() {
  const students = [];
  const teachers = [];

  // const students = JSON.parse(readFileSync('students.json', 'utf8'));
  // const teachers = JSON.parse(readFileSync('teachers.json', 'utf8'));

  const sisStudents = await fetchSISStudent();
  const sisTeachers = await fetchSISTeacher();

  // const directors = await fetchDirectors();

  for (let i = 1; i <= 120; i++) {
    console.log('step:', i);
    try {
      const students_data = await fetchStudents(i.toString());
      students.push(...students_data);
      const teachers_data = await fetchTeachers(i.toString());
      teachers.push(...teachers_data);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(error);
    }
  }

  const studentsWithSIS = mergeStudentsAndSIS(students, sisStudents);
  const teachersWithSIS = mergeStudentsAndSIS(
    teachers,
    sisTeachers,
    'entity_legacy_id',
  );

  const filteredStudents = studentsWithSIS.filter(
    (student) => !teachers.some((teacher) => teacher.id === student.id),
  );

  writeFileSync('students.json', JSON.stringify(filteredStudents, null, 2));
  writeFileSync('teachers.json', JSON.stringify(teachersWithSIS, null, 2));
  // writeFileSync('directors.json', JSON.stringify(directors, null, 2));
}

fetchAll();

function uniqueEmails() {
  const students: People[] = JSON.parse(readFileSync('students.json', 'utf8'));
  const studentsMap = new Map();
  students.forEach((student) => {
    if (!student.email) student.email = student.login_id;

    if (!studentsMap.has(student.email)) {
      studentsMap.set(student.email, student);
    } else {
      const existingStudent = studentsMap.get(student.email);
      const mergedStudent = {
        ...existingStudent,
        ...student,
      };
      studentsMap.set(student.email, mergedStudent);
    }
  });
  const uniqueStudents = Array.from(studentsMap.values());
  console.log('Original count:', students.length);
  console.log('Unique count:', uniqueStudents.length);
  writeFileSync('students.json', JSON.stringify(uniqueStudents, null, 2));
}

uniqueEmails();

// run
// npx ts-node peoples.ts

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
  sis?: SisStudent;
};

export type SisStudent = {
  entity_district_id: string;
  schooltracks_title: 'A' | 'B';
  lc_name:
    | 'Flex'
    | 'Virtual'
    | 'Homeschool'
    | 'Flex - New'
    | 'Virtual - New'
    | 'Homeschool - New';
  scope_title: 'mountainelite' | 'eliteaa';
  lccgradelevels_gradelevel: string | number;
};
