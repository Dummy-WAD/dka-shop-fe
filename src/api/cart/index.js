import axiosInstance from "../../utils/axios";

const getAllProductsInCart = (page, limit) => {
  if (page > 0)
    return axiosInstance.get(`/customer/carts?page=${page}&limit=${limit}`);
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
}
export { getAllProductsInCart, removeProductFromCart, editCartItemQuantity, addProductToCart };
