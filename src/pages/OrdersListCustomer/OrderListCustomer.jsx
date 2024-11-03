import { useDispatch, useSelector } from "react-redux";
import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";
import classes from "./OrderListCustomer.module.css"
import { CUSTOMER } from "../../config/roles";
import { Typography, Button, Grid2, Tabs, Tab } from "@mui/material";
import MyTextField from "../../components/MyTextField/MyTextField";
import DateInput from "../../components/DateInput/DateInput";
import SelectCustom from "../../components/SelectCustom/SelectCustom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { phoneNumber as ValidPhoneNumber } from "../../validator";
import { Navigate } from "react-router-dom";
import { handleGetUserInfo } from "../../api/user";
import moment from "moment/moment";
import { handleUpdateProfileCustomer } from "../../api/personal";
import { setAuthInfo } from "../../redux/slice/authSlice";
import { MALE, FEMALE } from "../../config/gender";
import { PENDING, PACKAGED, DELIVERING, COMPLETED } from "../../config/status";
import { listOrder } from "../../config/order";
import OrderCard from "../../components/OrderCard/OrderCard";

const OrderListCustomer = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, userInfo : profile } = useSelector(state => state.auth);
    const { role, firstName : firstNameProfile, lastName: lastNameProfile } = useSelector(state => state.auth.userInfo);
    const [selectedTab, setSelectedTab] = useState("all");
    const fetchData = async () => {
        // call API
        // const res = await handleGetUserInfo();
        // dispatch(setAuthInfo({
        //     userInfo: res,
        // }));
        // handleSetAttribute(res);
    }

    useEffect(()=>{
        fetchData();
    },[]);

    const handleChange = (e, newValue) => {
        setSelectedTab(newValue);
    }

    // if (!isAuthenticated || role !== CUSTOMER) return <Navigate to="/unauthorized" />
    return (
        <>
            {/* {isAuthenticated && role == CUSTOMER && ( */}
                <div className={classes.container}>
                    <div className={classes.container_left}>
                        <SidebarProfile firstName={firstNameProfile} lastName={lastNameProfile}/>
                    </div>
                    <div className={classes.container_right}>
                        <Typography variant="h5" sx={{textAlign: "center", fontWeight: "500", mb: "3rem"}}>ORDERS</Typography>
                        <Grid2 sx={{mb: "1rem", width: "100%"}}>
                            <Tabs
                                value={selectedTab}
                                onChange={handleChange}
                                className={classes.tabs}
                                sx={{
                                    '& .MuiTabs-flexContainer': {
                                        justifyContent: "space-between",
                                    },
                                    '& .MuiTab-root': {
                                        padding: 0,
                                        flex: 1,
                                        textAlign: "center",
                                        color: '#141718',
                                    },
                                    '& .Mui-selected': {
                                        color: '#DC2626 !important',
                                    },
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: '#DC2626',
                                    },
                                }}
                            >
                                <Tab label="All orders" value="all" />
                                <Tab label="Pending" value={PENDING} />
                                <Tab label="Packaged" value={PACKAGED}/>
                                <Tab label="Delivering" value={DELIVERING}/>
                                <Tab label="Completed" value={COMPLETED}/>
                            </Tabs>
                            {listOrder.map((item)=> (
                                <OrderCard order={item} key={item.id} />
                            ))}
                        </Grid2>
                    </div>
                </div>
            {/* )} */}
        </>
    )
}

export default OrderListCustomer;