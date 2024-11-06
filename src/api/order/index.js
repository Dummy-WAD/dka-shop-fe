import axiosInstance from "../../utils/axios";

const getAllOrder = (config) => {
  const {status, limit, page} = config
  return axiosInstance.get(`/customer/orders?limit=${limit}&page=${page}${status ? `&status=${status}` : ""}`);
}

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

export { getAllOrder, getAllOrdersForAdmin };
