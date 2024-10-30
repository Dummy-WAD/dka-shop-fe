import axiosInstance from "../../utils/axios";

const getCustomerAddresses = () => {
    return axiosInstance.get('customer/addresses')
}

const getProvinces = () => {
    return axiosInstance.get('customer/addresses/provinces')
}

const getDistrictsByProvice = (provinceId) => {
    return axiosInstance.get(`customer/addresses/districts?provinceId=${provinceId}`)
}

const getWardsByDistrict  = (districtId) => {
    return axiosInstance.get(`customer/addresses/wards?districtId=${districtId}`)
}

const getAddressDetail = (addressId) => {
    return axiosInstance.get(`customer/addresses/${addressId}`)
}

const updateAdress = (addressId, config) => {
    return axiosInstance.patch(`customer/addresses${addressId}`, config)
}

export { getCustomerAddresses, getProvinces, getDistrictsByProvice, getWardsByDistrict, getAddressDetail, updateAdress }