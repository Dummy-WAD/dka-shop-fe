import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import classes from "./ProductAdmin.module.css";
import { CategoryIcon, SearchIcon } from "../../icon/Icon";
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
  const refInput = useRef(null);

  const fetchDataProduct = async () => {
    try {
      const response = await getAllProductForAdmin({
        name: search,
        page: page + 1,
        limit: limit,
        order: order,
        sortBy: sortBy,
      });

      if (response) {
        dispatch(
          setListProductInfo({
            dataProducts: response.results,
            page: response.page - 1,
            totalPages: response.totalPages,
            totalResults: response.totalResults,
          })
        );
      }
    } catch (error) {
      console.log("Failed to fetch data product: ", error);
    }
  };

  const handleSetOrderBy = (name) => {
    const orderTmp =
      name == sortBy ? (order === "desc" ? "asc" : "desc") : "asc";
    dispatch(
      setListProductInfo({
        sortBy: name,
        order: orderTmp,
        page: 0,
      })
    );
  };
  const handleSearchProduct = () => {
    dispatch(
      setListProductInfo({
        search: refInput.current.value.trim(),
      })
    );
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchProduct();
    }
  };

  useEffect(() => {
    refInput?.current?.addEventListener("keypress", handleKeyPress);
    return () => {
      refInput?.current?.removeEventListener("keypress", handleKeyPress);
      dispatch(
        setListProductInfo({
          dataProducts: [],
          page: 0,
          totalPages: null,
          totalResults: null,
          order: "",
          sortBy: "",
          search: "",
          limit: 10,
        })
      );
    };
  }, []);

  useEffect(() => {
    fetchDataProduct();
  }, [dispatch, page, totalPages, totalResults, order, sortBy, search]);

  return (
    <>
      <div className={classes.main_title}>
        <div className={classes.title_page}>
          <CategoryIcon className={classes.icon_style} />
          <p>Product</p>
        </div>
        <div className={classes.searchBar}>
          <input type="text" placeholder="Search..." ref={refInput} />
          <SearchIcon
            className={classes.searchIcon}
            onClick={handleSearchProduct}
          />
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
            handleSetOrderBy={handleSetOrderBy}
          />
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </>
  );
};

export default ProductAdmin;
