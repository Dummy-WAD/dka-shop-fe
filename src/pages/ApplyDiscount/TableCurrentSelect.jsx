import {TableBody, TableCell, TableContainer, TableRow, Table, TableHead, TablePagination, Grid2, Typography} from '@mui/material'
import classes from "./Table.module.css"
import TableSortLabelCustom from '../../components/TableSortLabelCustom/TableSortLabelCustom';
import { useMemo, useState } from 'react';
import IconButton from '../../components/IconButton/IconButton';
import { Delete } from '@mui/icons-material';

const TableCurrentSelect = ({
    rowsPerPage, 
    listCurrentSelected,
    setListCurrentSelect,
}) => {
    const [page, setPage] = useState(0);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleRemoveCurrent = (productId) => {
        setListCurrentSelect((prev) => prev.filter((item) => item.productId !== productId));
        if (page > 0 && listCurrentSelected.length <= (page*rowsPerPage + 1)) setPage(page-1);
    }

    const paginatedData = useMemo(() => {
        const start = page * rowsPerPage;
        const end = start + rowsPerPage;
        return listCurrentSelected.slice(start, end);
    }, [listCurrentSelected, page, rowsPerPage]);

    return (
        <>
            <Typography sx={{fontWeight: 500, fontSize: "18px", color: "var(--admin-color)", mb: "-1rem"}}>List products are selecting</Typography>
            <TableContainer className={classes.container} 
                sx={{border: "1px solid rgba(224, 224, 224, 1)", borderRadius: "5px"}}
            >
                <Table>
                    <TableHead className={classes.table_head}>
                        <TableRow>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>ID</TableCell>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Name</TableCell>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Price</TableCell>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Category</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map(item => (
                            <TableRow key={item.productId} className={classes.table_row}>
                                <TableCell>{item?.productId}</TableCell>
                                <TableCell>{item?.productName}</TableCell>
                                <TableCell>{item?.originPrice}</TableCell>
                                <TableCell>{item?.categoryName || ""}</TableCell>
                                <TableCell sx={{paddingRight: "1rem", display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                                    <IconButton onClick={()=> handleRemoveCurrent(item.productId)}>
                                        <Delete sx={{color: 'red'}}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {paginatedData.length == 0 && (
                <Grid2 sx={{textAlign: "center", padding: "1rem 0"}}>
                    No product select
                </Grid2>
            )}
            <Grid2 sx={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
                <Typography>Rows per page: {rowsPerPage}</Typography>
                <TablePagination 
                    rowsPerPageOptions={[]}
                    component="div"
                    count={listCurrentSelected.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </Grid2>
        </>
    )
}
export default TableCurrentSelect;