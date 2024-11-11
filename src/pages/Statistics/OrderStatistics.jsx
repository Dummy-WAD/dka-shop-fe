import { ChartIcon } from "../../icon/Icon";
import classes from "./OrderStatistics.module.css";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { statisticsUnit } from "../../config/status";
import { toast } from "react-toastify";
import { handleGetOrderStatistics } from "../../api/statistics";
import { Typography } from "@mui/material";
import StatisticsTabMenu from "./StatisticsTabMenu";

const { YEAR, QUARTER, MONTH, WEEK } = statisticsUnit;

const initialValue = [
  {
    id: WEEK,
    label: "Number of orders in nearest weeks",
    limit: 12,
    data: [],
  },
  {
    id: MONTH,
    label: "Number of orders in nearest months",
    limit: 12,
    data: [],
  },
  {
    id: QUARTER,
    label: "Number of orders in nearest quarters",
    limit: 4,
    data: [],
  },
  {
    id: YEAR,
    label: "Number of orders in nearest years",
    limit: 4,
    data: [],
  },
];

const OrderStatistics = () => {
  const [numberOfOrderInToday, setNumberOfOrderInToday] = useState(null);
  const [orderData, setOrderData] = useState(initialValue);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const orderListResponse = await Promise.all(
          orderData.map(async ({ id, limit }) => {
            const orderResponse = await handleGetOrderStatistics({
              type: id,
              limit,
            });
            return {
              ...orderResponse,
              type: id,
            };
          })
        );
        setOrderData((prev) => {
          return prev.map((item) => {
            const { id, data } = item;
            const matchedOrder = orderListResponse.find(
              (order) => order.type === id
            );
            const newOrderList = matchedOrder ? matchedOrder?.results : [];
            return {
              ...item,
              data: [...data, ...newOrderList],
            };
          });
        });
        setNumberOfOrderInToday(orderListResponse[0]?.todayCount)
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    getOrderData();
  }, []);
  return (
    <>
      <div className={classes.mainTitle}>
        <div className={classes.titlePage}>
          <ChartIcon className={classes.iconStyle} />
          <p>STATISTICS</p>
        </div>
      </div>
      <div
        style={{ marginTop: "10px", display: "flex", flexDirection: "column" }}
      >
        <StatisticsTabMenu/>
        <div style={{marginTop: '15px'}}>
          <Typography variant="h6">Today: {numberOfOrderInToday} orders</Typography>
          <div className={classes.mainContent}>
          {orderData?.map((order) => {
            const { id, label, data } = order;
            return (
              <div key={id} className={classes.chartContainer}>
                <Typography variant="h6" gutterBottom>
                  {label}
                </Typography>
                <BarChart
                  xAxis={[
                    {
                      id: "barOrder",
                      data: data?.map(({ period }) => period),
                      scaleType: "band",
                    },
                  ]}
                  series={[
                    {
                      data: data?.map(({ count }) => count),
                      color: 'var(--user-color)',
                    },
                  ]}
                  width={500}
                  height={300}
                />
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderStatistics;
