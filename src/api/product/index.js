import axiosInstance from "../../utils/axios";
const getAllProductForAdmin = (config) => {
  const { name, sortBy, order, page, limit } = config;
  return axiosInstance.get(
    `/admin/products?page=${page}&limit=${limit}${
      sortBy ? `&sortBy=${sortBy}&order=${order}` : ""
    }&name=${name}`
  );

  // const data = {
  //   results: [
  //     {
  //       id: 1,
  //       name: "Sweater",
  //       price: 100000,
  //       description: "nooooo",
  //       categoryId: 1,
  //       isDeleted: false,
  //       createdAt: "2024-10-12T15:59:25.000Z",
  //       updatedAt: "2024-10-12T15:59:25.000Z",
  //       productImages: [
  //         {
  //           image: "url1",
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       name: "T-Shirt",
  //       price: 15000,
  //       description: "hahahah",
  //       categoryId: 1,
  //       isDeleted: false,
  //       createdAt: "2024-10-12T15:59:25.000Z",
  //       updatedAt: "2024-10-12T15:59:25.000Z",
  //       productImages: [],
  //     },
  //     {
  //       id: 3,
  //       name: "Jeans",
  //       price: 50000,
  //       description: "denim jeans",
  //       categoryId: 2,
  //       isDeleted: false,
  //       createdAt: "2024-10-12T15:59:25.000Z",
  //       updatedAt: "2024-10-12T15:59:25.000Z",
  //       productImages: [
  //         {
  //           image: "url3",
  //         },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       name: "Jacket",
  //       price: 120000,
  //       description: "winter jacket",
  //       categoryId: 2,
  //       isDeleted: false,
  //       createdAt: "2024-10-12T15:59:25.000Z",
  //       updatedAt: "2024-10-12T15:59:25.000Z",
  //       productImages: [],
  //     },
  //     {
  //       id: 5,
  //       name: "Sneakers",
  //       price: 80000,
  //       description: "comfortable sneakers",
  //       categoryId: 3,
  //       isDeleted: false,
  //       createdAt: "2024-10-12T15:59:25.000Z",
  //       updatedAt: "2024-10-12T15:59:25.000Z",
  //       productImages: [
  //         {
  //           image: "url5",
  //         },
  //       ],
  //     },
  //   ],
  //   page: 1,
  //   limit: 20,
  //   totalPages: 1,
  //   totalResults: 20,
  // };
  // return data;
};
export { getAllProductForAdmin };
