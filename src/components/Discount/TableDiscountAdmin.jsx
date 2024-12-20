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

import classes from "./TableDiscountAdmin.module.css";

import TableSortLabelCustom from "../TableSortLabelCustom/TableSortLabelCustom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slice/discountSlice";
import { Link } from "react-router-dom";
import { DISCOUNT_STATUS, PERCENTAGE } from "../../config/status";
import moment from "moment";
import IconButton from "../IconButton/IconButton";
import { Delete, Edit, Visibility } from "@mui/icons-material";

const TableDiscountAdmin = ({
  data,
  rowsPerPage,
  page,
  totalResults,
  handleSetDiscountBy,
  handleViewDelete,
  handleViewEdit,
}) => {
  const dispatch = useDispatch();

  const handleChangePage = (e, newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const { discount, sortBy } = useSelector((state) => state.discount);

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
                  name="id"
                  color="#FFF"
                  onClick={() => handleSetDiscountBy("id")}
                  orderDirection={discount}
                  orderBy={sortBy}
                >
                  ID
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Discount Type
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom
                  name="discountValue"
                  color="#FFF"
                  onClick={() => handleSetDiscountBy("discountValue")}
                  orderDirection={discount}
                  orderBy={sortBy}
                >
                  Discount Value
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom
                  name="startDate"
                  color="#FFF"
                  onClick={() => handleSetDiscountBy("startDate")}
                  orderDirection={discount}
                  orderBy={sortBy}
                >
                  Start Date
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom
                  name="expirationDate"
                  color="#FFF"
                  onClick={() => handleSetDiscountBy("expirationDate")}
                  orderDirection={discount}
                  orderBy={sortBy}
                >
                  Expiration Date
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item) => {
                const isExpired = item.status === DISCOUNT_STATUS.EXPIRED;
                return (
                  <TableRow key={item.id} className={classes.table_row}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.discountType}</TableCell>
                    <TableCell>
                      {item.discountType === PERCENTAGE
                        ? `${item.discountValue}%`
                        : `$ ${item.discountValue.toFixed(2)}`}
                    </TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      {moment(item.startDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      {moment(item.expirationDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell
                      sx={{
                        paddingRight: "1rem",
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Link to={`/admin/discount/${item.id}`}>
                        <IconButton>
                          <Visibility sx={{ color: "blue" }} />
                        </IconButton>
                      </Link>
                      <Link
                        onClick={() => {
                          if (!isExpired) handleViewEdit(item);
                        }}
                      >
                        <IconButton
                          style={{
                            cursor: isExpired ? "auto" : "pointer",
                          }}
                        >
                          <Edit
                            sx={{
                              cursor: isExpired ? "auto" : "pointer",
                              color: !isExpired ? "green" : "#ccc",
                            }}
                          />
                        </IconButton>
                      </Link>
                      <IconButton onClick={() => handleViewDelete(item.id)}>
                        <Delete sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  sx={{ textAlign: "center", padding: "1rem" }}
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {data.length > 0 && (
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "1rem",
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
      )}
    </>
  );
};

export default TableDiscountAdmin;
