import { useSelector } from "react-redux";
import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";
import classes from "./OrderListCustomer.module.css"
import { CUSTOMER } from "../../config/roles";
import { Typography, Grid2, Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { PENDING, PACKAGED, DELIVERING, COMPLETED } from "../../config/status";
import OrderCard from "../../components/OrderCard/OrderCard";
import PaginationCustom from "../../components/Pagination/Pagination";
import { getAllOrder } from "../../api/order";

const LIMIT = 10;

const OrderListCustomer = () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    const { role, firstName : firstNameProfile, lastName: lastNameProfile } = useSelector(state => state.auth.userInfo);
    const [orderList, setOrderList] = useState([]);
    const [selectedTab, setSelectedTab] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        try{
            const res = await getAllOrder({
                ...(selectedTab && selectedTab != "all" && {status: selectedTab}),
                limit: LIMIT, 
                page,
            });
            setOrderList(res.results);
            setPage(res.page);
            setTotalPages(res.totalPages);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchData();
    },[page, selectedTab])

    const handleChange = (e, newValue) => {
        setSelectedTab(newValue);
        setPage(1);
    }

    const handleChangePage = (e, newValue) => {
        setPage(newValue);
    }

    if (!isAuthenticated || role !== CUSTOMER) return <Navigate to="/unauthorized" />
    return (
        <>
            {isAuthenticated && role == CUSTOMER && (
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
                            {orderList.map((item)=> (
                                <OrderCard order={item} key={item.orderId} />
                            ))}
                            {orderList.length > 0 ? (
                                <Grid2>
                                    <PaginationCustom 
                                        page={page}
                                        totalPages={totalPages}
                                        handleChangePage={handleChangePage}
                                    />
                                </Grid2>
                            ) : (
                                <Grid2 sx={{ textAlign: "center", padding: "1rem 0", mt: "1rem" }}>
                                    No orders available
                                </Grid2>
                            )}
                        </Grid2>
                    </div>
                </div>
            )}
        </>
    )
}

export default OrderListCustomer;