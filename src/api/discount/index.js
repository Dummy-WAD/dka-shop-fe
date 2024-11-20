import axiosInstance from "../../utils/axios";

const handleGetProductListAppliedByDiscount = (discountId, params) => {
  return axiosInstance.get(`/admin/discounts/products/${discountId}`, {
    params
  });
}

const handleGetDiscountDetail = (discountId) => {
    return axiosInstance.get(`/admin/discounts/${discountId}`)
}

const handleGetProductByDiscount = (discountId, params) => {
    return axiosInstance.get(`/admin/discounts/${discountId}/applied-products`, {params});
}

const revokeDiscount = (discountId, productId) => {
    const data = {productId}
    return axiosInstance.delete(`/admin/discounts/${discountId}/applied-products`, {data} );
}

const applyDiscount = (discountId, listProductId) => {
    return axiosInstance.post(`/admin/discounts/${discountId}/applied-products`, {productIds: listProductId} );
}

export {
    handleGetProductListAppliedByDiscount,
    handleGetDiscountDetail,
    handleGetProductByDiscount,
    revokeDiscount,
    applyDiscount,
}