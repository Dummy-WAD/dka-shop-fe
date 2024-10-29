import axiosInstance from "../../utils/axios";

const handleUpdateProfileCustomer = (config) => {
    return axiosInstance.patch('/customer/personal/profile', config);
}

export { handleUpdateProfileCustomer }