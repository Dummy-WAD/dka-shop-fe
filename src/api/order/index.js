import axiosInstance from "../../utils/axios";

const getAllOrder = (config) => {
  const { status, limit, page } = config;
  return axiosInstance.get(
    `/customer/orders?limit=${limit}&page=${page}${
      status ? `&status=${status}` : ""
    }`
  );
};

const getDetailOrderByCustomer = (id) => {
  return axiosInstance.get(`/customer/orders/${id}`);
};

const getAllOrdersForAdmin = (config) => {
  const { keyword, status, sortBy, order, page, limit } = config;
  return axiosInstance.get(
    `/admin/orders?page=${page}&limit=${limit}${
      sortBy ? `&sortBy=${sortBy}&order=${order}` : ""
    }${keyword ? `&keyword=${keyword}` : ""}${
      status ? `&status=${status}` : ""
    }`
  );
};

const getDetailOrderByAdmin = (id) => {
  return axiosInstance.get(`admin/orders/${id}`);
};

const changeStatusOrder = (id, data) => {
  return axiosInstance.patch(`/admin/orders/${id}`, data);
};

const cancelOrder = (id, data) => {
  return axiosInstance.patch(`/customer/orders/${id}/cancel`, data);
};
export {
  getAllOrder,
  getDetailOrderByCustomer,
  getAllOrdersForAdmin,
  getDetailOrderByAdmin,
  changeStatusOrder,
  cancelOrder,
};
