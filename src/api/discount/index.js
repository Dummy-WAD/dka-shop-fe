import axiosInstance from "../../utils/axios";

const createDiscount = (data) => {
  return axiosInstance.post("/admin/discounts", data);
};

const getAllDiscountsForAdmin = (config) => {
  const {
    keyword,
    type,
    status,
    startDate,
    expirationDate,
    sortBy,
    discount,
    page,
    limit,
  } = config;

  const queryParams = new URLSearchParams({
    page,
    limit,
    ...(sortBy && { sortBy, order: discount }),
    ...(keyword && { keyword }),
    ...(type && { type }),
    ...(status && { status }),
    ...(startDate && { startDate }),
    ...(expirationDate && { expirationDate }),
  });

  return axiosInstance.get(`/admin/discounts?${queryParams.toString()}`);
};

const deleteDiscountById = (discountId) => {
  return axiosInstance.delete(`/admin/discounts/${discountId}`);
};

const handleGetProductListAppliedByDiscount = (discountId, params) => {
  return axiosInstance.get(`/admin/discounts/products/${discountId}`, {
    params,
  });
};

const handleGetDiscountDetail = (discountId) => {
  return axiosInstance.get(`/admin/discounts/${discountId}`);
};

const handleGetProductByDiscount = (discountId, params) => {
  const { keyword } = params;
  if (!keyword) delete params.keyword;
  return axiosInstance.get(`/admin/discounts/${discountId}/applied-products`, {
    params,
  });
};

const revokeDiscount = (discountId, productId) => {
  const data = { productId };
  return axiosInstance.delete(
    `/admin/discounts/${discountId}/applied-products`,
    { data }
  );
};

const applyDiscount = (discountId, listProductId) => {
  return axiosInstance.post(`/admin/discounts/${discountId}/applied-products`, {
    productIds: listProductId,
  });
};

const handleEditDiscount = (discountId, body) => {
  return axiosInstance.patch(`/admin/discounts/${discountId}`, body);
};

export {
  handleGetProductListAppliedByDiscount,
  handleGetDiscountDetail,
  getAllDiscountsForAdmin,
  deleteDiscountById,
  handleGetProductByDiscount,
  revokeDiscount,
  applyDiscount,
  handleEditDiscount,
  createDiscount,
};
