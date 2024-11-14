import classes from "./TopCategoryStatistics.module.css";
import { ChartIcon } from "../../icon/Icon";
import StatisticsTabMenu from "./StatisticsTabMenu";
import SelectFilter from "../../components/SelectFilter/SelectFilter";
import { useEffect, useState } from "react";
import TableCategoryStatistics from "./TableCategoryStatistics";
import { handleGetSoldTopCategoriesStatistics, handleGetRevenueTopCategoriesStatistics } from "../../api/statistics";
import { TOP_NUMBER_LIST, ORDER_SORT_LIST } from "../../config/constants";

const TopCategoryStatistics = ({}) => {
    const [topCategoriesNumber, setTopCategoriesNumber] = useState(5);
    const [orderSort, setOrderSort] = useState("DESC");
    const [categoriesListSold, setCategoriesListSold] = useState([]);
    const [categoriesListRevenue, setCategoriesListRevenue] = useState([]);

    const fetchData = async () => {
        try {
            const params = { orderType: orderSort, limit: topCategoriesNumber};
            const [res1, res2] = await Promise.all([
                handleGetSoldTopCategoriesStatistics(params),
                handleGetRevenueTopCategoriesStatistics(params)
            ]);
            setCategoriesListSold(res1);
            setCategoriesListRevenue(res2);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(()=>{
        fetchData();
    },[orderSort, topCategoriesNumber]);

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
                            label="Top categories"
                            value={topCategoriesNumber}
                            handleChange={(e) => setTopCategoriesNumber(e.target.value)}
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
                            <TableCategoryStatistics 
                                categoryList={categoriesListSold}
                                title="Best selling categories"
                                isRevenue={false}
                            />
                        </div>
                        <div className={classes.table}>
                            <TableCategoryStatistics 
                                categoryList={categoriesListRevenue}
                                title="Top revenue categories"
                                isRevenue
                            />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TopCategoryStatistics;