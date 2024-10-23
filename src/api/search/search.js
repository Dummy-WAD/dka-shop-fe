import axiosInstance from "../../utils/axios";

const getListProducts = (config) => {
  const { page, priceStart, priceEnd, searchText, filterCategory, sortBy, orderDirection, limit } = config;
  return axiosInstance.get(`/customer/products?name=${searchText}
    ${filterCategory && filterCategory !== "all" ? `&categoryId=${filterCategory}` : ""}
    &priceStart=${priceStart}
    &priceEnd=${priceEnd}
    &page=${page}
    &limit=${limit}
    ${sortBy ? `&sortBy=${sortBy}&order=${orderDirection}` : ""}
  `);
};

export { getListProducts };