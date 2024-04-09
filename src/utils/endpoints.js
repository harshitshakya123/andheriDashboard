export const GET_GAME_LIST_URL = `/game/gameDetails`;
export const CREATE_ADMIN_USER_URL = `/admin/create`;
export const FORGOT_PASSWORD_URL = `/admin/forget-password?email=`;
export const RESET_PASSWORD_URL = `/admin/reset-password`;

//user
export const LOGIN_URL = `api/v1/users/login`;
export const LOGIN_OUT = `api/v1/users/logout`;
export const GET_USER_LIST_URL = `api/v1/users/getUsers`;
export const GET_USER_DATA_URL = `api/v1/users/getUser?id=`;
export const GET_DASHBOARD_LIST_URL = `api/v1/users/dashboard`;
export const ADMIN_EDIT_DETAILS_URL = `api/v1/users/edit-user`;

//bids
export const GET_BIDS_LIST_URL = `api/v1/bids/get`;
export const GET_BIDS_CHART_URL = `api/v1/bids/bids-chart`;
export const UPDATE_PAYMENT_STATUS_URL = `api/v1/payment/approve`;
export const ADD_BID_URL = `api/v1/bids/add`;

//payment
export const GET_PAYMENT_LIST_URL = `api/v1/payment/get`;

export const GET_Agent_LIST_URL = `/users/getAgent`;
export const UPDATE_USER_STATUS_URL = `/users/active-deactive/`;
export const UPDATE_USER_URL = `/users/update/`;
export const USER_CONFIG_URL = `/game/game-level`;
export const GET_USER_FOLLOWER_URL = `/users/followers`;
export const GET_USER_FOLLOWING_URL = `/users/following`;
export const UPDATE_USER_iMAGE_URL = `/users/update-image/`;
export const REMOVE_USER_IMAGE_URL = `/users/remove-image/`;

//store
export const UPDATE_STORE_URL = `/store/update/`;
export const UPDATE_STORE_STATUS_URL = `/store/active-deactive/`;
export const STORE_DETAILS_URL = `/store/storeDetails?id=`;
export const GET_STORE_CATALOG_URL = `/storecatalog/store-catalog/`;
export const UPLOAD_STORE_CATALOG_URL = `/storecatalog/upload-excel/`;
export const UPDATE_STORE_CATALOG_IMAGE_URL = `/storecatalog/update-image`;
export const REMOVE_STORE_CATALOG_IMAGE_URL = `/storecatalog/remove-catalog-image`;
export const REMOVE_STORE_CATALOG_BY_ID_URL = `/storecatalog/delete-document/`;

//mediaverse
export const GET_MEDIA_VERSE_LIST_URL = `/mediaverse/images`;
export const DELETE_MEDIA_CARD_URL = `/mediaverse/delete/`;
export const ADD_MEDIA_CARD_URL = `/mediaverse/upload`;
export const GET_MEDIA_CONFIG_URL = `/mediaverse/media-conf`;
export const UPDATE_MEDIA_STATUS_URL = `/mediaverse/active-deactive`;

//game
export const ADD_GAME_URL = `/game/gameDetails_created`;
export const UPDATE_GAME_URL = `/game/update-game/`;
export const DELETE_GAME_CARD_URL = `/game/delete/`;
export const GAME_CARD_LOGS_URL = `/game/logs/`;

//sns
export const GET_LEADER_BOARD_URL = `/events/leaderboard/`;
export const GET_TIME_LINE_URL = `/events/event-timeline-admin/`;
export const UPDATE_TIME_LINE_STATUS_URL = `/events/active-deactive-post/`;
export const GET_EVENT_LIST_URL = `/events`;
// export const CREATE_EVENT_URL = `/events/create`;
export const ADD_SNS_CARD_URL = `/events/create`;
export const UPDATE_SNS_STATUS_URL = `/events/active-deactive/`;
export const UPDATE_EVENT_URL = `/events/report-count`;

// get store
export const GET_STORE_LIST_URL = `/store/`;

//advertisement
export const GET_ADVERTISE_URL = `/advertisement`;
export const ADD_ADVERTISE_URL = `/advertisement/upload`;
export const UPDATE_STATUS_ADVERTISE_URL = `/advertisement`;

//roles
export const GET_USERS_URL = `/admin/users`;
export const APPROVE_USER_URL = `/admin/approve-user/`;
export const GET_ROLES_URL = `/admin/roles`;
export const UPDATE_USER_STATUS_ADMIN_URL = `/admin/active-deactive/`;

//points
export const GET_POINTS_URL = `/statement?user_id=`;

//announcement
export const GET_ANNOUNCEMENT_URL = `/notification/announcement`;
export const CREATE_ANNOUNCEMENT_URL = `/notification/announcement`;
