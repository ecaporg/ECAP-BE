"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { writeFileSync, readFileSync } = require('fs');
function fetchPeoples(role_filter_id, page = '1') {
    return fetch(`https://eliteaa.instructure.com/api/v1/accounts/1/users?include%5B%5D=last_login&include%5B%5D=avatar_url&include%5B%5D=pronouns&include%5B%5D=email&include%5B%5D=time_zone&include%5B%5D=ui_invoked&per_page=5000&no_avatar_fallback=1&role_filter_id=${role_filter_id}&page=${page}`, {
        headers: {
            accept: 'application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01',
            'accept-language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
            'if-none-match': 'W/"07b197064159eca70bb6a2263a4af9dc"',
            priority: 'u=1, i',
            'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'sentry-trace': '460c8645a2844476969e6c01cc1d0220-9c92a7d17d1d0d90-0',
            'x-csrf-token': 'sXzI4fOtMeYe2s7V7p+IUnvKi5iQDNJ8JlwB8rjKdvn6PpGRlMl1nHOwuJi7rsMFE4ezwMo/sQprGnCI6Poemg==',
            'x-requested-with': 'XMLHttpRequest',
            cookie: '_gcl_au=1.1.1130948627.1747650265; _ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; _fbp=fb.1.1747650265761.736434457114054295; c99_user_id=9fb97f7d-cb36-419c-bb05-3eec71d2451b; __q_state_W7bJ3K1WBhKLn2tA=eyJ1dWlkIjoiNGMwZTQ4ZTktYmJjOS00N2ZkLWI4YmQtOWE1YTY1Nzc5YTIwIiwiY29va2llRG9tYWluIjoiaW5zdHJ1Y3R1cmUuY29tIiwiYWN0aXZlU2Vzc2lvbklkIjpudWxsLCJzY3JpcHRJZCI6IjE2NTU0NDM3MDEyMjg3NjY3MzMiLCJtZXNzZW5nZXJFeHBhbmRlZCI6bnVsbCwicHJvbXB0RGlzbWlzc2VkIjpmYWxzZSwiY29udmVyc2F0aW9uSWQiOiIxNjU3OTU0NTMyMzk1Mjc5OTI0In0=; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; ReadSpeakerFloatingSettings=detachPosition=3,725; log_session_id=12d64a5fa16017dc0c8bdc9090a8b4d4; _legacy_normandy_session=riQ_j2d_hQ3jDR2WQhLc8g+xk50YSaJto30s_O-l0rMbuspnzadJ2O13_tMDbBqkEyiPZ8mxALAz1NckiaQT86TvHz7jh1dd9J6SzdP0eaYotc8i9AKqJQyYBp81HPaPuAhZqLpc6G6hvlBp9HQV_JcejMj0Z8FpXMMgXJc7sEMklE0UgW46m-LaRjHDZoHjAE1sA3b_H_Jjs9fTV-93UwHq0fRSmcGNX2K4vxoBq3Pksqx28HOW7aD0O9X48aHcGmEiYjxRZvwsyqNdiqKcmJL4ohiHo116aYZy9Tcid6PQWmQgjnVa8bRJrRZCkHMAzcAs14Vtyb1pEipN9FhRBqSNVhlz62hBR8gwlzhj1OTIV0OnlsrL4G7HoTF_bzq5muEY-bpEtaP31HUpLsu5ZOVVtauABxFRfdXfwpHEb_Vsw.uNHfgyZ4kZLJ_6UwQhC6DJHADmk.aCzz5w; canvas_session=riQ_j2d_hQ3jDR2WQhLc8g+xk50YSaJto30s_O-l0rMbuspnzadJ2O13_tMDbBqkEyiPZ8mxALAz1NckiaQT86TvHz7jh1dd9J6SzdP0eaYotc8i9AKqJQyYBp81HPaPuAhZqLpc6G6hvlBp9HQV_JcejMj0Z8FpXMMgXJc7sEMklE0UgW46m-LaRjHDZoHjAE1sA3b_H_Jjs9fTV-93UwHq0fRSmcGNX2K4vxoBq3Pksqx28HOW7aD0O9X48aHcGmEiYjxRZvwsyqNdiqKcmJL4ohiHo116aYZy9Tcid6PQWmQgjnVa8bRJrRZCkHMAzcAs14Vtyb1pEipN9FhRBqSNVhlz62hBR8gwlzhj1OTIV0OnlsrL4G7HoTF_bzq5muEY-bpEtaP31HUpLsu5ZOVVtauABxFRfdXfwpHEb_Vsw.uNHfgyZ4kZLJ_6UwQhC6DJHADmk.aCzz5w; _csrf_token=sXzI4fOtMeYe2s7V7p%2BIUnvKi5iQDNJ8JlwB8rjKdvn6PpGRlMl1nHOwuJi7rsMFE4ezwMo%2FsQprGnCI6Poemg%3D%3D',
            Referer: 'https://eliteaa.instructure.com/accounts/1/users',
            'Referrer-Policy': 'no-referrer-when-downgrade',
        },
        body: null,
        method: 'GET',
    });
}
async function fetchStudents(page = '1') {
    try {
        const response = await fetchPeoples('3', page);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
async function fetchTeachers(page = '1') {
    try {
        const response = await fetchPeoples('4', page);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
async function fetchSISS() {
    try {
        const response = await fetch('https://mountainelite.plsis.com/mod.php/admin/registration/studentlist.php?action[getEntityListPageJson]=1', {
            headers: {
                accept: 'text/javascript',
                'accept-language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'x-requested-with': 'XMLHttpRequest',
                cookie: 'PHPSESSID=u7tOd3TDZH_qJ1MU3Cjhvg',
                Referer: 'https://mountainelite.plsis.com/mod.php/admin/registration/studentlist.php?action[Prompt][list]=1&__sp_window_id__=205319750',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
            },
            body: '_method=GET&dt%5Bdraw%5D=6&dt%5Bcolumns%5D%5B0%5D%5Bdata%5D=&dt%5Bcolumns%5D%5B0%5D%5Bname%5D=checkbox&dt%5Bcolumns%5D%5B0%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B0%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B0%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B0%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B0%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B1%5D%5Bdata%5D=entity_sequence&dt%5Bcolumns%5D%5B1%5D%5Bname%5D=entity_sequence&dt%5Bcolumns%5D%5B1%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B1%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B1%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B1%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B1%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B2%5D%5Bdata%5D=combo_preferred_name&dt%5Bcolumns%5D%5B2%5D%5Bname%5D=entity_name&dt%5Bcolumns%5D%5B2%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B2%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B2%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B2%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B2%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B3%5D%5Bdata%5D=entity_name&dt%5Bcolumns%5D%5B3%5D%5Bname%5D=legal_name&dt%5Bcolumns%5D%5B3%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B3%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B3%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B3%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B3%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B4%5D%5Bdata%5D=preferred_name&dt%5Bcolumns%5D%5B4%5D%5Bname%5D=preferred_name&dt%5Bcolumns%5D%5B4%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B4%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B4%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B4%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B4%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B5%5D%5Bdata%5D=entity_id&dt%5Bcolumns%5D%5B5%5D%5Bname%5D=entity_id&dt%5Bcolumns%5D%5B5%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B5%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B5%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B5%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B5%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B6%5D%5Bdata%5D=entity_district_id&dt%5Bcolumns%5D%5B6%5D%5Bname%5D=entity_district_id&dt%5Bcolumns%5D%5B6%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B6%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B6%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B6%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B6%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B7%5D%5Bdata%5D=entity_legacy_id&dt%5Bcolumns%5D%5B7%5D%5Bname%5D=entity_legacy_id&dt%5Bcolumns%5D%5B7%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B7%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B7%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B7%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B7%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B8%5D%5Bdata%5D=scope_title&dt%5Bcolumns%5D%5B8%5D%5Bname%5D=scope_title&dt%5Bcolumns%5D%5B8%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B8%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B8%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B8%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B8%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B9%5D%5Bdata%5D=lccgradelevels_gradelevel&dt%5Bcolumns%5D%5B9%5D%5Bname%5D=lccgradelevels_title&dt%5Bcolumns%5D%5B9%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B9%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B9%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B9%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B9%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B10%5D%5Bdata%5D=entity_state_id&dt%5Bcolumns%5D%5B10%5D%5Bname%5D=entity_state_id&dt%5Bcolumns%5D%5B10%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B10%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B10%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B10%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B10%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B11%5D%5Bdata%5D=schooltracks_title&dt%5Bcolumns%5D%5B11%5D%5Bname%5D=schooltracks_title&dt%5Bcolumns%5D%5B11%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B11%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B11%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B11%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B11%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B12%5D%5Bdata%5D=edprograms_name&dt%5Bcolumns%5D%5B12%5D%5Bname%5D=edprograms_name&dt%5Bcolumns%5D%5B12%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B12%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B12%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B12%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B12%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B13%5D%5Bdata%5D=lc_name&dt%5Bcolumns%5D%5B13%5D%5Bname%5D=lc_name&dt%5Bcolumns%5D%5B13%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B13%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B13%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B13%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B13%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B14%5D%5Bdata%5D=age_years&dt%5Bcolumns%5D%5B14%5D%5Bname%5D=age_years&dt%5Bcolumns%5D%5B14%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B14%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B14%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B14%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B14%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B15%5D%5Bdata%5D=birthdate&dt%5Bcolumns%5D%5B15%5D%5Bname%5D=birthdate&dt%5Bcolumns%5D%5B15%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B15%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B15%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B15%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B15%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B16%5D%5Bdata%5D=map_genders_title&dt%5Bcolumns%5D%5B16%5D%5Bname%5D=map_genders_title&dt%5Bcolumns%5D%5B16%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B16%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B16%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B16%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B16%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B17%5D%5Bdata%5D=city&dt%5Bcolumns%5D%5B17%5D%5Bname%5D=city&dt%5Bcolumns%5D%5B17%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B17%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B17%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B17%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B17%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B18%5D%5Bdata%5D=counties_title&dt%5Bcolumns%5D%5B18%5D%5Bname%5D=counties_title&dt%5Bcolumns%5D%5B18%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B18%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B18%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B18%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B18%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B19%5D%5Bdata%5D=homephone&dt%5Bcolumns%5D%5B19%5D%5Bname%5D=homephone&dt%5Bcolumns%5D%5B19%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B19%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B19%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B19%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B19%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B20%5D%5Bdata%5D=homeemail&dt%5Bcolumns%5D%5B20%5D%5Bname%5D=homeemail&dt%5Bcolumns%5D%5B20%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B20%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B20%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B20%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B20%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B21%5D%5Bdata%5D=schoolemail&dt%5Bcolumns%5D%5B21%5D%5Bname%5D=schoolemail&dt%5Bcolumns%5D%5B21%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B21%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B21%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B21%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B21%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B22%5D%5Bdata%5D=contiguous_start&dt%5Bcolumns%5D%5B22%5D%5Bname%5D=contiguous_start&dt%5Bcolumns%5D%5B22%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B22%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B22%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B22%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B22%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B23%5D%5Bdata%5D=contiguous_finish&dt%5Bcolumns%5D%5B23%5D%5Bname%5D=contiguous_finish&dt%5Bcolumns%5D%5B23%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B23%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B23%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B23%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B23%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B24%5D%5Bdata%5D=csisexitreasons_reporting_id&dt%5Bcolumns%5D%5B24%5D%5Bname%5D=csisexitreasons_reporting_id&dt%5Bcolumns%5D%5B24%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B24%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B24%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B24%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B24%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B25%5D%5Bdata%5D=enrollments_status_title&dt%5Bcolumns%5D%5B25%5D%5Bname%5D=enrollments_status_title&dt%5Bcolumns%5D%5B25%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B25%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B25%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B25%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B25%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B26%5D%5Bdata%5D=migrated&dt%5Bcolumns%5D%5B26%5D%5Bname%5D=migrated&dt%5Bcolumns%5D%5B26%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B26%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B26%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B26%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B26%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B27%5D%5Bdata%5D=parents_json&dt%5Bcolumns%5D%5B27%5D%5Bname%5D=parents&dt%5Bcolumns%5D%5B27%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B27%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B27%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B27%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B27%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B28%5D%5Bdata%5D=parents_name&dt%5Bcolumns%5D%5B28%5D%5Bname%5D=parents_name&dt%5Bcolumns%5D%5B28%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B28%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B28%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B28%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B28%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B29%5D%5Bdata%5D=parents_email&dt%5Bcolumns%5D%5B29%5D%5Bname%5D=parents_email&dt%5Bcolumns%5D%5B29%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B29%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B29%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B29%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B29%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B30%5D%5Bdata%5D=primary_staff_name&dt%5Bcolumns%5D%5B30%5D%5Bname%5D=primary_staff_name&dt%5Bcolumns%5D%5B30%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B30%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B30%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B30%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B30%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B31%5D%5Bdata%5D=primary_staffpositions_title&dt%5Bcolumns%5D%5B31%5D%5Bname%5D=primary_staffpositions_title&dt%5Bcolumns%5D%5B31%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B31%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B31%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B31%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B31%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B32%5D%5Bdata%5D=staff_name&dt%5Bcolumns%5D%5B32%5D%5Bname%5D=staff_name&dt%5Bcolumns%5D%5B32%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B32%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B32%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B32%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B32%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B33%5D%5Bdata%5D=staffpositions_title&dt%5Bcolumns%5D%5B33%5D%5Bname%5D=staffpositions_title&dt%5Bcolumns%5D%5B33%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B33%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B33%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B33%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B33%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B34%5D%5Bdata%5D=students_groups_title&dt%5Bcolumns%5D%5B34%5D%5Bname%5D=students_groups_title&dt%5Bcolumns%5D%5B34%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B34%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B34%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B34%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B34%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B35%5D%5Bdata%5D=any_tags&dt%5Bcolumns%5D%5B35%5D%5Bname%5D=any_tags&dt%5Bcolumns%5D%5B35%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B35%5D%5Borderable%5D=true&dt%5Bcolumns%5D%5B35%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B35%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B35%5D%5Bvisible%5D=false&dt%5Bcolumns%5D%5B36%5D%5Bdata%5D=&dt%5Bcolumns%5D%5B36%5D%5Bname%5D=quick_links&dt%5Bcolumns%5D%5B36%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B36%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B36%5D%5Bsearch%5D%5Bvalue%5D=&dt%5Bcolumns%5D%5B36%5D%5Bsearch%5D%5Bregex%5D=false&dt%5Bcolumns%5D%5B36%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B37%5D%5Bdata%5D=id&dt%5Bcolumns%5D%5B37%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B37%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B37%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B38%5D%5Bdata%5D=aka_name&dt%5Bcolumns%5D%5B38%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B38%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B38%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B39%5D%5Bdata%5D=entity_fieldname&dt%5Bcolumns%5D%5B39%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B39%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B39%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B40%5D%5Bdata%5D=entity_id&dt%5Bcolumns%5D%5B40%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B40%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B40%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B41%5D%5Bdata%5D=entity_name&dt%5Bcolumns%5D%5B41%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B41%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B41%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B42%5D%5Bdata%5D=preferred_name&dt%5Bcolumns%5D%5B42%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B42%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B42%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B43%5D%5Bdata%5D=lccgradelevels_title&dt%5Bcolumns%5D%5B43%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B43%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B43%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B44%5D%5Bdata%5D=staff_id&dt%5Bcolumns%5D%5B44%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B44%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B44%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B45%5D%5Bdata%5D=entity_id&dt%5Bcolumns%5D%5B45%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B45%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B45%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B46%5D%5Bdata%5D=entity_tableref&dt%5Bcolumns%5D%5B46%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B46%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B46%5D%5Bvisible%5D=true&dt%5Bcolumns%5D%5B47%5D%5Bdata%5D=scope_id&dt%5Bcolumns%5D%5B47%5D%5Bsearchable%5D=false&dt%5Bcolumns%5D%5B47%5D%5Borderable%5D=false&dt%5Bcolumns%5D%5B47%5D%5Bvisible%5D=true&dt%5Border%5D%5B0%5D%5Bcolumn%5D=1&dt%5Border%5D%5B0%5D%5Bdir%5D=asc&dt%5Border%5D%5B1%5D%5Bcolumn%5D=2&dt%5Border%5D%5B1%5D%5Bdir%5D=asc&dt%5Bstart%5D=0&dt%5Blength%5D=-1&dt%5Bsearch%5D%5Bvalue%5D=&dt%5Bsearch%5D%5Bregex%5D=false&filters=%7B%22has_enrollments%22%3A%5B%221%22%5D%7D&asof_start=05%2F21%2F2024&asof_finish=05%2F21%2F2025&include_enrollments_status=1&include_enrollments_status_counts=1&inclusion_tags_all=1&exclusion_tags_all=1&__sp_window_id__=205319750&__csrf_token__=MEf6AmSvYvU-VPwfcAHrL3YtYGfHPRswXifgm-DeeZBXhsI0QpmYCPdG89YuCwZ3QI9z-fCXhh-IiiovaKkWisdd&lform=1',
            method: 'POST',
        });
        const { returnJSON } = await response.json();
        console.log(returnJSON);
        return returnJSON.dt.data;
    }
    catch (e) {
        console.error(e);
        return [];
    }
}
const mergeStudentsAndSIS = (students, sis) => {
    return students.map((student) => {
        const sisStudent = sis.find((s) => s.entity_district_id.toString() === student.sis_user_id);
        return { ...student, sis: sisStudent };
    });
};
async function fetchAll() {
    const students = [];
    const teachers = [];
    for (let i = 1; i <= 120; i++) {
        console.log('step:', i);
        try {
            const students_data = await fetchStudents(i.toString());
            students.push(...students_data);
            const teachers_data = await fetchTeachers(i.toString());
            teachers.push(...teachers_data);
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
        catch (error) {
            console.error(error);
        }
    }
    const sis = await fetchSISS();
    const studentsWithSIS = mergeStudentsAndSIS(students, sis);
    const filteredStudents = studentsWithSIS.filter((student) => !teachers.some((teacher) => teacher.id === student.id));
    writeFileSync('students.json', JSON.stringify(filteredStudents, null, 2));
    writeFileSync('teachers.json', JSON.stringify(teachers, null, 2));
}
fetchAll();
//# sourceMappingURL=students.js.map