import { ChartIcon } from "../../icon/Icon";
import classes from "./UserStatistics.module.css";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { statisticsUnit } from "../../config/status";
import { toast } from "react-toastify";
import { handleGetCustomerStatistics } from "../../api/statistics";
import { Typography } from "@mui/material";
import StatisticsTabMenu from "./StatisticsTabMenu";

const { YEAR, QUARTER, MONTH, WEEK } = statisticsUnit;

const initialValue = [
  {
    id: WEEK,
    label: "Number of new users in nearest weeks",
    limit: 12,
    data: [],
  },
  {
    id: MONTH,
    label: "Number of new users in nearest months",
    limit: 12,
    data: [],
  },
  {
    id: QUARTER,
    label: "Number of new users in nearest quarters",
    limit: 4,
    data: [],
  },
  {
    id: YEAR,
    label: "Number of new users in nearest years",
    limit: 4,
    data: [],
  },
];

const UserStatistics = () => {
  const [numberOfCustomerInToday, setNumberOfCustomerInToday] = useState(null);
  const [customerData, setCustomerData] = useState(initialValue);

  useEffect(() => {
    const getCustomerData = async () => {
      try {
        const customerListResponse = await Promise.all(
          customerData.map(async ({ id, limit }) => {
            const customerResponse = await handleGetCustomerStatistics({
              type: id,
              limit,
            });
            return {
              ...customerResponse,
              type: id,
            };
          })
        );
        setCustomerData((prev) => {
          return prev.map((item) => {
            const { id, data } = item;
            const matchedCustomer = customerListResponse.find(
              (item) => item.type === id
            );
            const newCustomerList = matchedCustomer ? matchedCustomer?.results : [];
            return {
              ...item,
              data: [...data, ...newCustomerList],
            };
          });
        });
        setNumberOfCustomerInToday(customerListResponse[0]?.todayCount)
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    getCustomerData();
  }, []);

  if(!customerData || numberOfCustomerInToday === null) return null

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
          <Typography variant="h6">Today: {numberOfCustomerInToday} users</Typography>
          <div className={classes.mainContent}>
          {customerData?.map((customer) => {
            const { id, label, data } = customer;
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

export default UserStatistics;
