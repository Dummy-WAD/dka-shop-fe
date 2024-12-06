import axiosInstance from "../../utils/axios";

const getAllReviewOfProduct = (productId, params) => {
    const {rating} = params;
    if (rating === "all") delete params.rating;
    return axiosInstance.get(`/customer/reviews/products/${productId}`, {params});
};

const handleCreateReview = (body) => {
  return axiosInstance.post("/customer/reviews", body);
};

export { handleCreateReview, getAllReviewOfProduct };
