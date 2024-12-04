import axiosInstance from "../../utils/axios";

const getAllReviewOfProduct = (productId, params) => {
    return axiosInstance.get(`/customer/reviews/products/${productId}`, {params});
};

export {
    getAllReviewOfProduct
}