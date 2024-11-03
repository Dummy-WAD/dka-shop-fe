import axiosInstance from "../../utils/axios";

const getAllOrder = (config) => {
    const {status, limit, page} = config
    return axiosInstance.get(`/customer/orders?limit=${limit}&page=${page}${status ? `&status=${status}` : ""}`);
}

export {getAllOrder}