"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { readFileSync, writeFileSync } = require('fs');
function getTwoAssigmentPerPeriod() {
    const academicYear = {
        from: 2024,
        to: 2025,
    };
    const learningPeriods = [
        {
            start_date: new Date(academicYear.from, 6, 1),
            end_date: new Date(academicYear.from, 7, 3),
        },
        {
            start_date: new Date(academicYear.from, 7, 5),
            end_date: new Date(academicYear.from, 7, 27),
        },
        {
            start_date: new Date(academicYear.from, 7, 28),
            end_date: new Date(academicYear.from, 9, 4),
        },
        {
            start_date: new Date(academicYear.from, 9, 7),
            end_date: new Date(academicYear.from, 10, 22),
        },
        {
            start_date: new Date(academicYear.from, 11, 2),
            end_date: new Date(academicYear.to, 0, 17),
        },
        {
            start_date: new Date(academicYear.to, 0, 22),
            end_date: new Date(academicYear.to, 1, 14),
        },
        {
            start_date: new Date(academicYear.to, 1, 18),
            end_date: new Date(academicYear.to, 2, 21),
        },
        {
            start_date: new Date(academicYear.to, 2, 24),
            end_date: new Date(academicYear.to, 4, 3),
        },
        {
            start_date: new Date(academicYear.to, 4, 5),
            end_date: new Date(academicYear.to, 5, 10),
        },
    ].reverse();
    const allAssignments = JSON.parse(readFileSync('assignments.json', 'utf8'));
    const courseMap = new Map();
    const twoAssignmentsPerPeriodPerCourse = [];
    for (const assignment of allAssignments) {
        if (!assignment.course_id ||
            !assignment.due_at ||
            assignment.anonymize_students ||
            assignment.anonymous_submissions ||
            !assignment.published) {
            continue;
        }
        if (courseMap.has(assignment.course_id)) {
            courseMap.get(assignment.course_id).push(assignment);
        }
        else {
            courseMap.set(assignment.course_id, [assignment]);
        }
    }
    for (const course of courseMap.values()) {
        const sortedAssignments = course.sort((a, b) => {
            return new Date(b.due_at).getTime() - new Date(a.due_at).getTime();
        });
        for (const period of learningPeriods) {
            const firstAssignment = sortedAssignments.find((assignment) => {
                return new Date(assignment.due_at) <= period.end_date;
            });
            const secondAssignment = sortedAssignments.find((assignment) => {
                return (new Date(assignment.due_at) <= period.end_date &&
                    assignment.id !== firstAssignment?.id);
            });
            twoAssignmentsPerPeriodPerCourse.push(firstAssignment, secondAssignment);
        }
    }
    return twoAssignmentsPerPeriodPerCourse.filter(Boolean);
}
const twoAssignmentsPerPeriodPerCourse = getTwoAssigmentPerPeriod();
writeFileSync('assignments-filtered.json', JSON.stringify(twoAssignmentsPerPeriodPerCourse, null, 2));
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
            cookie: '_gcl_au=1.1.1130948627.1747650265; _ga=GA1.1.670803082.1747650265; _clck=ojvuj3%7C2%7Cfw1%7C0%7C1965; _fbp=fb.1.1747650265761.736434457114054295; __utmzz=utmccn=(not set); _mkto_trk=id:871-AUV-441&token:_mch-instructure.com-1261fb15c0ebbd00867a136414ae0516; _ga_75H5134F9J=GS2.1.s1747661704$o2$g0$t1747661707$j57$l1$h2147420910$diiMXZ1G3_saghptU3n3SRHgKOVfkwRg1DA; dpUseLegacy=false; log_session_id=c719f2d6a232c9c4f10bdfa3b8378ae3; _legacy_normandy_session=xCzX0ixcuSldSfh8WSpW2Q+4jIoW2MEmPSVqW-PFl90QwzyRdaCq3Kj0hEA0JMCR2Ua0t-I4U7ERFaze9l76zcKFmJ1JHeU5kAEYbmjMvWUH2NSXRxUHGXdKtzWN__HEDR_QeAbEAjV5vR5XAwipR7bShjU7-VtAtdlx90-EDzTF1J4bKc7UEC4dybVIjiP418VJ4XJKtV-uJ8MbLAwp-WEviGJcKCaNLvslcLMQeDMLhq4ZqNDEJD0-vK8a3CYLeUOvUC6dDJOax7NhQrnCS0n07KOsktgsiQ2GelNF_JRVlamam-qB5-LFbvOZq4SRMCBNgPrj6Owc8-HTExwqOTeXVxtGfUQAQR72ClO8Yix29CSFgrTGCN7SvYXem8pAlV5lyI7RtDUcUSJJDFEiMV_1m7BI6ePUNpIseBit9WWLQ.8FV0TlO46mcxs7Yk1GrDjHE5iaY.aD1URg; canvas_session=xCzX0ixcuSldSfh8WSpW2Q+4jIoW2MEmPSVqW-PFl90QwzyRdaCq3Kj0hEA0JMCR2Ua0t-I4U7ERFaze9l76zcKFmJ1JHeU5kAEYbmjMvWUH2NSXRxUHGXdKtzWN__HEDR_QeAbEAjV5vR5XAwipR7bShjU7-VtAtdlx90-EDzTF1J4bKc7UEC4dybVIjiP418VJ4XJKtV-uJ8MbLAwp-WEviGJcKCaNLvslcLMQeDMLhq4ZqNDEJD0-vK8a3CYLeUOvUC6dDJOax7NhQrnCS0n07KOsktgsiQ2GelNF_JRVlamam-qB5-LFbvOZq4SRMCBNgPrj6Owc8-HTExwqOTeXVxtGfUQAQR72ClO8Yix29CSFgrTGCN7SvYXem8pAlV5lyI7RtDUcUSJJDFEiMV_1m7BI6ePUNpIseBit9WWLQ.8FV0TlO46mcxs7Yk1GrDjHE5iaY.aD1URg; _csrf_token=J71Cf9IXMKDjg0mLPJadk%2F6PXfeHnkTpfskb63%2BOB31E63M6o3Z6yKzkPKRKxsWrqeQrsOrNPa4WhGmBE6VuCg%3D%3D',
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