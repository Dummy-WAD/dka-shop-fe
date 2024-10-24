import classes from "./CustomerListAdmin.module.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../components/SearchInput/SearchInput";
import { UserIcon } from "../../icon/Icon";
import TableCustomer from "./TableCustomer";
import customerAdminSlice from "../../redux/slice/customerAdminSlice";
import { handleGetCustomersForAdmin } from "../../api/customer";
import { ACTIVE, INACTIVE } from "../../config/status";

const limit = 20;

const CustomerListAdmin = () => {
  const dispatch = useDispatch();
  const refInput = useRef(null);

  const { page, customerList, order, sortBy, keyword, status } = useSelector(
    (state) => state.customerAdmin
  );

  const handleSetPage = (newPage) => {
    dispatch(customerAdminSlice.actions.setCurrentPage(newPage));
  };

  const handleSetOderBy = (name) => {
    const newOrder =
      name == sortBy
        ? order === "asc"
          ? "desc"
          : order === "desc"
          ? ""
          : "asc"
        : "asc";
    dispatch(
      customerAdminSlice.actions.setCustomerInfo({
        sortBy: newOrder == "" ? "" : name,
        order: newOrder,
        page: 0,
      })
    );
  };

  const handleSearchCustomer = () => {
    dispatch(
      customerAdminSlice.actions.setCustomerInfo({
        page: 0,
        keyword: refInput.current.value.trim(),
      })
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchCustomer();
    }
  };

  const fetchCustomers = useCallback(
    async (page, limit, sortBy, order, keyword, status) => {
      try {
        const res = await handleGetCustomersForAdmin({
          keyword,
          status,
          page: page + 1,
          limit,
          order,
          sortBy,
        });
        const { results, totalPages, page: currentPage, totalResults } = res;
        dispatch(
          customerAdminSlice.actions.setCustomerInfo({
            customerList: results,
            totalPages: totalPages,
            page: currentPage - 1,
            totalResults: totalResults,
          })
        );
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchCustomers(page, limit, sortBy, order, keyword, status);
  }, [page, sortBy, order, keyword, status, fetchCustomers]);

  useEffect(() => {
    refInput?.current?.addEventListener("keypress", handleKeyPress);
    return () => {
      refInput?.current?.removeEventListener("keypress", handleKeyPress);
      dispatch(
        customerAdminSlice.actions.setCustomerInfo({
          customerList: [],
          page: 0,
          totalPages: null,
          totalResults: null,
          order: "",
          sortBy: "",
          keyword: "",
          status: ACTIVE,
        })
      );
    };
  }, []);
  return (
    <>
      <div className={classes.main_title}>
        <div className={classes.title_page}>
          <UserIcon className={classes.icon_style} />
          <p>CUSTOMER</p>
        </div>
        <div className={classes.action}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Status</InputLabel>
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
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={status}
              label="status"
              onChange={(e) =>
                dispatch(
                  customerAdminSlice.actions.setCustomerInfo({
                    page: 0,
                    status: e.target.value,
                  })
                )
              }
            >
              <MenuItem value={ACTIVE}>Active</MenuItem>
              <MenuItem value={INACTIVE}>Inactive</MenuItem>
            </Select>
          </FormControl>

          <div className={classes.search_create}>
            <SearchInput
              placeholder="Search"
              inputRef={refInput}
              onSearch={handleSearchCustomer}
            />
          </div>
        </div>
      </div>
      <div>
        <TableCustomer
          customersList={customerList}
          rowsPerPage={limit}
          onSetPage={handleSetPage}
          onSetOrder={handleSetOderBy}
        />
      </div>
    </>
  );
};

export default CustomerListAdmin;
