import axiosInstance from "../../utils/axios";

const handleGetCustomersForAdmin = (config) => {
  if (!config.order) delete config.order;
  if (!config.sortBy) delete config.sortBy;
  if (!config.keyword) delete config.keyword;
  return axiosInstance.get("/admin/customers", { params: config });
};

export { handleGetCustomersForAdmin };
