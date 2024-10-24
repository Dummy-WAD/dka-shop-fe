import axiosInstance from "../../utils/axios";
const getAllProductForAdmin = (config) => {
  const { name, sortBy, order, page, limit } = config;
  return axiosInstance.get(
    `/admin/products?page=${page}&limit=${limit}${
      sortBy ? `&sortBy=${sortBy}&order=${order}` : ""
    }${name ? `&name=${name}` : ""}`
  );
};

const deleteProductById = (productId) => {
  return axiosInstance.delete(`/admin/products/${productId}`);
};

const getDetailProductForAdminById = (productId) => {
  return axiosInstance.get(`/admin/products/${productId}`);
};

const getDetailProductForCustomerById = (productId) => {
  return axiosInstance.get(`/customer/products/${productId}`);
};

const getBestSellerProductsForCustomer = (config) => {
  const { categoryId, limit } = config;
  return axiosInstance.get(`/customer/products/best-seller${categoryId ? `?categoryId=${categoryId}` : ''}${limit ? `&limit=${limit}` : ''}`);
};

export { getAllProductForAdmin, getDetailProductForAdminById, deleteProductById, getDetailProductForCustomerById, getBestSellerProductsForCustomer };
