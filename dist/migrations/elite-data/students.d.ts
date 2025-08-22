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
    lc_name: 'Flex' | 'Virtual' | 'Homeschool';
    scope_title: 'mountainelite' | 'eliteaa';
    lccgradelevels_gradelevel: string | number;
};
