import {
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableHead,
  TablePagination,
  Grid2,
  Typography, IconButton,
} from "@mui/material";
import classes from "./TableCustomer.module.css";
import { useSelector } from "react-redux";
import TableSortLabelCustom from "../../components/TableSortLabelCustom/TableSortLabelCustom";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import {Visibility} from "@mui/icons-material";

const TableCustomer = ({
  customersList,
  rowsPerPage,
  onSetPage,
  onSetOrder,
}) => {
  const { totalResults, page, sortBy, order } = useSelector(
    (state) => state.customerAdmin
  );

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
                <TableSortLabelCustom
                  orderBy={sortBy}
                  orderDirection={order}
                  name="firstName"
                  color="#FFF"
                  onClick={() => onSetOrder("firstName")}
                >
                  First name
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom
                  orderBy={sortBy}
                  orderDirection={order}
                  name="lastName"
                  color="#FFF"
                  onClick={() => onSetOrder("lastName")}
                >
                  Last name
                </TableSortLabelCustom>
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                  Email
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                  Phone number
              </TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                <TableSortLabelCustom
                  orderBy={sortBy}
                  orderDirection={order}
                  name="createdAt"
                  color="#FFF"
                  onClick={() => onSetOrder("createdAt")}
                >
                  Registered date
                </TableSortLabelCustom>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customersList?.map(
              ({ id, firstName, lastName, email, phoneNumber, createdAt }) => (
                <TableRow key={id} className={classes.table_row}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{firstName}</TableCell>
                  <TableCell>{lastName}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{phoneNumber}</TableCell>
                  <TableCell>
                    {moment(createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingRight: "1rem",
                      display: "flex",
                      gap: "1rem",
                      justifyContent: "flex-center",
                    }}
                  >
                    <Link to={`/admin/customer/${id}`}>
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
      {customersList?.length == 0 && (
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
export default TableCustomer;
