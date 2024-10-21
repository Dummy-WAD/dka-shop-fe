import {
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import classes from "./CustomerDetail.module.css";
import React, { useEffect, useState } from "react";
import TableCategory from "../../pages/Category/TableCategory";
import StatusChip from "../StatusChip/StatusChip";
import { green } from "@mui/material/colors";
import TableOrderHistory from "./TableOrderHistory";
import { Link, useParams } from "react-router-dom";
import {
  handleGetCustomerDetail,
  handleGetOrderByCustomer,
} from "../../api/customer";
import { ArrowBack } from "@mui/icons-material";

function CustomerDetail() {
  const { customerId } = useParams();
  const [customerInfo, setCustomerInfo] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [orderByCustomer, setOrderByCustomer] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  const handleSetPage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortOrder = () => {
    const newSortOrder = sortOrder == "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  const fetchCustomerDetail = async (customerId) => {
    setLoading(true);
    try {
      const res = await handleGetCustomerDetail(customerId);
      setCustomerInfo(res.userInfo);
      setAddresses(res.addresses);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderByCustomer = async (
    customerId,
    currentPage,
    rowsPerPage,
    sortOrder
  ) => {
    setLoading(true);
    console.log(currentPage, rowsPerPage);
    try {
      const res = await handleGetOrderByCustomer(
        customerId,
        currentPage + 1,
        rowsPerPage,
        sortOrder
      );
      setOrderByCustomer(res.results);
      setTotalResults(res.totalResults);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerDetail(customerId);
  }, []);

  useEffect(() => {
    fetchOrderByCustomer(customerId, currentPage, rowsPerPage, sortOrder);
  }, [currentPage, sortOrder]);

  return (
    <>
      <div>
        <div>
          <Link to="/admin/customer">
            <Button
              sx={{ backgroundColor: "var(--admin-color)", color: "#fff" }}
              variant="contained"
              startIcon={<ArrowBack />}
            >
              Back
            </Button>
          </Link>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mt: "-2rem", fontWeight: 600 }}
          >
            Customer Detail
          </Typography>
        </div>
        <div className={classes.container}>
          <Typography variant="h6" sx={{ fontWeight: "500" }}>
            Customer Information
          </Typography>
          <div className={classes.column_layout}>
            <div className={classes.info}>
              <Typography variant="h6" sx={{ my: "1rem" }}>
                ID
              </Typography>
              <Box className={classes.value}>{customerInfo.id}</Box>
              <Typography variant="h6" sx={{ my: "1rem" }}>
                First Name
              </Typography>
              <Box className={classes.value}>{customerInfo.firstName}</Box>
              <Typography variant="h6" sx={{ my: "1rem" }}>
                Last Name
              </Typography>
              <Box className={classes.value}>{customerInfo.lastName}</Box>
              <Typography variant="h6" sx={{ my: "1rem" }}>
                Email Address
              </Typography>
              <Box className={classes.value}>{customerInfo.email}</Box>
              <Typography variant="h6" sx={{ my: "1rem" }}>
                Phone Number
              </Typography>
              <Box className={classes.value}>{customerInfo.phoneNumber}</Box>
              <Typography variant="h6" sx={{ my: "1rem" }}>
                Gender
              </Typography>
              <Box className={classes.value}>
                {customerInfo.gender == "0" ? "Female" : "Male"}
              </Box>
            </div>
            <div className={classes.address}>
              <Typography variant="h6" sx={{ my: "1rem" }}>
                Status
              </Typography>
              <div className={classes.column_layout}>
                {customerInfo.status == "ACTIVE" && (
                  <StatusChip
                    status="ACTIVE"
                    style={{ padding: 2, fontSize: "16px", m: 1 }}
                  />
                )}
                {customerInfo.status == "INACTIVE" && (
                  <StatusChip
                    status="INACTIVE"
                    style={{ padding: 2, fontSize: "16px", m: 1 }}
                  />
                )}
              </div>
              <Typography variant="h6" sx={{ my: "1rem" }}>
                Address
              </Typography>
              {addresses.length == 0 ? (
                <Box className={classes.no_address}>
                  This customer has no address
                </Box>
              ) : (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className={classes.value}
                >
                  <List disablePadding>
                    {addresses.map((address) => (
                      <ListItem
                        key={address.full_address}
                        sx={{ "&.MuiListItem-root": { paddingY: 0.5 } }}
                      >
                        <ListItemText
                          sx={{ flex: 1 }}
                          primary={address.full_address}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <List disablePadding>
                    {addresses.map((address) => (
                      <ListItem
                        key={address.full_address}
                        sx={{ "&.MuiListItem-root": { paddingY: 0.5 } }}
                      >
                        {address.is_default && (
                          <StatusChip
                            status="Default"
                            style={{ fontSize: "16px" }}
                          />
                        )}
                      </ListItem>
                    ))}
                  </List>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={classes.container}>
          <Typography variant="h5" sx={{ fontWeight: "700" }}>
            Order History
          </Typography>
          <TableOrderHistory
            rowsPerPage={rowsPerPage}
            onSetPage={handleSetPage}
            page={currentPage}
            orderHistory={orderByCustomer}
            handleSortOrder={handleSortOrder}
            totalResults={totalResults}
          />
        </div>
      </div>
    </>
  );
}

export default CustomerDetail;
