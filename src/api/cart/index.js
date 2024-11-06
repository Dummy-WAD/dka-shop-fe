import axiosInstance from "../../utils/axios";

const getAllProductsInCart = () => {
  return axiosInstance.get(`/customer/carts`);
};
const removeProductFromCart = (id) => {
  const data = {
    productVariantId: id,
  };
  return axiosInstance.delete(`/customer/carts`, {
    data,
  });
};

const editCartItemQuantity = (data) => {
  return axiosInstance.patch(`/customer/carts`, data);
};

const addProductToCart = (config) => {
  return axiosInstance.post(`/customer/carts`, config)
};

const getTotalCartItems = () => {
  return axiosInstance.get(`/customer/carts/count`);
};
export {
  getAllProductsInCart,
  removeProductFromCart,
  editCartItemQuantity,
  getTotalCartItems,
  addProductToCart
};
