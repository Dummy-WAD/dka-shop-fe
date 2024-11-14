import axiosInstance from "../../utils/axios";

const handleGetOrderStatistics = (params) => {
  return axiosInstance.get("/admin/statistics/orders", { params });
};

const handleGetSoldTopProductsStatistics = (params) => {
  return axiosInstance.get("/admin/statistics/products/sold", { params });
}

const handleGetRevenueTopProductsStatistics = (params) => {
  return axiosInstance.get("/admin/statistics/products/revenue", { params });
}

const handleGetSoldTopCategoriesStatistics = (params) => {
  return axiosInstance.get("/admin/statistics/categories/sold", { params });
}

const handleGetRevenueTopCategoriesStatistics = (params) => {
  return axiosInstance.get("/admin/statistics/categories/revenue", { params });
}

const handleGetCustomerStatistics = (params) => {
  return axiosInstance.get("/admin/statistics/customers", { params });
};

export {
  handleGetOrderStatistics, 
  handleGetSoldTopProductsStatistics, 
  handleGetRevenueTopProductsStatistics,
  handleGetSoldTopCategoriesStatistics,
  handleGetRevenueTopCategoriesStatistics,
  handleGetCustomerStatistics,
}
