import axiosInstance from "../../utils/axios";

const handleGetOrderStatistics = (params) => {
  return axiosInstance.get("/admin/statistics/orders", { params });
};

const handleGetCustomerStatistics = (params) => {
  return axiosInstance.get("/admin/statistics/customers", { params });
};

export { handleGetOrderStatistics, handleGetCustomerStatistics };
