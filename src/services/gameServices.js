import {
  GET_Agent_LIST_URL,
  GET_GAME_LIST_URL,
  GET_STORE_MANAGEMENT_LIST_URL,
  UPDATE_STORE_URL,
  GET_USER_LIST_URL,
  UPDATE_USER_STATUS_URL,
  UPDATE_USER_URL,
  GET_MEDIA_VERSE_LIST_URL,
  ADD_GAME_URL,
  UPDATE_GAME_URL,
  DELETE_MEDIA_CARD_URL,
  GET_MEDIA_CONFIG_URL,
  ADD_MEDIA_CARD_URL,
  DELETE_GAME_CARD_URL,
  GET_EVENT_LIST_URL,
  GET_LEADER_BOARD_URL,
  UPDATE_MEDIA_STATUS_URL,
  CREATE_EVENT_URL,
  GET_STORE_LIST_URL,
  ADD_SNS_CARD_URL,
  UPDATE_SNS_STATUS_URL,
  GAME_CARD_LOGS_URL,
  USER_CONFIG_URL,
  GET_ADVERTISE_URL,
  ADD_ADVERTISE_URL,
  UPDATE_STATUS_ADVERTISE_URL,
  UPDATE_EVENT_URL,
} from "../utils/endpoints";
import { handleFailure } from "../utils/handleFailure";
import httpService from "./httpService";

const gameService = {
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
  getStoreManagementList: async () => {
    try {
      const response = await httpService.get(GET_STORE_MANAGEMENT_LIST_URL);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  getMediaVerseList: async () => {
    try {
      const response = await httpService.get(GET_MEDIA_VERSE_LIST_URL);
      return response.data;
    } catch (err) {
      handleFailure(err);
    }
  },
  updateUserStatus: async (payload) => {
    try {
      const url = UPDATE_USER_STATUS_URL + payload.id;
      const data = {
        status: +payload.status,
      };
      const response = await httpService.put(url, data);
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

      const file = new File([blobData], `image.jpg${Date.now()}`, { type: "image/jpeg" });

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
        max_label: payload?.max_label,
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
  createSNSCard: async (payload) => {
    try {
      const formData = new FormData();
      const response = await fetch(payload?.file);
      const blobData = await response.blob();

      const file = new File([blobData], `image.jpg${Date.now()}`, { type: "image/jpeg" });
      console.log("image", file);
      formData.append("name", payload?.name);
      formData.append("description", payload?.description);
      formData.append("start_date", payload?.start_date);
      formData.append("end_date", payload?.end_date);

      const result = await httpService.post(CREATE_EVENT_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return result;
    } catch (err) {
      handleFailure(err);
    }
  },
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
    console.log("payload", payload);
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
        const file = new File([blobData], `image.jpg${Date.now()}`, { type: "image/jpeg" });
        formData.append("file", file);
      } else {
        const file = new File([blobData], `video.jpg${Date.now()}`, { type: "video/mp4" });
        formData.append("file", file);
      }

      formData.append("type", payload?.type);
      formData.append("caption", payload?.caption);
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

      const file = new File([blobData], `image.jpg${Date.now()}`, { type: "image/jpeg" });
      console.log("file", file);

      formData.append("image", file);
      formData.append("name", payload?.storeName);
      formData.append("pdf", payload?.selectedPdf);
      formData.append("description", payload?.content);
      formData.append("start_date", payload?.startDate);
      formData.append("end_date", payload?.endDate);
      formData.append("store_id", payload?.id?.storeId);
      console.log("pass store id", payload?.id?.storeId);

      const result = await httpService.post(ADD_SNS_CARD_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return result;
    } catch (err) {
      handleFailure(err);
      console.log(err);
    }
  },
};

export default gameService;
