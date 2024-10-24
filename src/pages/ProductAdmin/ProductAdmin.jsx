import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import classes from "./ProductAdmin.module.css";
import { CategoryIcon, SearchIcon } from "../../icon/Icon";
import TableProductAdmin from "../../components/Product/TableProductAdmin";
import { getAllProductForAdmin, deleteProductById } from "../../api/product/index";
import { setListProductInfo, setIdSelected } from "../../redux/slice/productSlice";
import DeleteModal from "../../components/Modal/DeleteModal";
import { toast } from "react-toastify";
import SearchInput from "../../components/SearchInput/SearchInput";

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
    idSelected,
  } = useSelector((state) => state.product);
  const refInput = useRef(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleViewDelete = (productId) => {
    setIsOpenDelete(true);
    dispatch(setIdSelected(productId));
  }

  const handleClose = () => setIsOpenDelete(false);

  const handleDeleteProduct = async () => {
    try{
      await deleteProductById(idSelected);
      toast.success("Delete product successfully",{
        autoClose: 3000,
      });
      fetchDataProduct();
    } catch (err){
      toast.error(err.response.data.message,{
        autoClose: 3000,
      });
    }
    handleClose();
  }

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
        page: 0,
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
          <p>PRODUCT</p>
        </div>
        <div className={classes.search_create}>
          <SearchInput 
            placeholder="Search"
            inputRef={refInput}
            onSearch={handleSearchProduct}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "var(--admin-color)", color: "#FFF" }}
            startIcon={<Add />}
          >
            Create
          </Button>
        </div>
      </div>
      <div>
        <TableProductAdmin
          data={dataProducts}
          page={page}
          rowsPerPage={limit}
          totalResults={totalResults}
          handleSetOrderBy={handleSetOrderBy}
          handleViewDelete={handleViewDelete}
        />
      </div>
      {isOpenDelete &&
        <DeleteModal 
          isOpen={isOpenDelete} 
          handleClose={handleClose} 
          onSubmit={handleDeleteProduct} 
          title="Delete product"
          description="Are you sure delete this product ?"
        />
      }
    </>
  );
};

export default ProductAdmin;
