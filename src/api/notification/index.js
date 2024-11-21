import axiosInstance from "../../utils/axios";

export const getNotificationsForAdmin = (userRole, params) => {
  if (userRole === "ADMIN") {
    return axiosInstance.get("/admin/notifications", {
      params: params,
    });
  } else
    return axiosInstance.get("/customer/notifications", {
      params: params,
    });
};
