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

import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import classes from "./DiscountProductTable.module.css";
import IconButton from "../../components/IconButton/IconButton";

const DiscountProductTable = ({
  data,
  rowsPerPage,
  onSetPage,
  page,
  totalResults,
}) => {
  const handleChangePage = (e, newPage) => {
    onSetPage(newPage);
  };
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
                ID
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Product name
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Category
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Origin price
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Current price
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                Discounted price
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map(
                ({
                  productId,
                  productName,
                  categoryName,
                  originPrice,
                  currentPrice,
                  priceDiscounted,
                }) => (
                  <TableRow key={productId} className={classes.table_row}>
                    <TableCell>{productId}</TableCell>
                    <TableCell>{productName}</TableCell>
                    <TableCell>{categoryName}</TableCell>
                    <TableCell>$ {originPrice}</TableCell>
                    <TableCell>$ {currentPrice}</TableCell>
                    <TableCell>$ {priceDiscounted}</TableCell>

                    <TableCell
                      sx={{
                        paddingRight: "1rem",
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Link to={`/admin/product/${productId}`}>
                        <IconButton>
                          <Visibility sx={{ color: "blue" }} />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              )}
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

export default DiscountProductTable;
