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

const TableProductAdmin = ({ data, rowsPerPage, page, totalResults }) => {
  console.log(rowsPerPage, page, totalResults);
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
                  Name
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom name="image" color="#FFF">
                  Image
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom name="price" color="#FFF">
                  Price
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom name="status" color="#FFF">
                  Status
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom name="createdAt" color="#FFF">
                  Created At
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom name="updatedAt" color="#FFF">
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
                  {/* Name */}
                  <TableCell>{item.name}</TableCell>

                  {/* Image */}
                  <TableCell>
                    {item.productImages.length > 0 ? (
                      <img
                        src={item.productImages[0].image}
                        alt={item.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "No image"
                    )}
                  </TableCell>

                  {/* Price */}
                  <TableCell>{item.price} VND</TableCell>

                  {/* Status */}
                  <TableCell>
                    {item.isDeleted ? "Inactive" : "Active"}
                  </TableCell>

                  {/* Created At */}
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* Updated At */}
                  <TableCell>
                    {new Date(item.updatedAt).toLocaleDateString()}
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
                    <IconButton>
                      <Visibility sx={{ color: "blue" }} />
                    </IconButton>
                    <IconButton>
                      <Edit sx={{ color: "green" }} />
                    </IconButton>
                    <IconButton>
                      <Delete sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid2
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>Rows of per page: {rowsPerPage}</Typography>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={totalResults}
          rowsPerPage={rowsPerPage}
          page={page}
        />
      </Grid2>
    </>
  );
};

export default TableProductAdmin;
