import axiosInstance from "../../utils/axios";

const token = localStorage.getItem('token')
const handleGetAllCategories = (page, limit, sortBy, order, name) => {
  console.log({page, limit, sortBy, order, name})
  return axiosInstance.get(`/admin/categories?page=${page}&limit=${limit}${sortBy ? `&sortBy=${sortBy}&order=${order}` : ""}&name=${name}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const handleCreateCategory = (name, description) => {
  return axiosInstance.post("/admin/categories", {
    name,
    description,
  },{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const handleEditCategory = (name, description) => {
  return axiosInstance.put("/admin/categories", {
    name,
    description,
  },{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const handleDeleteCategory = (categoryId) => {
  return axiosInstance.delete(`/admin/categories/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};


export { handleGetAllCategories, handleCreateCategory, handleEditCategory, handleDeleteCategory};
