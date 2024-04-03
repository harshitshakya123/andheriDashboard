import handleFailure from "../utils/handleFailure";
import {
  CREATE_ADMIN_USER_URL,
  FORGOT_PASSWORD_URL,
  GET_DASHBOARD_LIST_URL,
  LOGIN_URL,
  RESET_PASSWORD_URL,
} from "../utils/endpoints";
import httpService from "./httpService";

const commonService = {
  login: async (payload) => {
    delete payload.remember;
    try {
      const response = await httpService.post(LOGIN_URL, payload);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getDashboard: async () => {
    try {
      const response = await httpService.get(GET_DASHBOARD_LIST_URL);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  adminRegister: async (payload) => {
    try {
      const response = await httpService.post(CREATE_ADMIN_USER_URL, payload);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  forgotRegister: async (email) => {
    try {
      const response = await httpService.get(FORGOT_PASSWORD_URL + email);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  resetPassword: async (payload) => {
    try {
      const response = await httpService.post(RESET_PASSWORD_URL, payload);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
};

export default commonService;
