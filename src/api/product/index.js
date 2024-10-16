import axiosInstance from "../../utils/axios";
const getAllProductForAdmin = (config) => {
  const { name, sortBy, order, page, limit } = config;
  return axiosInstance.get(
    `/admin/products?page=${page}&limit=${limit}${
      sortBy ? `&sortBy=${sortBy}&order=${order}` : ""
    }${name ? `&name=${name}` : ""}`
  );
};
export { getAllProductForAdmin };