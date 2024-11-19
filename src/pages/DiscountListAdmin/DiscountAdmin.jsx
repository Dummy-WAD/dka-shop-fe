import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import classes from "./DiscountAdmin.module.css";
import { CategoryIcon } from "../../icon/Icon";
import TableDiscountAdmin from "../../components/Discount/TableDiscountAdmin";
import {
  getAllDiscountsForAdmin,
  deleteDiscountById,
} from "../../api/Discount/index";
import {
  setListDiscountInfo,
  setIdSelected,
} from "../../redux/slice/discountSlice";
import SearchInput from "../../components/SearchInput/SearchInput";
import DateInput from "../../components/DateInput/DateInputPro";
import DeleteModal from "../../components/Modal/DeleteModal";
import moment from "moment";
import { toast } from "react-toastify";

const DiscountAdmin = () => {
  const dispatch = useDispatch();
  const {
    dataDiscounts,
    page,
    limit,
    sortBy,
    discount,
    search,
    type,
    totalResults,
    totalPages,
    startDate,
    expirationDate,
    idSelected,
  } = useSelector((state) => state.discount);
  const refInput = useRef(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleViewDelete = (discountId) => {
    setIsOpenDelete(true);
    dispatch(setIdSelected(discountId));
  };

  const handleClose = () => setIsOpenDelete(false);

  const handleDeleteDiscount = async () => {
    try {
      await deleteDiscountById(idSelected);
      toast.success("Delete discount successfully", {
        autoClose: 3000,
      });
      fetchDataDiscount();
    } catch (err) {
      toast.error(err.response.data.message, {
        autoClose: 3000,
      });
    }
    handleClose();
  };

  const fetchDataDiscount = async () => {
    try {
      const response = await getAllDiscountsForAdmin({
        keyword: search,
        page: page + 1,
        limit,
        discount,
        sortBy,
        type,
        startDate,
        expirationDate,
      });
      if (response) {
        dispatch(
          setListDiscountInfo({
            dataDiscounts: response.results,
            page: response.page - 1,
            totalPages: response.totalPages,
            totalResults: response.totalResults,
          })
        );
      }
    } catch (error) {
      console.log("Failed to fetch discount data: ", error);
    }
  };

  const handleSetDiscountBy = (name) => {
    const discountTmp =
      name === sortBy ? (discount === "desc" ? "asc" : "desc") : "asc";
    dispatch(
      setListDiscountInfo({
        sortBy: name,
        discount: discountTmp,
        page: 0,
      })
    );
  };

  const handleSetDiscountByType = (type) => {
    console.log(type);
    dispatch(
      setListDiscountInfo({
        type: type === "All type" ? "" : type,
        page: 0,
      })
    );
  };

  const handleSearchDiscount = () => {
    dispatch(
      setListDiscountInfo({
        page: 0,
        search: refInput.current.value.trim(),
      })
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchDiscount();
    }
  };

  useEffect(() => {
    refInput?.current?.addEventListener("keypress", handleKeyPress);
    return () => {
      refInput?.current?.removeEventListener("keypress", handleKeyPress);
      dispatch(
        setListDiscountInfo({
          dataDiscounts: [],
          page: 0,
          totalPages: null,
          totalResults: null,
          discount: "",
          sortBy: "",
          search: "",
          limit: 10,
          type: "",
          startDate: "",
          expirationDate: "",
        })
      );
    };
  }, []);

  useEffect(() => {
    fetchDataDiscount();
  }, [
    dispatch,
    page,
    totalPages,
    totalResults,
    discount,
    sortBy,
    search,
    type,
    startDate,
    expirationDate,
  ]);

  return (
    <>
      <div className={classes.main_title}>
        <div className={classes.title_page}>
          <CategoryIcon className={classes.icon_style} />
          <p>Discount</p>
        </div>
        <div className={classes.action}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="status-select-label">Type</InputLabel>
            <Select
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  color: "#ccc",
                  borderColor: "#ccc",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  color: "#ccc",
                  borderColor: "#ccc",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ccc",
                  borderWidth: "1px",
                  color: "#ccc",
                },
              }}
              labelId="type-select-label"
              id="type-select"
              label="type"
              value={type === "" ? "All type" : type}
              onChange={(e) => handleSetDiscountByType(e.target.value)}
            >
              <MenuItem value="All type">All type</MenuItem>
              <MenuItem value="PRICE">Price</MenuItem>
              <MenuItem value="PERCENTAGE">Percentage</MenuItem>
            </Select>
          </FormControl>
          <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
            <DateInput
              id="fromDate"
              label="From"
              variant="outlined"
              color="var(--admin-color)"
              smallSize
              style={{ minWidth: "200px" }}
              onChange={(e) => {
                dispatch(
                  setListDiscountInfo({
                    page: 0,
                    startDate: e.target.value,
                  })
                );
              }}
              value={moment(startDate).format("DD/MM/YYYY")}
            />
            <DateInput
              id="toDate"
              label="To"
              variant="outlined"
              color="var(--admin-color)"
              smallSize
              style={{ minWidth: "200px" }}
              onChange={(e) => {
                dispatch(
                  setListDiscountInfo({
                    page: 0,
                    expirationDate: e.target.value,
                  })
                );
              }}
              value={moment(expirationDate).format("DD/MM/YYYY")}
            />
          </div>
          <div className={classes.search_create}>
            <SearchInput
              placeholder="Search"
              inputRef={refInput}
              onSearch={handleSearchDiscount}
            />
          </div>
        </div>
      </div>
      <div>
        <TableDiscountAdmin
          data={dataDiscounts}
          page={page}
          rowsPerPage={limit}
          totalResults={totalResults}
          handleSetDiscountBy={handleSetDiscountBy}
          handleViewDelete={handleViewDelete}
        />
      </div>
      {isOpenDelete && (
        <DeleteModal
          isOpen={isOpenDelete}
          handleClose={handleClose}
          onSubmit={handleDeleteDiscount}
          title="Delete discount"
          description="Are you sure delete this discount ?"
        />
      )}
    </>
  );
};

export default DiscountAdmin;
