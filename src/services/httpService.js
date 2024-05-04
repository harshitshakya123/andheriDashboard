import axios from "axios";
let BASE_URL = "";

if (window.location.hostname === "localhost") {
  // BASE_URL = "http://localhost:8000";
  BASE_URL = "https://api.andherisupersatta.com";
} else {
  BASE_URL = import.meta.env.VITE_BASE_URL;
}
const httpService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || BASE_URL,
});

httpService.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
export default httpService;
