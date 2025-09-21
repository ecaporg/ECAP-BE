"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { writeFileSync, readFileSync } = require('fs');
const COURSE_FILE = 'courses-filtered.json';
const course_ids = JSON.parse(readFileSync(COURSE_FILE, 'utf8')).map((c) => c.id);
async function fetchAssignments(courseId) {
    const response = await fetch(`https://eliteaa.instructure.com/api/v1/courses/${courseId}/assignment_groups?exclude_assignment_submission_types%5B%5D=wiki_page&exclude_response_fields%5B%5D=description&exclude_response_fields%5B%5D=rubric&include%5B%5D=assignments&include%5B%5D=discussion_topic&include%5B%5D=all_dates&include%5B%5D=module_ids&override_assignment_dates=false&per_page=50`, {
        headers: {
            accept: 'application/json+canvas-string-ids, application/json',
            'accept-language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
            'if-none-match': 'W/"da99f58a2c08a6f197ce693b1a63abce"',
            priority: 'u=1, i',
            'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
            cookie: '_ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; log_session_id=8bc2847f9636ddfa777795e807ac65a4; canvas_session=N3A1-yc9Mn1Qpew8IuSbdg+Lx72dRH1Fk3zsD-is2oIFfhwrbaSWOMbksj7S5hKh7m-MhkjSN7DRLtKBZvKtpIE6uaIS8Dw0VjirqeSbc307Raqg5Rd3QOAHO9fOf934n_4Czev-29Ko-Yh_L0jCANoTZ40_7c-mFOUCECj5nlFBO7yIzHEs8M3BdGP3dB3AWJm-eGsiymB7zjKeu6t6XMbUajELpY1W3FXh-_CVsZHrlLv1xUAEP7LRFUFbiqiBsMoc9w3UftTfflJXYXLwkQ5yyHHPiKYzxCzuQPPegW99WY2BXm1oC9mZa3BFKNB8sd8xLKbdFQB7D4YYR06nOypcRzanJ0ijKhcpmP1EHRhAzVPn_u7K7ZbzZt3wVin771Ea-35EWfmyaY21Yd5rXsHBknYtljUOi0CQLcSauu8ew.csef-bVbyK6JI9eO-P3oMU6KjQo.aMbQ6Q; _csrf_token=4LwXIco6u77vZydf1AB1qwnAPHkdNjFKzXClDzuyjkyFjVZqiAj%2BiakDE2uBUxfka5hKFX5fQ3iFCtV1bIvbOg%3D%3D',
            Referer: `https://eliteaa.instructure.com/courses/${courseId}/assignments`,
            'Referrer-Policy': 'no-referrer-when-downgrade',
        },
        body: null,
        method: 'GET',
    });
    const data = (await response.json());
    const assignments = data.flatMap((item) => item.assignments);
    if (!Array.isArray(assignments) || assignments.length === 0) {
        console.error(`No assignments found for course ${courseId}`);
    }
    else {
        console.log(`Found ${assignments.length} assignments for course ${courseId}`);
    }
    return Array.isArray(assignments) ? assignments : [];
}
function saveAssignments(assignments) {
    writeFileSync('assignments.json', JSON.stringify(assignments, null, 2));
}
async function fetchAllAssignments() {
    const assignments = [];
    for (const courseId of course_ids) {
        try {
            assignments.push(...(await fetchAssignments(courseId)));
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
        catch (error) {
            console.error(error);
        }
    }
    saveAssignments(assignments);
}
fetchAllAssignments();
//# sourceMappingURL=assignments.js.map