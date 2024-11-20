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

const handleGetProductListAppliedByDiscount = (discountId, params) => {
  return axiosInstance.get(`/admin/discounts/products/${discountId}`, {
    params
  });
}

const handleGetDiscountDetail = (discountId) => {
    return axiosInstance.get(`/admin/discounts/${discountId}`)
}

export {
    handleGetProductListAppliedByDiscount,
    handleGetDiscountDetail,
    getAllDiscountsForAdmin, 
    deleteDiscountById
}

