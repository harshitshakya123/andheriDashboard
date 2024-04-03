import { message } from "antd";
import { errorMessage } from "../utils/constant";

export const handleFailure = async (err) => {
  const errorRes = err.response;
  const status = !!errorRes && errorRes.status;
  // const errorMSg = !!errorRes && !!errorRes.data && errorRes.data.message;
  if (navigator.onLine) {
    if (status === 401) {
      localStorage.clear();
      message.error("Token is expired !!");
      // setTimeout(() => {
      //   window.location.href = "/login";
      // }, 1000);
    }
    if (errorMessage[status]) {
      message.error(errorMessage[status]);
    }
  } else {
    message.info("Please check your internet connection !!");
  }
};

export default handleFailure;
