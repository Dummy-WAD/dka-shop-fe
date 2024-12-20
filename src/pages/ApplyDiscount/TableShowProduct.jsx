import {TableBody, TableCell, TableContainer, TableRow, Table, TableHead, TablePagination, Grid2, Typography, Checkbox} from '@mui/material'
import classes from "./Table.module.css"
import { useDispatch, useSelector } from 'react-redux';
import TableSortLabelCustom from '../../components/TableSortLabelCustom/TableSortLabelCustom';
import { useState } from 'react';
import { checkApplyDiscountProduct } from '../../api/product';
import { setCurrentPageShow, setOrderApply, setProductSelected } from '../../redux/slice/discountSlice';
import DeleteModal from '../../components/Modal/DeleteModal';
import { formatPrice } from '../../helper';
import { Link } from 'react-router-dom';

const LIMIT = 5;

const TableShowProduct = ({
    infoProduct,
    listCurrentSelect,
    setListCurrent,
}) => {
    const dispatch = useDispatch();
    const {productSelected, pageShow: page, orderApply: order} = useSelector(state => state.discount);
    const [activeDiscountId, setActiveDiscountId] = useState(null);

    const [isOpenModal, setIsOpenModal] = useState(false); 

    const handleChangePage = (e, newPage) => {
        dispatch(setCurrentPageShow(newPage));
    }

    const handleSetOderBy = (name) => {
        const newOrder = name == order.orderBy ? (order.orderDirection === "asc" ? "desc" : order.orderDirection === "desc" ? "" : "asc") : "asc";
        const nameOrder = newOrder == "" ? "" : name;
        dispatch(setOrderApply({
            orderBy: nameOrder,
            orderDirection: newOrder,
        }))
    }

    const handleOnChange = async (item) => {
        const isCurrent = listCurrentSelect.find((current) => current.productId === item.productId);
        if (isCurrent) {
            setListCurrent((prev) => prev.filter((prevItem) => prevItem.productId !== item.productId));
        } else {
            try {
                const { isDiscounted, activeDiscount } = await checkApplyDiscountProduct(item.productId);
                dispatch(setProductSelected(item));
                if (isDiscounted) {
                    setIsOpenModal(true);
                    setActiveDiscountId(activeDiscount.id);
                } else {
                    setListCurrent((prev) => [item, ...prev]);
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    const handleAcceptApplyNewDiscount = () => {
        setListCurrent((prev) => [productSelected, ...prev]);
        setIsOpenModal(false);
    }

    const handleNavigate = () => {
        window.open(`/admin/discount/${activeDiscountId}`,'_blank');
    }

    return (
        <>
            <TableContainer className={classes.container} 
                sx={{border: "1px solid rgba(224, 224, 224, 1)", borderRadius: "5px"}}
            >
                <Table>
                    <TableHead className={classes.table_head}>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>ID</TableCell>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>
                                <TableSortLabelCustom
                                    orderBy={order.orderBy}
                                    orderDirection={order.orderDirection}
                                    name="name"
                                    color="#FFF"
                                    onClick={() => handleSetOderBy('name')}
                                >
                                    Name
                                </TableSortLabelCustom>
                            </TableCell>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>
                                <TableSortLabelCustom
                                    orderBy={order.orderBy}
                                    orderDirection={order.orderDirection}
                                    name="price"
                                    color="#FFF"
                                    onClick={() => handleSetOderBy('price')}
                                >
                                    Price
                                </TableSortLabelCustom>
                            </TableCell>
                            <TableCell sx={{color: "#FFF", fontWeight: "bold"}}>Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {infoProduct?.results.map(item => (
                            <TableRow key={item.productId} className={classes.table_row}>
                                <TableCell>
                                    <Checkbox 
                                        checked={!!listCurrentSelect.find((current)=> current.productId === item.productId)}
                                        onChange={()=> handleOnChange(item)}
                                    />
                                </TableCell>
                                <TableCell>{item.productId}</TableCell>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{formatPrice(item.originPrice)}</TableCell>
                                <TableCell>{item?.categoryName || ""}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {infoProduct?.results.length == 0 && (
                <Grid2 sx={{textAlign: "center", padding: "1rem 0"}}>
                    No result found
                </Grid2>
            )}
            <Grid2 sx={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
                <Typography>Rows per page: {LIMIT}</Typography>
                <TablePagination 
                    rowsPerPageOptions={[]}
                    component="div"
                    count={infoProduct?.totalResults || 0}
                    rowsPerPage={LIMIT}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </Grid2>
            <DeleteModal 
                isOpen={isOpenModal}
                handleClose={()=>setIsOpenModal(false)}
                onSubmit={handleAcceptApplyNewDiscount}
                title={"Confirm"}
                description={
                    <>
                        This product is applied for other discount
                        <br/><Link onClick={handleNavigate}>Link to discount ID {activeDiscountId}</Link>
                        <br/> Are you sure continue apply this discount ?
                    </>
                }
            />
        </>
    )
}
export default TableShowProduct;