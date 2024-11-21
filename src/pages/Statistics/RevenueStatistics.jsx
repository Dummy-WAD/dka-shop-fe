import { ChartIcon } from "../../icon/Icon";
import classes from "./RevenueStatistics.module.css";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { statisticsUnit } from "../../config/status";
import { toast } from "react-toastify";
import { handleGetRevenueStatistics } from "../../api/statistics";
import { Typography } from "@mui/material";
import StatisticsTabMenu from "./StatisticsTabMenu";

const { YEAR, QUARTER, MONTH, WEEK } = statisticsUnit;

const initialValue = [
  {
    id: WEEK,
    label: "Revenue in nearest weeks",
    limit: 12,
    data: [],
  },
  {
    id: MONTH,
    label: "Revenue in nearest months",
    limit: 12,
    data: [],
  },
  {
    id: QUARTER,
    label: "Revenue in nearest quarters",
    limit: 4,
    data: [],
  },
  {
    id: YEAR,
    label: "Revenue in nearest years",
    limit: 4,
    data: [],
  },
];

const RevenueStatistics = () => {
  const [todayRevenue, setTodayRevenue] = useState(null);
  const [revenueData, setRevenueData] = useState(initialValue);

  useEffect(() => {
    const getRevenueData = async () => {
      try {
        const revenueListResponse = await Promise.all(
          revenueData.map(async ({ id, limit }) => {
            const revenueResponse = await handleGetRevenueStatistics({
              type: id,
              limit,
            });
            return {
              ...revenueResponse,
              type: id,
            };
          })
        );
        setRevenueData((prev) => {
          return prev.map((item) => {
            const { id } = item;
            const matchedRevenue = revenueListResponse.find(
              (revenue) => revenue.type === id
            );
            const newRevenueList = matchedRevenue
              ? matchedRevenue?.results
              : [];
            return {
              ...item,
              data: newRevenueList,
            };
          });
        });
        setTodayRevenue(revenueListResponse[0]?.todayCount);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    getRevenueData();
  }, []);

  if (!revenueData || todayRevenue === null) return null;

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
        <StatisticsTabMenu />
        <div style={{ marginTop: "15px" }}>
          <Typography variant="h6">
            Today: {todayRevenue} {`${todayRevenue > 1 ? "dollars" : "dollar"}`}
          </Typography>
          <div className={classes.mainContent}>
            {revenueData?.map((revenue) => {
              const { id, label, data } = revenue;
              const xAxis = data.map(({ period }) => period);
              const series = data.map(({ totalRevenue }) => totalRevenue);
              return (
                <div key={id} className={classes.chartContainer}>
                  <Typography variant="h6" gutterBottom>
                    {label}
                  </Typography>
                  <LineChart
                    xAxis={[
                      {
                        id: "barRevenue",
                        data: xAxis,
                        scaleType: "band",
                      },
                    ]}
                    series={[
                      {
                        data: series,
                        color: "var(--user-color)",
                      },
                    ]}
                    yAxis={[
                      {
                        label: 'Dollars',
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

export default RevenueStatistics;
