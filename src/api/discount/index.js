import axiosInstance from "../../utils/axios";

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
    handleGetDiscountDetail
}