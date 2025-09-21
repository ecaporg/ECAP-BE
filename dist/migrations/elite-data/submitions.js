"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { readFileSync, writeFileSync } = require('fs');
const twoAssignmentsPerPeriodPerCourse = JSON.parse(readFileSync('assignments-filtered.json', 'utf8'));
async function fetchSubmissions(courseId, assignmentId) {
    const response = await fetch(`https://eliteaa.instructure.com/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions?per_page=500`, {
        headers: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
            'if-none-match': 'W/"8492789d16cac66099c21b843e983a03"',
            priority: 'u=1, i',
            'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            cookie: '_ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; log_session_id=0bd5c548a039c8c51178776878cbce44; _csrf_token=4h287yuHlO%2BqriKzQzbIS7np7q7p0MJNJ5oHcLbrPKWvdvWuTtH6pv7DQMUrQ7oSyKyY9K%2BJtAVjz0M%2F8ZIO3A%3D%3D; canvas_session=mB9uNrB9gc4h08Jy87t7OA+_m0FdkQIh2XOBGmblr4VQHtknIu2iSg2AtFUf5QrP_l_OS3MM4UCZ0qYqfjzhDw95cPi4zaagmwCKF6okIHzcwj7ZHXw0NfpngnQ472BXtO7B-g_PCKo41IvWexFsqBgssdkHVvO6SzJn6tpdLq8xLPVlrxP4dXT1xRUci8kCBztasawt94CCEApYtfU7NfC_Ev9WCUGQfJnkXTcSK0kTQlNl5CNpGbu7_OZqm3o5qHUqtDe1T9ei7-TmIXMrhLOFVBxeDoJNfn91FDbtDhwvD1gqiJNP8uBGkDg-46X2eUIv_RmyNKZUwe9ixlk8crTEnxh7-mpw0bhG5joPxPHEhpowSv4qU29kDEcRGlnUB1WYq4blZIxYf67N1cqC0ZU_uGLvvezlxfzFWEOlrnL4g.teCxCetNV5FqtxvIDawCDOe0hoM.aM_Jww',
            Referer: `https://eliteaa.instructure.com/courses/${courseId}/assignments/${assignmentId}/submissions`,
            'Referrer-Policy': 'no-referrer-when-downgrade',
        },
        body: null,
        method: 'GET',
    });
    const data = await response.json();
    return data;
}
async function fetchAllSubmissions() {
    const submissions = [];
    for (const assignment of twoAssignmentsPerPeriodPerCourse) {
        console.log(assignment.course_id, assignment.id);
        try {
            submissions.push(await fetchSubmissions(assignment.course_id, assignment.id));
        }
        catch (error) {
            console.error(error);
        }
    }
    writeFileSync('submissions.json', JSON.stringify(submissions, null, 2));
}
fetchAllSubmissions();
//# sourceMappingURL=submitions.js.map