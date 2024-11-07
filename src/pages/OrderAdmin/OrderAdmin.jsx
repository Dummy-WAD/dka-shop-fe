import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import classes from "./OrderAdmin.module.css";
import { CategoryIcon } from "../../icon/Icon";
import TableOrderAdmin from "../../components/Order/TableOrderAdmin";
import { getAllOrdersForAdmin } from "../../api/order/index";
import { setListOrderInfo } from "../../redux/slice/orderSlice";
import SearchInput from "../../components/SearchInput/SearchInput";
import { PENDING, PACKAGED, DELIVERING, COMPLETED } from "../../config/status";

const OrderAdmin = () => {
  const dispatch = useDispatch();
  const {
    dataOrders,
    page,
    limit,
    status = "PENDING",
    sortBy,
    order,
    search,
    totalResults,
    email,
    totalPages,
  } = useSelector((state) => state.orderSlice);

  const refInput = useRef(null);

  const fetchDataOrder = async () => {
    try {
      const response = await getAllOrdersForAdmin({
        keyword: search,
        page: page + 1,
        limit,
        order,
        sortBy,
        status,
        email,
      });
      if (response) {
        dispatch(
          setListOrderInfo({
            dataOrders: response.results,
            page: response.page - 1,
            totalPages: response.totalPages,
            totalResults: response.totalResults,
          })
        );
      }
    } catch (error) {
      console.log("Failed to fetch order data: ", error);
    }
  };

  const handleSetOrderBy = (name) => {
    const orderTmp =
      name === sortBy ? (order === "desc" ? "asc" : "desc") : "asc";
    dispatch(
      setListOrderInfo({
        sortBy: name,
        order: orderTmp,
        page: 0,
      })
    );
  };

  const handleSetOrderByStatus = (status) => {
    dispatch(
      setListOrderInfo({
        status: status === "All status" ? "" : status,
        page: 0,
      })
    );
  };

  const handleSearchOrder = () => {
    dispatch(
      setListOrderInfo({
        page: 0,
        search: refInput.current.value.trim(),
      })
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchOrder();
    }
  };

  useEffect(() => {
    refInput?.current?.addEventListener("keypress", handleKeyPress);
    return () => {
      refInput?.current?.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    fetchDataOrder();
  }, [dispatch, page, totalPages, totalResults, order, sortBy, search, status]);

  return (
    <>
      <div className={classes.main_title}>
        <div className={classes.title_page}>
          <CategoryIcon className={classes.icon_style} />
          <p>ORDERS</p>
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
              value={status === "" ? "All status" : status}
              label="status"
              onChange={(e) => handleSetOrderByStatus(e.target.value)}
            >
              <MenuItem value="All status">All status</MenuItem>
              <MenuItem value={PENDING}>Pending</MenuItem>
              <MenuItem value={PACKAGED}>Packaged</MenuItem>
              <MenuItem value={DELIVERING}>Delivering</MenuItem>
              <MenuItem value={COMPLETED}>Completed</MenuItem>
            </Select>
          </FormControl>

          <div className={classes.search_create}>
            <SearchInput
              placeholder="Search by Email"
              inputRef={refInput}
              onSearch={handleSearchOrder}
            />
          </div>
        </div>
      </div>
      <div>
        <TableOrderAdmin
          data={dataOrders}
          page={page}
          rowsPerPage={limit}
          totalResults={totalResults}
          handleSetOrderBy={handleSetOrderBy}
        />
      </div>
    </>
  );
};

export default OrderAdmin;
