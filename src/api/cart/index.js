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
export { getAllProductsInCart, removeProductFromCart, editCartItemQuantity };
