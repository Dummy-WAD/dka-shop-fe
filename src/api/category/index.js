import axiosInstance from "../../utils/axios";

const handleGetAllCategories = (page, limit, sortBy, order, name) => {
  return axiosInstance.get(
    `/admin/categories?page=${page}&limit=${limit}${
      sortBy ? `&sortBy=${sortBy}&order=${order}` : ""
    }${name ? `&name=${name}` : ""}`
  );
};

const handleCreateCategory = (name, description) => {
  return axiosInstance.post("/admin/categories", {
    name,
    description,
  });
};

const handleEditCategory = (categoryId, name, description) => {
  return axiosInstance.patch(`/admin/categories/${categoryId}`, {
    name,
    description,
  });
};

const handleDeleteCategory = (categoryId) => {
  return axiosInstance.delete(`/admin/categories/${categoryId}`);
};

const getAllCategoriesInCustomer = () => {
  return axiosInstance.get("/customer/categories");
};

const getDetailProductForCustomerById = (productId) => {
  return axiosInstance.get(`/customer/products/${productId}`);
};

const getBestSellerCategoriesForCustomer = (config) => {
  const { limit } = config;
  return axiosInstance.get(`/customer/categories/best-seller${limit ? `?limit=${limit}` : ''}`);
};

export { handleGetAllCategories, handleCreateCategory, handleEditCategory, handleDeleteCategory, getDetailProductForCustomerById, getAllCategoriesInCustomer, getBestSellerCategoriesForCustomer };