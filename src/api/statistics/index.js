import axiosInstance from "../../utils/axios";

const handleGetOrderStatistics = (params) => {
    return axiosInstance.get("/admin/statistics/orders", { params });
  };

export {handleGetOrderStatistics}