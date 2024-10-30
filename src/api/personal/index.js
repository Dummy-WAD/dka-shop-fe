import axiosInstance from "../../utils/axios";

const handleUpdateProfileCustomer = (config) => {
  return axiosInstance.patch("/customer/personal/profile", config);
};

const handleChangePassword = (config) => {
  return axiosInstance.patch("/customer/personal/password", config);
};

export { handleUpdateProfileCustomer, handleChangePassword };
