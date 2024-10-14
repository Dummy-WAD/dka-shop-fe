import {TableBody, TableCell, TableContainer, TableRow, Table, TableHead, TablePagination, Grid2, Typography} from '@mui/material'
import IconButton from '../../components/IconButton/IconButton';
import {Visibility, Delete, Edit} from '@mui/icons-material';
import classes from "./TableCategory.module.css"
import { useSelector } from 'react-redux';
import TableSortLabelCustom from '../../components/TableSortLabelCustom/TableSortLabelCustom';

const TableCategory = ({
    categories,
    rowsPerPage, 
    onSetPage, 
    onSetOrder,
    handleViewDetail,
    handleViewEdit
}) => {
    const {totalResults, page, orderBy, orderDirection} = useSelector((state) => state.category)

    const handleChangePage = (e, newPage) => {
        onSetPage(newPage)
    }

    return (
        <>
            <TableContainer className={classes.container} 
                sx={{border: "1px solid rgba(224, 224, 224, 1)", borderRadius: "5px"}}
            >
                <Table>
                    <TableHead className={classes.table_head}>
                        <TableRow>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>ID</TableCell>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>
                                <TableSortLabelCustom
                                    orderBy={orderBy}
                                    orderDirection={orderDirection}
                                    name="name"
                                    color="#FFF"
                                    onClick={() => onSetOrder('name')}
                                >
                                    Name
                                </TableSortLabelCustom>
                            </TableCell>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>
                            <TableSortLabelCustom
                                    orderBy={orderBy}
                                    orderDirection={orderDirection}
                                    name="description"
                                    color="#FFF"
                                    onClick={() => onSetOrder('description')}
                                >
                                    Description
                                </TableSortLabelCustom>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map(item => (
                            <TableRow key={item.id} className={classes.table_row}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell sx={{paddingRight: "1rem", display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                                    <IconButton onClick={()=> handleViewDetail(item)}>
                                        <Visibility sx={{color: 'blue'}}/>
                                    </IconButton>
                                    <IconButton onClick={()=> handleViewEdit(item)}>
                                        <Edit sx={{color: 'green'}}/>
                                    </IconButton>
                                    <IconButton>
                                        <Delete sx={{color: 'red'}}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid2 sx={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
                <Typography>Rows of per page: {rowsPerPage}</Typography>
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
    )
}
export default TableCategory