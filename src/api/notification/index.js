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

export const getTotalNotifications = (userRole) => {
  if (userRole === "ADMIN") {
    return axiosInstance.get("/admin/notifications/count");
  } else return axiosInstance.get("/customer/notifications/count");
};

export const markNotificationsAsRead = (userRole) => {
  if (userRole === "ADMIN") {
    return axiosInstance.patch("/admin/notifications/mark-as-read");
  } else return axiosInstance.patch("/customer/notifications/mark-as-read");
};
