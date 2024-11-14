import {TableBody, TableCell, TableContainer, TableRow, Table, TableHead, Grid2, Typography} from '@mui/material'
import {Assessment} from '@mui/icons-material';
import classes from "./TableProductStatistics.module.css";
import { useNavigate } from 'react-router-dom';

const TableProductStatistics = ({
    productsList,
    title,
    isRevenue,
}) => {
    const navigate = useNavigate();

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
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Product ID</TableCell>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Name product</TableCell>
                            {isRevenue && <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Revenue</TableCell>}
                            {!isRevenue && <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Sold</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productsList.map(item => (
                            <TableRow 
                                key={item.id} 
                                className={classes.table_row}
                                onClick={()=> {
                                    navigate(`/admin/product/${item.id}`)
                                }}
                            >
                                <TableCell>{item?.productId}</TableCell>
                                <TableCell>{item?.productName}</TableCell>
                                {isRevenue && <TableCell>${item?.totalPrice?.toFixed(2)}</TableCell>}
                                {!isRevenue && <TableCell>{item?.totalQuantity}</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {productsList.length == 0 && (
                <Grid2 sx={{textAlign: "center"}}>
                    No have products
                </Grid2>
            )}
        </div>
    )
}
export default TableProductStatistics;