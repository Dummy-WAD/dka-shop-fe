import classes from "./TopProductStatistics.module.css";
import { ChartIcon } from "../../icon/Icon";
import StatisticsTabMenu from "./StatisticsTabMenu";
import SelectFilter from "../../components/SelectFilter/SelectFilter";
import { useEffect, useState } from "react";
import TableProductStatistics from "./TableProductStatistics";
import { handleGetRevenueTopProductsStatistics, handleGetSoldTopProductsStatistics } from "../../api/statistics";
import { TOP_NUMBER_LIST, ORDER_SORT_LIST } from "../../config/constants";

const TopProductStatistics = ({}) => {
    const [topProductsNumber, setTopProductsNumber] = useState(5);
    const [orderSort, setOrderSort] = useState("DESC");
    const [productsListSold, setProductsListSold] = useState([]);
    const [productsListRevenue, setProductsListRevenue] = useState([]);

    const fetchData = async () => {
        try {
            const params = { orderType: orderSort, limit: topProductsNumber};
            const [res1, res2] = await Promise.all([
                handleGetSoldTopProductsStatistics(params),
                handleGetRevenueTopProductsStatistics(params)
            ]);
            setProductsListSold(res1);
            setProductsListRevenue(res2);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(()=>{
        fetchData();
    },[orderSort, topProductsNumber]);

    return (
        <>
            <div className={classes.mainTitle}>
                <div className={classes.titlePage}>
                    <ChartIcon className={classes.iconStyle} />
                    <p>STATISTICS</p>
                </div>
            </div>
            <div style={{ marginTop: '10px', display: "flex", flexDirection: "column" }}>
                <StatisticsTabMenu/>
                <div>
                    <div className={classes.actions}>
                        <SelectFilter 
                            label="Top products"
                            value={topProductsNumber}
                            handleChange={(e) => setTopProductsNumber(e.target.value)}
                            menuList={TOP_NUMBER_LIST}
                        />
                        <SelectFilter 
                            label="Sort"
                            value={orderSort}
                            handleChange={(e) => setOrderSort(e.target.value)}
                            menuList={ORDER_SORT_LIST}
                        />
                    </div>
                    <div className={classes.content}>
                        <div className={classes.table}>
                            <TableProductStatistics 
                                productsList={productsListSold}
                                title="Best selling products"
                                isRevenue={false}
                            />
                        </div>
                        <div className={classes.table}>
                            <TableProductStatistics 
                                productsList={productsListRevenue}
                                title="Top revenue products"
                                isRevenue
                            />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TopProductStatistics;