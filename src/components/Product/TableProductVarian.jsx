import {TableBody, TableCell, TableContainer, TableRow, Table, TableHead, TablePagination, Grid2, Typography} from '@mui/material'
import classes from "./TableProductVarian.module.css"
import { useState } from 'react';

const TableProductVarian = ({
    productVarians,
    rowsPerPage, 
}) => {
    const [page, setPage] = useState(0);
    const handleChangePage = (e, newPage) => {
        setPage(newPage)
    }

    const paginatedData = productVarians.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

    return (
        <>
            <TableContainer className={classes.container} 
                sx={{border: "1px solid rgba(224, 224, 224, 1)", borderRadius: "5px"}}
            >
                <Table>
                    <TableHead className={classes.table_head}>
                        <TableRow>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Size</TableCell>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Color</TableCell>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((item, index) => (
                            <TableRow key={index} className={classes.table_row}>
                                <TableCell>{item.size}</TableCell>
                                <TableCell>{item.color}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {productVarians.length == 0 && (
                <Grid2 sx={{textAlign: "center", padding: "1rem 0"}}>
                    Not have product varian
                </Grid2>
            )}
            <Grid2 sx={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
                <Typography>Rows per page: {rowsPerPage}</Typography>
                <TablePagination 
                    rowsPerPageOptions={[]}
                    component="div"
                    count={productVarians.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </Grid2>
        </>
    )
}
export default TableProductVarian