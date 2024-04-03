// import { toast } from "react-toastify";

import { notification } from "antd";

export const handleSuccess = (success, successMessage) => {
  const successRes = success;
  const status = !!successRes && successRes.status;

  const successMsg = !!successRes && !!successRes.data && successMessage;

  // status === 200 && toast.success(successMsg, { toastId: successMsg });
  if (status === 200) {
    () => {
      notification.error({
        message: successMsg,
        duration: 2,
        rtl: true,
      });
    };
  }
};
