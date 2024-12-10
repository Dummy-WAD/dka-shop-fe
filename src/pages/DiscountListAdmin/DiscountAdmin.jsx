import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import classes from "./DiscountAdmin.module.css";
import { CategoryIcon } from "../../icon/Icon";
import TableDiscountAdmin from "../../components/Discount/TableDiscountAdmin";
import {
  getAllDiscountsForAdmin,
  deleteDiscountById,
} from "../../api/discount/index";
import {
  setListDiscountInfo,
  setIdSelected,
  setCurrentDiscountSelected,
} from "../../redux/slice/discountSlice";
import SearchInput from "../../components/SearchInput/SearchInput";
import DateInput from "../../components/DateInput/DateInputPro";
import DeleteModal from "../../components/Modal/DeleteModal";
import moment from "moment";
import { toast } from "react-toastify";
import { Add } from "@mui/icons-material";
import NewDiscount from "../../components/Discount/NewDiscount";
import ModalCustom from "../../components/Modal/BasicModal";
import { useBoolean } from "../../hook/useBoolean";
import EditDiscount from "../../components/Discount/EditDiscount";

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
    status,
    totalResults,
    totalPages,
    startDate,
    expirationDate,
    idSelected,
  } = useSelector((state) => state.discount);
  const refInput = useRef(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const editDiscountModal = useBoolean();

  const handleViewDelete = (discountId) => {
    setIsOpenDelete(true);
    dispatch(setIdSelected(discountId));
  };

  const handleViewEdit = (item) => {
    editDiscountModal.setTrue();
    dispatch(setCurrentDiscountSelected(item));
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
        status,
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
    dispatch(
      setListDiscountInfo({
        type: type === "All type" ? "" : type,
        page: 0,
      })
    );
  };

  const handleSetDiscountByStatus = (status) => {
    dispatch(
      setListDiscountInfo({
        status: status === "All status" ? "" : status,
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
          status: "",
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
    status,
    startDate,
    expirationDate,
    isOpenCreate,
  ]);

  return (
    <>
      <div className={classes.main_title}>
        <div className={classes.title_page}>
          <CategoryIcon className={classes.icon_style} />
          <p>DISCOUNT</p>
        </div>
        <div className={classes.action}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="status-select-label">Status</InputLabel>
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
              labelId="status-select-label"
              id="status-select"
              label="status"
              value={status === "" ? "All status" : status}
              onChange={(e) => handleSetDiscountByStatus(e.target.value)}
            >
              <MenuItem value="All status">All status</MenuItem>
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="EXPIRED">Expired</MenuItem>
            </Select>
          </FormControl>
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
          <Button
            variant="contained"
            sx={{ backgroundColor: "var(--admin-color)", color: "#FFF" }}
            startIcon={<Add />}
            onClick={() => setIsOpenCreate(true)}
          >
            Create
          </Button>
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
          handleViewEdit={handleViewEdit}
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
      {isOpenCreate && (
        <ModalCustom
          isOpen={isOpenCreate}
          handleClose={() => setIsOpenCreate(false)}
        >
          <NewDiscount handleClose={() => setIsOpenCreate(false)} />
        </ModalCustom>
      )}
      <ModalCustom
        isOpen={editDiscountModal.value}
        handleClose={editDiscountModal.setFalse}
      >
        <EditDiscount
          handleClose={editDiscountModal.setFalse}
          fetchDataDiscount={fetchDataDiscount}
        />
      </ModalCustom>
    </>
  );
};

export default DiscountAdmin;
