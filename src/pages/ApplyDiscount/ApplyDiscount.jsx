import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import { Box, Button, CircularProgress, Grid2, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import TableSelectedProduct from "./TableSelectedProduct";
import TableShowProduct from "./TableShowProduct";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPageSelected, setCurrentPageShow, setKeywordApply } from "../../redux/slice/discountSlice";
import classes from "./ApplyDiscount.module.css";
import TableCurrentSelect from "./TableCurrentSelect";
import { Sell } from "@mui/icons-material";
import {DeleteModal as ConfirmModal}from "../../components/Modal/DeleteModal";
import { applyDiscount, handleGetDiscountDetail, handleGetProductByDiscount } from "../../api/discount";
import { toast } from "react-toastify";
import { DISCOUNT_STATUS } from "../../config/status";
import MyTextField from "../../components/MyTextField/MyTextField";
import moment from "moment/moment";
import SearchInput from "../../components/SearchInput/SearchInput";
import SelectFilter from "../../components/SelectFilter/SelectFilter";

const rowsPerPage = 5;

const FILTER_OPTIONS = [
    {
        key: "all",
        value: "All",
    },
    {
        key: "SELECTED",
        value: "Selected",
    }
]

const ApplyDiscount = ({}) => {
    const {id: discountId} = useParams();
    const dispatch = useDispatch();

    const refInput = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const {pageSelected, pageShow, orderApply, searchApply} = useSelector(state => state.discount);
    const [listCurrentSelect, setListCurrentSelect] = useState([]);
    const [infoListSelected, setInfoListSelected] = useState();
    const [infoProduct, setInfoProduct] = useState();
    const [isConfirmApply, setIsConfirmApply] = useState(false);
    const [infoDiscount, setInfoDiscount] = useState();
    const [statusFilter, setStatusFilter] = useState("all");

    const handleSearch = () => {
        dispatch(setKeywordApply(refInput.current.value.trim()));
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
          handleSearch();
        }
    };
    
    useEffect(() => {
        refInput?.current?.addEventListener("keypress", handleKeyPress);
        return () => {
          refInput?.current?.removeEventListener("keypress", handleKeyPress);
          dispatch(setKeywordApply(""));
        };
    }, [infoDiscount, statusFilter]);
    
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
                keyword: searchApply,
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
    },[pageShow, orderApply, searchApply]);

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

    useEffect(()=>{
        if (statusFilter === "all") {
            dispatch(setCurrentPageShow(0));
        }
    },[statusFilter])

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
                <Typography variant="h5" sx={{textAlign: "center", mt: "-2rem", fontWeight: 500}}>Discount details</Typography>
            </div>
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
            <Grid2 sx={{mt: "-1.5rem"}}>
                <TableSelectedProduct 
                    idDiscount={discountId}
                    rowsPerPage={rowsPerPage}
                    limit={rowsPerPage}
                    infoListSelected={infoListSelected}
                    handleAfterRemoveSelected={handleAfterRemoveSelectedOrApply}
                />
            </Grid2>
            <Grid2>
                <Typography variant="h5" sx={{textAlign: "center", fontWeight: 500}}>Apply discount on product</Typography>
                {infoDiscount && infoDiscount?.status !== DISCOUNT_STATUS.EXPIRED && (
                <>
                    <div>
                        <Grid2 sx={{display: "flex", justifyContent: "space-between", mt: "2rem", mb: "-1rem"}}>
                            <Typography variant="h6" sx={{fontWeight: 500}}>{statusFilter === "all" ? "List product can apply" : "List products are selecting"}</Typography>
                            <Grid2 sx={{display: "flex", gap: "1rem"}}>
                                {statusFilter === "all" && (
                                    <SearchInput 
                                        placeholder="Search"
                                        inputRef={refInput}
                                        onSearch={handleSearch}
                                    />
                                )}
                                <SelectFilter 
                                    label="Filter"
                                    value={statusFilter}
                                    handleChange={(e) => setStatusFilter(e.target.value)}
                                    menuList={FILTER_OPTIONS}
                                />
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
                        {statusFilter === "all" && (                          
                            <TableShowProduct 
                                idDiscount={discountId}
                                setListCurrent={setListCurrentSelect}
                                listCurrentSelect={listCurrentSelect}   
                                infoProduct={infoProduct}
                                handleAfterRemoveSelected={handleAfterRemoveSelectedOrApply}
                            />
                        )}
                        {statusFilter === "SELECTED" && (
                            <TableCurrentSelect 
                                listCurrentSelected={listCurrentSelect}
                                rowsPerPage={rowsPerPage}
                                setListCurrentSelect={setListCurrentSelect}
                            />
                        )}
                    </div>
                    <ConfirmModal 
                        isOpen={isConfirmApply}
                        handleClose={()=> setIsConfirmApply(false)}
                        onSubmit={handleApply}
                        haveAction={listCurrentSelect.length > 0}
                        title={listCurrentSelect.length > 0 ? "Apply discount" : "Can't apply"}
                        description={listCurrentSelect.length > 0 ? "Are you sure apply discount to list product are selecting ?" : "You need select at least one product"}
                    />                
                </>)}
                {infoDiscount && infoDiscount?.status === DISCOUNT_STATUS.EXPIRED && (
                    <Box sx={{mt: "1rem", textAlign: "center"}}>
                        <Typography variant="p" sx={{fontStyle: "italic"}}>* This discount has been expired</Typography>
                    </Box>
                )}
            </Grid2>
        </div>
    )
}

export default ApplyDiscount;