import {
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableHead,
  TableBody,
  Grid2,
  Typography,
  TablePagination,
} from "@mui/material";

import classes from "./TableProductAdmin.module.css";

import TableSortLabelCustom from "../../components/TableSortLabelCustom/TableSortLabelCustom";
import IconButton from "../IconButton/IconButton";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slice/productSlice";
import { Link } from "react-router-dom";
import moment from "moment";

const TableProductAdmin = ({
  data,
  rowsPerPage,
  page,
  totalResults,
  handleSetOrderBy,
  handleViewDelete,
}) => {
  const dispatch = useDispatch();
  const handleChangePage = (e, newPage) => {
    dispatch(setCurrentPage(newPage));
  };
  const { order, sortBy } = useSelector((state) => state.product);
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
                <TableSortLabelCustom name="name" color="#FFF">
                  ID
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom
                  name="name"
                  color="#FFF"
                  onClick={() => handleSetOrderBy("name")}
                  orderDirection={order}
                  orderBy={sortBy}
                >
                  Name
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom
                  name="price"
                  color="#FFF"
                  onClick={() => handleSetOrderBy("price")}
                  orderDirection={order}
                  orderBy={sortBy}
                >
                  Price
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Current Price
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Category
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom
                  name="createdAt"
                  color="#FFF"
                  onClick={() => handleSetOrderBy("createdAt")}
                  orderDirection={order}
                  orderBy={sortBy}
                >
                  Created At
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
                  Last Updated At
                </TableSortLabelCustom>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item) => (
                <TableRow key={item.id} className={classes.table_row}>
                  {/* ID */}
                  <TableCell>{item.id}</TableCell>

                  {/* Name */}
                  <TableCell>{item.name}</TableCell>

                  {/* Price */}
                  <TableCell>${item.price}</TableCell>

                  {/* Current Price */}
                  <TableCell>${item.currentPrice}</TableCell>

                  {/* Category */}
                  <TableCell>{item?.category?.name}</TableCell>

                  {/* Created At */}
                  <TableCell>
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                  </TableCell>

                  {/* Updated At */}
                  <TableCell>
                    {moment(item.updateAt).format("DD/MM/YYYY")}
                  </TableCell>

                  {/* Actions */}
                  <TableCell
                    sx={{
                      paddingRight: "1rem",
                      display: "flex",
                      gap: "1rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Link to={`${item.id}`}>
                      <IconButton>
                        <Visibility sx={{ color: "blue" }} />
                      </IconButton>
                    </Link>
                    <Link to={`/admin/product/edit/${item.id}`}>
                      <IconButton>
                        <Edit sx={{ color: "green" }} />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => handleViewDelete(item.id)}>
                      <Delete sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length == 0 && (
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
          count={totalResults}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Grid2>
    </>
  );
};

export default TableProductAdmin;
