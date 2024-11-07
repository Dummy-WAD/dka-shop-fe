import {
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import StatusChip from "../StatusChip/StatusChip";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import TableSortLabelCustom from "../TableSortLabelCustom/TableSortLabelCustom";

function TableOrderHistory({
  page,
  rowsPerPage,
  onSetPage,
  orderHistory,
  handleSortOrder,
  totalResults,
}) {
  const handleChangePage = (e, newPage) => {
    onSetPage(newPage);
  };
  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 2,
          borderRadius: "5px",
          border: "1px solid rgb(31 41 55 / 1)",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "rgb(31 41 55 / 1)" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Order Date</TableCell>
              <TableCell sx={{ color: "white" }}>
                <TableSortLabelCustom
                  color="#FFF"
                  name="updatedAt"
                  onClick={handleSortOrder}
                >
                  Last Update
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "white" }}>Current Status</TableCell>
              <TableCell sx={{ color: "white" }}>Total Value</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderHistory.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
                </TableCell>
                <TableCell>
                  {moment(order.updatedAt).format("DD/MM/YYYY HH:mm")}
                </TableCell>
                <TableCell>
                  <StatusChip status={order.status} />
                </TableCell>
                <TableCell>
                  ${(order.total + order.deliveryFee).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Link
                    style={{ color: "#000000", textDecoration: "underline" }}
                  >
                    View Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {orderHistory.length === 0 && (
        <Grid2 sx={{ textAlign: "center", padding: "1rem 0" }}>
          No result found
        </Grid2>
      )}
      <Grid2
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>Rows per page: {rowsPerPage}</Typography>

        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          rowsPerPage={rowsPerPage}
          count={totalResults}
          page={page}
          onPageChange={handleChangePage}
        />
      </Grid2>
    </div>
  );
}

export default TableOrderHistory;
