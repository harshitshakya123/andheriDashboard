import {
  GET_USER_LIST_URL,
  GET_USER_DATA_URL,
  ADMIN_EDIT_DETAILS_URL,
  UPDATE_USER_URL,
  GET_BIDS_LIST_URL,
  GET_BIDS_CHART_URL,
  GET_PAYMENT_LIST_URL,
  UPDATE_PAYMENT_STATUS_URL,
  LOGIN_OUT,
  ADD_BID_URL,
} from "../utils/endpoints";
import { handleFailure } from "../utils/handleFailure";
import httpService from "./httpService";

const apiService = {
  getUserList: async () => {
    try {
      const response = await httpService.get(GET_USER_LIST_URL);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getBidsList: async (startDate, endDate) => {
    try {
      let url = GET_BIDS_LIST_URL;
      if (startDate) {
        url = `${url}?startDate=${startDate}`;
      }
      if (endDate) {
        url = `${url}&endDate=${endDate}`;
      }
      // const url = `${GET_BIDS_LIST_URL}?startDate=${startDate}&endDate=${endDate}`;
      const response = await httpService.get(url);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getBidsChart: async (startDate, endDate) => {
    try {
      let url = GET_BIDS_CHART_URL;
      if (startDate) {
        url = `${url}?startDate=${startDate}`;
      }
      if (endDate) {
        url = `${url}&endDate=${endDate}`;
      }
      const response = await httpService.get(url);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getAllPayment: async () => {
    try {
      const response = await httpService.get(GET_PAYMENT_LIST_URL);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  updatePaymentStatus: async (paymentId) => {
    try {
      const url = UPDATE_PAYMENT_STATUS_URL;
      const data = {
        paymentId,
      };
      const response = await httpService.post(url, data);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  logout: async () => {
    try {
      const response = await httpService.post(LOGIN_OUT);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  updateUserData: async (payload) => {
    try {
      const data = {
        first_name: payload?.first_name,
        // last_name: payload?.last_name,
        level: payload?.label || payload?.level,
      };
      const response = await httpService.put(UPDATE_USER_URL + payload?.id, data);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getUserDetailsAdmin: async (id) => {
    try {
      const response = await httpService.get(GET_USER_DATA_URL + id);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  updateAdminDetails: async (payload) => {
    try {
      const updatedPayload = {
        fullName: payload?.fullName,
      };
      const url = payload?.id ? `${ADMIN_EDIT_DETAILS_URL}?id=${payload?.id}` : ADMIN_EDIT_DETAILS_URL;
      const response = await httpService.patch(url, updatedPayload);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  addBid: async (payload) => {
    try {
      const response = await httpService.post(ADD_BID_URL, payload);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
};

export default apiService;
