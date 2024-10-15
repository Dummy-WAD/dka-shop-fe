import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import classes from "./ProductAdmin.module.css";
import { CategoryIcon } from "../../icon/Icon";
import TableProductAdmin from "../../components/Product/TableProductAdmin";
import { getAllProductForAdmin } from "../../api/product/index";
import { setListProductInfo } from "../../redux/slice/productSlice";

const ProductAdmin = () => {
  const dispatch = useDispatch();
  const {
    dataProducts,
    page,
    totalPages,
    totalResults,
    order,
    sortBy,
    search,
    limit,
  } = useSelector((state) => state.product);

  const fetchDataProduct = async () => {
    try {
      const response = await getAllProductForAdmin({
        name: search,
        page: page,
        limit: limit,
        order: order,
        sortBy: sortBy,
      });

      if (response) {
        dispatch(
          setListProductInfo({
            dataProducts: response.results,
            page: response.page,
            totalPages: response.totalPages,
            totalResults: response.totalResults,
          })
        );
      }

      console.log("Data product: ", response);
    } catch (error) {
      console.log("Failed to fetch data product: ", error);
    }
  };

  useEffect(() => {
    fetchDataProduct();
  }, [dispatch, page, totalPages, totalResults, order, sortBy]);

  return (
    <>
      <div className={classes.main_title}>
        <div className={classes.title_page}>
          <CategoryIcon className={classes.icon_style} />
          <p>Product</p>
        </div>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#000", color: "#FFF" }}
          startIcon={<Add />}
        >
          Create
        </Button>
      </div>
      <div>
        {dataProducts.length > 0 ? (
          <TableProductAdmin
            data={dataProducts}
            page={page}
            rowsPerPage={limit}
            totalResults={totalResults}
          />
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </>
  );
};

export default ProductAdmin;
