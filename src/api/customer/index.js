import axiosInstance from "../../utils/axios";

const handleGetCustomersForAdmin = (config) => {
  if (!config.order) delete config.order;
  if (!config.sortBy) delete config.sortBy;
  if (!config.keyword) delete config.keyword;
  return axiosInstance.get("/admin/customers", { params: config });
};

const handleGetCustomerDetail = (customerId) => {
  return axiosInstance.get(`/admin/customers/${customerId}`)
}

const handleGetOrderByCustomer = (customerId, page, limit, order) => {
  return axiosInstance.get(`admin/orders/customers/${customerId}${page ? `?page=${page}` : ""}${limit ? `&limit=${limit}` : ""}${order ? `&sortBy=updatedAt&order=${order}` : ""}`)
}

export { handleGetCustomersForAdmin, handleGetCustomerDetail, handleGetOrderByCustomer }