import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import { Box, Button, CircularProgress, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TableSelectedProduct from "./TableSelectedProduct";
import TableShowProduct from "./TableShowProduct";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPageSelected, setCurrentPageShow } from "../../redux/slice/discountSlice";
import classes from "./ApplyDiscount.module.css";
import TableCurrentSelect from "./TableCurrentSelect";
import { Sell } from "@mui/icons-material";
import {DeleteModal as ConfirmModal}from "../../components/Modal/DeleteModal";
import { applyDiscount, handleGetDiscountDetail, handleGetProductByDiscount } from "../../api/discount";
import { toast } from "react-toastify";
import { DISCOUNT_STATUS } from "../../config/status";
import MyTextField from "../../components/MyTextField/MyTextField";
import moment from "moment/moment";

const rowsPerPage = 5;

const ApplyDiscount = ({}) => {
    const {id: discountId} = useParams();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {pageSelected, pageShow, orderApply} = useSelector(state => state.discount);
    const [listCurrentSelect, setListCurrentSelect] = useState([]);
    const [infoListSelected, setInfoListSelected] = useState();
    const [infoProduct, setInfoProduct] = useState();
    const [isConfirmApply, setIsConfirmApply] = useState(false);
    const [infoDiscount, setInfoDiscount] = useState();
    
    const fetchDataDiscount = async () => {
        setIsLoading(true);
        try {
            const discountResponse = await handleGetDiscountDetail(discountId);
            setInfoDiscount(discountResponse);   
            setTimeout(()=>{}, 3000)
        } catch (err) {
            console.error(err);
        }
        setIsLoading(false);
    }

    const fetchSelected = async () => {
        try {
            const res = await handleGetProductByDiscount(discountId, {
                exclude: false,
                page: pageSelected+1,
                limit: rowsPerPage,
            })
            setInfoListSelected(res);
        } catch (err) {
            console.error(err);
        }
    }

    const fetchListProductCanApply = async () => {
        try {
            const res = await handleGetProductByDiscount(discountId, {
                exclude: true,
                page: pageShow+1,
                limit: rowsPerPage,
            })
            setInfoProduct(res);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchSelected();
    },[pageSelected]);

    useEffect(()=>{
        fetchListProductCanApply();
    },[pageShow, orderApply]);

    useEffect(()=>{
        const fetchData = async () => {
            await fetchDataDiscount();
            dispatch(setCurrentPageSelected(0));
            dispatch(setCurrentPageShow(0));
        }
        fetchData();
    },[]);

    const handleAfterRemoveSelectedOrApply = () => {
        if (pageSelected === 0) {
            fetchSelected();
        } else {
            dispatch(setCurrentPageSelected(0));
        }
        fetchListProductCanApply();
    }

    const handleApply = async () => {
        try {
            const listProductId = listCurrentSelect.map((item) => item.productId);
            await applyDiscount(discountId, listProductId);
            toast.success("Apply success", {
                autoClose: 3000,
            })
        } catch (err) {
            console.error(err);
            toast.error("Apply failed", {
                autoClose: 3000,
            })
        }
        handleAfterRemoveSelectedOrApply();
        setIsConfirmApply(false);
        setListCurrentSelect([]);
    }

    if (isLoading) {
        return (
            <Box
                sx={{
                display: "flex",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <CircularProgress sx={{ color: "var(--admin-color)" }} size={60} />
            </Box>
        );
    }

    if (infoDiscount) return (
        <div>
            <div>
                <BackButton />
                <Typography variant="h5" sx={{textAlign: "center", mt: "-2rem", fontWeight: 500}}>Apply discount on product</Typography>
            </div>
            {infoDiscount && infoDiscount?.status !== DISCOUNT_STATUS.EXPIRED && (
                <>
                    <div className={classes.infoContainer}>
                        <Typography variant="h6" sx={{ fontWeight: "500", mb: "20px" }}>
                            Discount Information
                        </Typography>
                        <div className={classes.infoGroup}>
                            <MyTextField
                                id="id"
                                label="ID"
                                variant="outlined"
                                color="var(--admin-color)"
                                disabled
                                style={{ mb: "1.5rem", width: "100%" }}
                                value={infoDiscount?.id}
                            />
                            <MyTextField
                                id="discountValue"
                                label="Discount value"
                                variant="outlined"
                                color="var(--admin-color)"
                                disabled
                                style={{ mb: "1.5rem", width: "100%" }}
                                value={infoDiscount?.discountValue}
                            />
                        </div>
                        <div className={classes.infoGroup}>
                            <MyTextField
                                id="discountType"
                                label="Discount type"
                                variant="outlined"
                                color="var(--admin-color)"
                                disabled
                                style={{ mb: "1.5rem", width: "100%" }}
                                value={infoDiscount?.discountType}
                            />
                            <MyTextField
                                id="status"
                                label="Status"
                                variant="outlined"
                                color="var(--admin-color)"
                                disabled
                                style={{ mb: "1.5rem", width: "100%" }}
                                value={infoDiscount?.status}
                            />
                        </div>
                        <div className={classes.infoGroup}>
                            <MyTextField
                                id="startDate"
                                label="Start date"
                                variant="outlined"
                                color="var(--admin-color)"
                                disabled
                                style={{ mb: "1.5rem", width: "100%" }}
                                value={moment(infoDiscount?.startDate).format("DD/MM/YYYY")}
                            />
                            <MyTextField
                                id="expirationDate"
                                label="Expired date"
                                variant="outlined"
                                color="var(--admin-color)"
                                disabled
                                style={{ mb: "1.5rem", width: "100%" }}
                                value={moment(infoDiscount?.expirationDate).format("DD/MM/YYYY")}
                            />
                        </div>
                    </div>
                    <div>
                        <Grid2 sx={{display: "flex", justifyContent: "space-between", mb: "-1rem"}}>
                            <Typography variant="h6" sx={{fontWeight: 500}}>List product can apply</Typography>
                            <Grid2>
                                <Button
                                    sx={{ backgroundColor: "var(--admin-color)", color: "#fff" }}
                                    variant="contained"
                                    startIcon={<Sell />}
                                    onClick={()=>setIsConfirmApply(true)}
                                >
                                    Apply
                                </Button>
                            </Grid2>
                        </Grid2>
                        <TableShowProduct 
                            idDiscount={discountId}
                            setListCurrent={setListCurrentSelect}
                            listCurrentSelect={listCurrentSelect}   
                            infoProduct={infoProduct}
                            handleAfterRemoveSelected={handleAfterRemoveSelectedOrApply}
                        />
                    </div>
                    <div className={classes.container_table}>
                        <div className={classes.col_50}>
                            <TableSelectedProduct 
                                idDiscount={discountId}
                                rowsPerPage={rowsPerPage}
                                limit={rowsPerPage}
                                infoListSelected={infoListSelected}
                                handleAfterRemoveSelected={handleAfterRemoveSelectedOrApply}
                            />
                        </div>
                        <div className={classes.col_50}>
                            <TableCurrentSelect 
                                listCurrentSelected={listCurrentSelect}
                                rowsPerPage={rowsPerPage}
                                setListCurrentSelect={setListCurrentSelect}
                            />
                        </div>
                    </div>
                    <ConfirmModal 
                        isOpen={isConfirmApply}
                        handleClose={()=> setIsConfirmApply(false)}
                        onSubmit={handleApply}
                        haveAction={listCurrentSelect.length > 0}
                        title={listCurrentSelect.length > 0 ? "Apply discount" : "Can't apply"}
                        description={listCurrentSelect.length > 0 ? "Are you sure apply discount to list product are selecting ?" : "You need select at least one product"}
                    />                
                </>
            )}
            {infoDiscount && infoDiscount?.status === DISCOUNT_STATUS.EXPIRED && (
                <Box sx={{mt: "2rem"}}>
                    <Typography variant="p" sx={{fontStyle: "italic"}}>* This discount has been expired</Typography>
                </Box>
            )}
        </div>
    )
}

export default ApplyDiscount;