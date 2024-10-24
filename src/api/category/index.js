import axiosInstance from "../../utils/axios";

const token = localStorage.getItem('token')
const handleGetAllCategories = (page, limit, sortBy, order, name) => {
  return axiosInstance.get(`/admin/categories?page=${page}&limit=${limit}${sortBy ? `&sortBy=${sortBy}&order=${order}` : ""}${name ? `&name=${name}` : ""}`);
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
}

const getBestSellerCategoriesForCustomer = (config) => {
  const { limit } = config;
  return axiosInstance.get(`/customer/categories/best-seller${limit ? `?limit=${limit}` : ''}`);
};

export { handleGetAllCategories, handleCreateCategory, handleEditCategory, handleDeleteCategory, getAllCategoriesInCustomer, getBestSellerCategoriesForCustomer };
