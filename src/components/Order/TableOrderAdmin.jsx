import {
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableHead,
  TableBody,
  Grid,
  Typography,
  TablePagination,
} from "@mui/material";

import classes from "./TableOrderAdmin.module.css";

import TableSortLabelCustom from "../../components/TableSortLabelCustom/TableSortLabelCustom";
import IconButton from "../IconButton/IconButton";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slice/orderSlice";
import { Link } from "react-router-dom";
import moment from "moment";

const TableOrderAdmin = ({
  data,
  rowsPerPage,
  page,
  totalResults,
  handleSetOrderBy,
}) => {
  const dispatch = useDispatch();

  const handleChangePage = (e, newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const { order, sortBy } = useSelector((state) => state.orderSlice);

  return (
    <>
      <TableContainer
        className={classes.container}
        sx={{ border: "1px solid rgba(224, 224, 224, 1)", borderRadius: "5px" }}
      >
        <Table>
          <TableHead className={classes.table_head}>
            <TableRow>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom
                  name="orderId"
                  color="#FFF"
                  onClick={() => handleSetOrderBy("orderId")}
                  orderDirection={order}
                  orderBy={sortBy}
                >
                  ID
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom
                  name="email"
                  color="#FFF"
                  onClick={() => handleSetOrderBy("email")}
                  orderDirection={order}
                  orderBy={sortBy}
                >
                  Customer Email
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom
                  name="totalPrice"
                  color="#FFF"
                  onClick={() => handleSetOrderBy("totalPrice")}
                  orderDirection={order}
                  orderBy={sortBy}
                >
                  Price
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom
                  name="createdAt"
                  color="#FFF"
                  onClick={() => handleSetOrderBy("createdAt")}
                  orderDirection={order}
                  orderBy={sortBy}
                >
                  Created Date
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom
                  name="updatedAt"
                  color="#FFF"
                  onClick={() => handleSetOrderBy("updatedAt")}
                  orderDirection={order}
                  orderBy={sortBy}
                >
                  Last Updated
                </TableSortLabelCustom>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item) => (
                <TableRow key={item.orderId} className={classes.table_row}>
                  {/* ID */}
                  <TableCell>{item.orderId}</TableCell>

                  {/* Customer Email */}
                  <TableCell>
                    {" "}
                    <Link
                      to={`/admin/customer/${item.customerId}`}
                      style={{ color: "#000000" }}
                    >
                      {item.email}
                    </Link>
                  </TableCell>

                  {/* Price */}
                  <TableCell>${item.totalPrice}</TableCell>

                  {/* Status */}
                  <TableCell>{item.currentStatus}</TableCell>

                  {/* Created Date */}
                  <TableCell>
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                  </TableCell>

                  {/* Last Updated */}
                  <TableCell>
                    {moment(item.updatedAt).format("DD/MM/YYYY")}
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <Link to={`${item.orderId}`}>
                      <IconButton>
                        <Visibility sx={{ color: "blue" }} />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length === 0 && (
        <Grid sx={{ textAlign: "center", padding: "1rem 0" }}>
          No result found
        </Grid>
      )}
      <Grid
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
          count={totalResults}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Grid>
    </>
  );
};

export default TableOrderAdmin;
