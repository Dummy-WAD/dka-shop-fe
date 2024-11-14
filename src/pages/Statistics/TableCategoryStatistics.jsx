import {TableBody, TableCell, TableContainer, TableRow, Table, TableHead, Grid2, Typography} from '@mui/material'
import {Assessment} from '@mui/icons-material';
import classes from "./TableCategoryStatistics.module.css";

const TableCategoryStatistics = ({
    categoryList,
    title,
    isRevenue,
}) => {

    return (
        <div className={classes.main_container}>
            <div className={classes.title}>
                <Assessment fontSize='small' />
                <Typography sx={{fontWeight: 500, fontSize: "18px", color: "var(--admin-color)"}}>{title}</Typography>
            </div>
            <TableContainer className={classes.container} 
                sx={{border: "1px solid rgba(224, 224, 224, 1)", borderRadius: "5px"}}
            >
                <Table>
                    <TableHead className={classes.table_head}>
                        <TableRow>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Category ID</TableCell>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Name category</TableCell>
                            {isRevenue && <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Revenue</TableCell>}
                            {!isRevenue && <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Sold</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categoryList.map(item => (
                            <TableRow 
                                key={item.id} 
                                className={classes.table_row}
                            >
                                <TableCell>{item?.categoryId}</TableCell>
                                <TableCell>{item?.categoryName}</TableCell>
                                {isRevenue && <TableCell>${item?.totalPrice?.toFixed(2)}</TableCell>}
                                {!isRevenue && <TableCell>{item?.totalQuantity}</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {categoryList.length == 0 && (
                <Grid2 sx={{textAlign: "center"}}>
                    No have categories
                </Grid2>
            )}
        </div>
    )
}
export default TableCategoryStatistics;