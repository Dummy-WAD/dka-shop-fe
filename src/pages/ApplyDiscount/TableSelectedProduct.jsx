import {TableBody, TableCell, TableContainer, TableRow, Table, TableHead, TablePagination, Grid2, Typography} from '@mui/material'
import classes from "./Table.module.css"
import TableSortLabelCustom from '../../components/TableSortLabelCustom/TableSortLabelCustom';
import { useEffect, useState } from 'react';
import { getAllProductForAdmin } from '../../api/product';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../components/IconButton/IconButton';
import { Delete } from '@mui/icons-material';
import { setCurrentPageSelected, setProductSelected } from '../../redux/slice/discountSlice';
import DeleteModal from '../../components/Modal/DeleteModal';
import { revokeDiscount } from '../../api/discount';
import { toast } from 'react-toastify';

const TableSelectedProduct = ({
    infoListSelected,
    idDiscount,
    rowsPerPage, 
    handleAfterRemoveSelected,
}) => {
    const dispatch = useDispatch();
    const {productSelected, pageSelected: page} = useSelector(state => state.discount);

    const [isOpenModal, setIsOpenModal]= useState(false);

    const handleChangePage = (e, newPage) => {
        dispatch(setCurrentPageSelected(newPage));
    }

    const handleRemove = (item) => {
        setIsOpenModal(true);
        dispatch(setProductSelected(item));
    }

    const handleRemoveSelected = async () => {
        try {
            await revokeDiscount(idDiscount, productSelected.productId);
            toast.success("Revoke discount success",{
                autoClose: 3000,
            });
            handleAfterRemoveSelected();
        } catch (err) {
            toast.error("Revoke discount failed",{
                autoClose: 3000,
            });
            console.error(err);
        }
        setIsOpenModal(false);
    }

    return (
        <>
            <Typography sx={{fontWeight: 500, fontSize: "18px", color: "var(--admin-color)", mb: "-1rem"}}>List products are applied</Typography>
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
                        {infoListSelected && infoListSelected?.results.map(item => (
                            <TableRow key={item.productId} className={classes.table_row}>
                                <TableCell>{item.productId}</TableCell>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.originPrice}</TableCell>
                                <TableCell>{item.categoryName || ""}</TableCell>
                                <TableCell sx={{paddingRight: "1rem", display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                                    <IconButton onClick={()=> handleRemove(item)}>
                                        <Delete sx={{color: 'red'}}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!infoListSelected || infoListSelected?.results.length == 0 && (
                <Grid2 sx={{textAlign: "center", padding: "1rem 0"}}>
                    No product are applied
                </Grid2>
            )}
            <Grid2 sx={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
                <Typography>Rows per page: {rowsPerPage}</Typography>
                <TablePagination 
                    rowsPerPageOptions={[]}
                    component="div"
                    count={infoListSelected?.totalResults || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </Grid2>
            <DeleteModal 
                isOpen={isOpenModal} 
                handleClose={()=> setIsOpenModal(false)} 
                onSubmit={handleRemoveSelected} 
                title="Remove discount on product"
                description="Are you sure remove this discount on product ?"
            />
        </>
    )
}
export default TableSelectedProduct;