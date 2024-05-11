//user
export const UPDATE_USER_URL = `/users/update/`;
export const LOGIN_URL = `api/v1/users/admin-login`;
export const LOGIN_OUT = `api/v1/users/logout`;
export const GET_USER_LIST_URL = `api/v1/users/getUsers`;
export const GET_USER_DATA_URL = `api/v1/users/getUser?id=`;
export const GET_DASHBOARD_LIST_URL = `api/v1/users/dashboard`;
export const ADMIN_EDIT_DETAILS_URL = `api/v1/users/edit-user`;
export const CREATE_ADMIN_USER_URL = `/api/v1/users/register`;
export const FORGOT_PASSWORD_URL = `/admin/forget-password?email=`;
export const RESET_PASSWORD_URL = `/admin/reset-password`;
export const USER_CHANGE_PASSWORD_URL = `/api/v1/users/admin-change-password`;
export const UPDATE_USER_STATUS_URL = `/api/v1/users/user-status`;

//bids
export const GET_BIDS_LIST_URL = `api/v1/bids/get`;
export const GET_BIDS_CHART_URL = `api/v1/bids/bids-chart`;
export const UPDATE_BIDS_CHART_URL = `api/v1/bids/update-bid-chart`;
export const CREATE_BIDS_CHART_URL = `api/v1/bids/create-bid-chart`;
export const UPDATE_PAYMENT_STATUS_URL = `api/v1/payment/approve`;
export const ADD_BID_URL = `api/v1/bids/add`;
export const CHECK_BIDS_STATUS_URL = `api/v1/bids/check-bid`;

//payment
export const GET_PAYMENT_LIST_URL = `api/v1/payment/get`;
export const APPROVE_PAYMENT_URL = `api/v1/payment/approve`;
export const DECLINE_PAYMENT_URL = `api/v1/payment/decline`;
