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
    return axiosInstance.patch(`customer/addresses/${addressId}`, config)
}

const setAsDefault = (addressId) => {
    return axiosInstance.patch(`customer/addresses/${addressId}/set-default`)
}

const createAddress = (config) => {
    return axiosInstance.post('customer/addresses', config)
}

const deleteAddress = (addressId) => {
    return axiosInstance.delete(`customer/addresses/${addressId}`)
}

export { getCustomerAddresses, getProvinces, getDistrictsByProvice, getWardsByDistrict, getAddressDetail, deleteAddress, createAddress, updateAdress, setAsDefault }