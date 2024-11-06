import { Typography } from "@mui/material";
import classNames from "classnames";
import css from "./OrderCustomerInfo.module.css"

const OrderCustomerInfo = ({ order, className, user }) => {
  return (
    <div className={classNames(css.root || className)}>
      <Typography variant="h6" sx={{fontSize: '20px'}}>Delivery address</Typography>
      <div className={css.container}>
        <div className={css.heading}>{order?.contactName}</div>
        <div className={css.content}>
            <div className={css.item}>{order?.phoneNumber}</div>
            <div className={css.item}>{order?.address}</div>
            <div className={css.item}>{order?.deliveryService?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderCustomerInfo;
