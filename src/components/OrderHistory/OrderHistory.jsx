import { Typography } from "@mui/material";
import classNames from "classnames";
import css from "./OrderHistory.module.css";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import moment from "moment";
import { COMPLETED, DELIVERING, PACKAGING, PENDING } from "../../config/status";

const statusMessages = {
  [PENDING]: "Your order is being processed.",
  [PACKAGING]: "Your order has been packaged and is ready for shipment.",
  [DELIVERING]: "Your order is on its way. Please keep an eye on your phone.",
  [COMPLETED]: "Your order has been delivered. Thank you for shopping with us!",
};

const OrderHistory = ({ order, className }) => {
  const currentStatus = order?.status;
  const isCompleted = currentStatus === COMPLETED;
  const isDelivering = currentStatus === DELIVERING;
  const isPackaged = currentStatus === PACKAGING;
  const isPending = currentStatus === PENDING;
  const { completed, delivered, packaged } = order?.history;
  const completedTime = completed?.at;
  const deliveredTime = delivered?.at;
  const packagedTime = packaged?.at;
  const pendingTime = order?.createdAt;

  return (
    <div className={classNames(css.root || className)}>
      <Typography variant="h6" sx={{ fontSize: "20px" }}>
        Order History
      </Typography>
      <div className={css.container}>
        <Timeline sx={{ paddingTop: "0px" }}>
          {completedTime && (
            <TimelineItem
              className={classNames(css.item, {
                [css.activeColor]: isCompleted,
              })}
            >
              <TimelineSeparator>
                <TimelineDot
                  className={classNames({
                    [css.activeColor]: isCompleted,
                    [css.activeBackgroundColor]: isCompleted,
                  })}
                />
                <TimelineConnector
                  className={classNames({
                    [css.activeBackgroundColor]: isCompleted,
                  })}
                />
              </TimelineSeparator>
              <TimelineContent
                sx={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
              >
                <div style={{ whiteSpace: "nowrap" }}>
                  {moment(completedTime).format("DD/MM/YYYY hh:mm:ss")}
                </div>
                <div>
                  <div style={{ fontWeight: "500", marginBottom: "5px" }}>
                    {COMPLETED}
                  </div>
                  <div>{statusMessages.COMPLETED}</div>
                </div>
              </TimelineContent>
            </TimelineItem>
          )}
          {deliveredTime && (
            <TimelineItem
              className={classNames(css.item, {
                [css.activeColor]: isDelivering,
              })}
            >
              <TimelineSeparator>
                <TimelineDot
                  className={classNames({
                    [css.activeColor]: isDelivering,
                    [css.activeBackgroundColor]: isDelivering,
                  })}
                />
                <TimelineConnector
                  className={classNames({
                    [css.activeBackgroundColor]: isDelivering,
                  })}
                />
              </TimelineSeparator>
              <TimelineContent
                sx={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
              >
                <div style={{ whiteSpace: "nowrap" }}>
                  {moment(deliveredTime).format("DD/MM/YYYY hh:mm:ss")}
                </div>
                <div>
                  <div style={{ fontWeight: "500", marginBottom: "5px" }}>
                    {DELIVERING}
                  </div>
                  <div>{statusMessages.DELIVERING}</div>
                </div>
              </TimelineContent>
            </TimelineItem>
          )}
          {packagedTime && (
            <TimelineItem
              className={classNames(css.item, {
                [css.activeColor]: isPackaged,
              })}
            >
              <TimelineSeparator>
                <TimelineDot
                  className={classNames({
                    [css.activeColor]: isPackaged,
                    [css.activeBackgroundColor]: isPackaged,
                  })}
                />
                <TimelineConnector
                  className={classNames({
                    [css.activeBackgroundColor]: isPackaged,
                  })}
                />
              </TimelineSeparator>
              <TimelineContent
                sx={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
              >
                <div style={{ whiteSpace: "nowrap" }}>
                  {moment(packagedTime).format("DD/MM/YYYY hh:mm:ss")}
                </div>
                <div>
                  <div style={{ fontWeight: "500", marginBottom: "5px" }}>
                    {PACKAGING}
                  </div>
                  <div>{statusMessages.PACKAGING}</div>
                </div>
              </TimelineContent>
            </TimelineItem>
          )}
          <TimelineItem
            className={classNames(css.item, {
              [css.activeColor]: isPending,
            })}
          >
            <TimelineSeparator>
              <TimelineDot
                className={classNames({
                  [css.activeColor]: isPending,
                  [css.activeBackgroundColor]: isPending,
                })}
              />
              <TimelineConnector
                className={classNames({
                  [css.activeBackgroundColor]: isPending,
                })}
              />
            </TimelineSeparator>
            <TimelineContent
              sx={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
            >
              <div style={{ whiteSpace: "nowrap" }}>
                {moment(pendingTime).format("DD/MM/YYYY hh:mm:ss")}
              </div>
              <div>
                <div style={{ fontWeight: "500", marginBottom: "5px" }}>
                  {PENDING}
                </div>
                <div>{statusMessages.PENDING}</div>
              </div>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
};

export default OrderHistory;
