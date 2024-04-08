import {
  GET_Agent_LIST_URL,
  GET_GAME_LIST_URL,
  UPDATE_STORE_URL,
  UPDATE_STORE_STATUS_URL,
  GET_USER_LIST_URL,
  UPDATE_USER_URL,
  ADD_GAME_URL,
  UPDATE_GAME_URL,
  DELETE_MEDIA_CARD_URL,
  GET_MEDIA_CONFIG_URL,
  ADD_MEDIA_CARD_URL,
  DELETE_GAME_CARD_URL,
  GET_EVENT_LIST_URL,
  GET_LEADER_BOARD_URL,
  UPDATE_MEDIA_STATUS_URL,
  GET_STORE_LIST_URL,
  ADD_SNS_CARD_URL,
  UPDATE_SNS_STATUS_URL,
  GAME_CARD_LOGS_URL,
  USER_CONFIG_URL,
  GET_ADVERTISE_URL,
  ADD_ADVERTISE_URL,
  UPDATE_STATUS_ADVERTISE_URL,
  UPDATE_EVENT_URL,
  GET_USERS_URL,
  APPROVE_USER_URL,
  GET_ROLES_URL,
  UPDATE_USER_STATUS_ADMIN_URL,
  GET_USER_DATA_URL,
  GET_USER_FOLLOWER_URL,
  GET_USER_FOLLOWING_URL,
  UPDATE_USER_iMAGE_URL,
  REMOVE_USER_IMAGE_URL,
  STORE_DETAILS_URL,
  GET_POINTS_URL,
  GET_TIME_LINE_URL,
  UPDATE_TIME_LINE_STATUS_URL,
  ADMIN_EDIT_DETAILS_URL,
  GET_STORE_CATALOG_URL,
  UPLOAD_STORE_CATALOG_URL,
  GET_ANNOUNCEMENT_URL,
  CREATE_ANNOUNCEMENT_URL,
  UPDATE_STORE_CATALOG_IMAGE_URL,
  REMOVE_STORE_CATALOG_IMAGE_URL,
  REMOVE_STORE_CATALOG_BY_ID_URL,
  GET_BIDS_LIST_URL,
  GET_BIDS_CHART_URL,
  GET_PAYMENT_LIST_URL,
  UPDATE_PAYMENT_STATUS_URL,
  LOGIN_OUT,
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
  getAgentList: async () => {
    try {
      const response = await httpService.get(GET_Agent_LIST_URL);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getGameList: async () => {
    try {
      const response = await httpService.get(GET_GAME_LIST_URL);
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
  deleteMediaVerseCard: async (payload) => {
    try {
      const url = `${DELETE_MEDIA_CARD_URL}?id=${payload?.id}&type=${payload?.type}`;
      const response = await httpService.delete(url);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  updateStoreData: async (payload) => {
    try {
      const data = {
        name: payload?.name,
        level: payload?.lebel || payload?.level,
      };
      const response = await httpService.put(UPDATE_STORE_URL + payload?.id, data);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  updateStoreStatus: async (payload) => {
    try {
      const url = UPDATE_STORE_STATUS_URL + payload.id;
      const data = {
        status: +payload.status,
      };
      const response = await httpService.put(url, data);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getMediaConfig: async () => {
    try {
      const response = await httpService.get(GET_MEDIA_CONFIG_URL);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  addMediaCard: async (payload) => {
    try {
      const formData = new FormData();
      const response = await fetch(payload?.file);
      const blobData = await response.blob();

      const file = new File([blobData], `media${Date.now()}.jpg`, { type: "image/jpeg" });

      formData.append("file", file);
      formData.append("type", payload?.type);
      formData.append("content", payload?.content);

      const result = await httpService.post(ADD_MEDIA_CARD_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return result;
    } catch (err) {
      handleFailure(err);
    }
  },

  addGameData: async (payload) => {
    try {
      const data = {
        game_name: payload?.game_name,
        rounds: payload?.rounds,
        max_campaign_budget: payload?.max_campaign_budget,
        max_cashback: payload?.max_cashback,
        conversion_rate: payload?.conversion_rate,
        max_label: payload?.max_label,
        start_date: payload?.start_date,
        end_date: payload?.end_date,
        spent_budget: payload?.spent_budget,
        remaining_budget: payload?.remaining_budget,
        monthly_budget_limit: payload?.monthly_budget_limit,
        random_cashback_rate: payload?.random_cashback_rate,
        bumper: payload?.bumper,
        winning_probability: payload?.level || payload?.winning_probability,
      };
      const response = await httpService.post(ADD_GAME_URL, data);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  updateGameData: async (payload) => {
    try {
      const data = {
        game_name: payload?.game_name,
        rounds: payload?.rounds,
        max_campaign_budget: +payload?.max_campaign_budget,
        max_cashback: payload?.max_cashback,
        conversion_rate: payload?.conversion_rate,
        remaining_budget: payload?.remaining_budget,
        bumper: payload?.bumper,
        winning_probability: +payload?.level || +payload?.winning_probability,
      };
      const response = await httpService.put(UPDATE_GAME_URL + payload?.id, data);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  deleteGameCard: async (payload) => {
    try {
      const url = `${DELETE_GAME_CARD_URL}${payload?.id}`;
      const response = await httpService.delete(url);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },

  getSNSList: async (type) => {
    try {
      const url = `${GET_EVENT_LIST_URL}?type=${type}&&platform=${"admin"}`;
      const response = await httpService.get(url);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getLeaderBoardList: async (id) => {
    try {
      const response = await httpService.get(GET_LEADER_BOARD_URL + id);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getTimeLineList: async (id) => {
    try {
      const response = await httpService.get(GET_TIME_LINE_URL + id);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  updateTimeLineStatusList: async (payload) => {
    try {
      const response = await httpService.put(UPDATE_TIME_LINE_STATUS_URL + payload.id, { status: payload.status });
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  updateMediaCardStatus: async (payload) => {
    try {
      const url = `${UPDATE_MEDIA_STATUS_URL}?type=${payload?.type}&id=${payload?.id}&status=${
        payload.status == 0 ? 1 : 0
      }`;
      const response = await httpService.put(url);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  // createSNSCard: async (payload) => {
  //   try {
  //     const formData = new FormData();
  //     const response = await fetch(payload?.file);
  //     const blobData = await response.blob();

  //     const file = new File([blobData], `sns_image${Date.now()}.jpg`, { type: "image/jpeg" });
  //     console.log("image", file);
  //     formData.append("name", payload?.name);
  //     formData.append("description", payload?.description);
  //     formData.append("start_date", payload?.start_date);
  //     formData.append("end_date", payload?.end_date);

  //     const result = await httpService.post(CREATE_EVENT_URL, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     return result;
  //   } catch (err) {
  //     handleFailure(err);
  //   }
  // },
  getStoreList: async () => {
    try {
      const response = await httpService.get(GET_STORE_LIST_URL);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  updateSnsStatus: async (payload) => {
    try {
      const response = await httpService.put(UPDATE_SNS_STATUS_URL + payload?.id, {
        status: payload?.status === 0 ? 1 : 0,
      });
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getGameCardLogs: async (id) => {
    try {
      const response = await httpService.get(GAME_CARD_LOGS_URL + id);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getUserConfigLogs: async () => {
    try {
      const response = await httpService.get(USER_CONFIG_URL);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getSNSEventCount: async () => {
    try {
      const response = await httpService.get(UPDATE_EVENT_URL);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  updateSNSEventCount: async (payload) => {
    try {
      const response = await httpService.put(UPDATE_EVENT_URL, payload);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getAdvertisement: async () => {
    try {
      const response = await httpService.get(GET_ADVERTISE_URL);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  updateStatusAdvertisement: async (payload) => {
    const data = {
      status: payload?.status == 0 ? 1 : 0,
      id: payload?.id,
      type: payload.type,
    };
    try {
      const response = await httpService.put(UPDATE_STATUS_ADVERTISE_URL, data);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  addAdvertisement: async (payload) => {
    try {
      const formData = new FormData();

      const response = await fetch(payload?.file);
      const blobData = await response.blob();
      if (payload?.type === "image") {
        const file = new File([blobData], `advertise_image${Date.now()}.jpg`, { type: "image/jpeg" });
        formData.append("file", file);
      } else {
        const file = new File([blobData], `advertise_video${Date.now()}.jpg`, { type: "video/mp4" });
        formData.append("file", file);
      }

      formData.append("type", payload?.type);
      formData.append("caption", payload?.caption);
      formData.append("redirect_url", payload?.redirect_url);
      formData.append("language", payload?.language);

      const result = await httpService.post(ADD_ADVERTISE_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return result;
    } catch (err) {
      handleFailure(err);
    }
  },
  addSnsCard: async (payload) => {
    try {
      const formData = new FormData();
      const response = await fetch(payload?.file);
      const blobData = await response.blob();

      const file = new File([blobData], `sns_image${Date.now()}.jpg`, { type: "image/jpeg" });

      formData.append("image", file);
      formData.append("name", payload?.storeName);
      formData.append("pdf", payload?.selectedPdf);
      formData.append("description", payload?.content);
      formData.append("start_date", payload?.startDate);
      formData.append("end_date", payload?.endDate);
      formData.append("store_id", payload?.id?.storeId);

      const result = await httpService.post(ADD_SNS_CARD_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return result;
    } catch (err) {
      handleFailure(err);
    }
  },
  getUsers: async () => {
    try {
      const response = await httpService.get(GET_USERS_URL);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  approveUser: async (payload) => {
    try {
      const response = await httpService.put(APPROVE_USER_URL + payload?.id, payload);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getRoles: async () => {
    try {
      const response = await httpService.get(GET_ROLES_URL);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  updateUserStatusAdmin: async (payload) => {
    try {
      const response = await httpService.put(UPDATE_USER_STATUS_ADMIN_URL + payload?.id, payload);
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
  getUserFollowers: async (id, type, status = 1) => {
    try {
      const url = `${GET_USER_FOLLOWER_URL}?type=${type}&status=${status}&following_id=${id}`;
      const response = await httpService.get(url);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getUserFollowing: async (id, type, status = 1) => {
    try {
      const url = `${GET_USER_FOLLOWING_URL}?type=${type}&status=${status}&followers_id=${id}`;
      const response = await httpService.get(url);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  editUserImage: async (payload) => {
    try {
      const formData = new FormData();
      const file = new File([payload.file], `image.jpg${Date.now()}`, { type: "image/jpeg" });
      formData.append("file", file);

      formData.append("type", payload.type);
      const response = await httpService.put(UPDATE_USER_iMAGE_URL + payload.id, formData);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  deleteUserImage: async (id, type) => {
    try {
      const response = await httpService.put(REMOVE_USER_IMAGE_URL + id, { type: type });
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  storeDetails: async (id) => {
    try {
      const response = await httpService.get(STORE_DETAILS_URL + id);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getPoints: async (id) => {
    try {
      const response = await httpService.get(GET_POINTS_URL + id);
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
  getStoreCatalog: async (id) => {
    try {
      const response = await httpService.get(GET_STORE_CATALOG_URL + id);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  uploadStoreCatalog: async (payload) => {
    const formData = new FormData();
    const file = new File([payload.file], `spreadsheet.xlsx${Date.now()}`, {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    formData.append("file", file);

    try {
      const response = await httpService.post(UPLOAD_STORE_CATALOG_URL + payload.id, formData);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  updateStoreCatalogImage: async (payload) => {
    const formData = new FormData();
    const response = await fetch(payload?.image);
    const blobData = await response.blob();

    const file = new File([blobData], `catalog_image${Date.now()}.jpg`, { type: "image/jpeg" });

    formData.append("image", file);
    formData.append("storeId", payload.storeId);
    formData.append("catalogId", payload.catalogId);

    try {
      const response = await httpService.put(UPDATE_STORE_CATALOG_IMAGE_URL, formData);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  removeStoreCatalogImage: async (payload) => {
    try {
      const response = await httpService.put(REMOVE_STORE_CATALOG_IMAGE_URL, payload);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  removeStoreCatalogById: async (id) => {
    try {
      const response = await httpService.delete(REMOVE_STORE_CATALOG_BY_ID_URL + id);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getAnnouncement: async () => {
    try {
      const response = await httpService.get(GET_ANNOUNCEMENT_URL);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  createAnnouncement: async (payload) => {
    try {
      const formData = new FormData();

      if (payload?.file) {
        const response = await fetch(payload?.file);
        const blobData = await response.blob();
        const file = new File([blobData], `announcement${Date.now()}.jpg`, { type: "image/jpeg" });
        formData.append("file", file);
      }

      formData.append("title", payload?.title);
      formData.append("body", payload?.body);

      const result = await httpService.post(CREATE_ANNOUNCEMENT_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return result.data;
    } catch (err) {
      handleFailure(err);
    }
  },
};

export default apiService;
