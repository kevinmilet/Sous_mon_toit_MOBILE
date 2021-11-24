const API_URL = {
    api_url: 'http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/',
    login: 'login/staff',
    logout: 'api/c/logout',
    me: 'api/c/me',
    refresh: 'api/c/refresh',
    estates: 'estates',
    estates_types: 'estates_types',
    staff: 'staff',
    customer: 'customer',
    customer_search: 'customer_search/c',
    customer_search_all: 'customer_search/c/customer',
    customers_types: 'customer_type',
    estates_pictures: 'estates_pictures',
    estates_cover: 'estates_pictures/cover',
    search: 'estates/search',
    staff_aptmt: 'schedule/staff',
    customer_aptmt: 'schedule/customer',
    create_aptmt: 'schedule/createAppt',
    update_aptmt: 'schedule/update',
    delete_aptmt: 'schedule/delete',
    aptmt_types: 'schedule/appointmentsTypes',
    show_aptmt: 'schedule',
    today_s_aptmts: 'schedule/today_staff',
    today_c_aptmts: 'schedule/today_customer'
}

export default API_URL;