import axiosInstance from "../../utils/axios";

const getAllDiscountsForAdmin = (config) => {
  const {
    keyword,
    type,
    startDate,
    expirationDate,
    sortBy,
    discount,
    page,
    limit,
  } = config;
  return axiosInstance.get(
    `/admin/discounts?page=${page}&limit=${limit}${
      sortBy ? `&sortBy=${sortBy}&order=${discount}` : ""
    }${keyword ? `&keyword=${keyword}` : ""}${type ? `&type=${type}` : ""}${
      startDate ? `&startDate=${startDate}` : ""
    }${expirationDate ? `&expirationDate=${expirationDate}` : ""}`
  );
};

const deleteDiscountById = (discountId) => {
  return axiosInstance.delete(`/admin/discounts/${discountId}`);
};

export { getAllDiscountsForAdmin, deleteDiscountById };
