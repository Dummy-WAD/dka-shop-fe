import { Box, Chip, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import classes from "./CustomerDetail.module.css";
import React from "react";
import TableCategory from "../Category/TableCategory";
import StatusChip from "../../components/StatusChip/StatusChip";
import { green } from "@mui/material/colors";
import TableOrderHistory from "./TableOrderHistory";
import { useParams } from "react-router-dom";
import { handleGetCustomerDetail } from "../../api/customer";

function CustomerDetail() {
  const {customerId} = useParams()
  const [customerInfo, setCustomerInfo] = useState([])
  const [orderByCustomer, setOrderByCustomer] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

  const fetchCustomerDetail = async (customerId) => {
    setLoading(true)
    try {
      const res = await handleGetCustomerDetail(customerId)
      setCustomerInfo(res.results)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <>
    <div>
      <div className={classes.container}>
        <Typography variant="h5" sx={{fontWeight: "700"}}>Customer Information</Typography>
        <div className={classes.column_layout}>
        <div className={classes.info}>
          <Typography variant="h6" sx={{my: "1rem"}}>ID</Typography>
          <Box className={classes.value}>1</Box>
          <Typography variant="h6" sx={{my: "1rem"}}>Full Name</Typography>
          <Box className={classes.value}>Nguyen Hong Diem</Box>
          <Typography variant="h6" sx={{my: "1rem"}}>Email Address</Typography>
          <Box className={classes.value}>hongdiem@gmail.com</Box>
          <Typography variant="h6" sx={{my: "1rem"}}>Phone Number</Typography>
          <Box className={classes.value}>0353905691</Box>
          <Typography variant="h6" sx={{my: "1rem"}}>Gender</Typography>
          <Box className={classes.value}>Female</Box>

        </div>
        <div className={classes.address}>
          <Typography variant="h6" sx={{my: "1rem"}}>Status</Typography>
          <div className={classes.column_layout}>
            <StatusChip label="Active" style={{backgroundColor: 'green', color: 'white', padding: 2, fontSize: '16px', m: 1}}/>
            <StatusChip label="Inactive" style={{backgroundColor: '#b1adad', padding: 2, fontSize: '16px', m: 1}} />
          </div>
          <Typography variant="h6" sx={{my: "1rem"}}>Address</Typography>
          <List className={classes.value}>
            <ListItem>
              <ListItemText primary="54 Nguyen Luong Bang, Hoa Khanh Bac, Lien Chieu, Da Nang" />
              <StatusChip label="Default" style={{backgroundColor: 'black', color: 'white',  fontSize: '16px', m: 1}}/>
            </ListItem>
            <ListItem>
              <ListItemText primary="54 Nguyen Luong Bang, Hoa Khanh Bac, Lien Chieu, Da Nang"/>
            </ListItem>
          </List>

        </div>
        </div>
      </div>
      <div className={classes.container}>
        <Typography variant="h5" sx={{fontWeight: "700"}}>Order History</Typography>
        <TableOrderHistory rowsPerPage={5} onSetPage={handleSetPage}/>
      </div>
    </div>
    </>
  );
}

export default CustomerDetail;
