import { Typography } from "@mui/material";
import classNames from "classnames";
import css from "./OrderCustomerInfo.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ADMIN } from "../../config/roles";

const OrderCustomerInfo = ({ order, className }) => {
  const { role } = useSelector((state) => state.auth.userInfo);
  return (
    <div className={classNames(css.root || className)}>
      <Typography variant="h6" sx={{ fontSize: "20px" }}>
        Delivery address
      </Typography>
      <div className={css.container}>
        <div className={css.heading}>
          <div>{order?.contactName}</div>
          {role === ADMIN && (
            <div style={{marginTop: '5px'}}>
              Customer id: 
              <Link
                to={`/admin/customer/${order?.customerId}`}
                style={{ color: "inherit", marginLeft: '5px' , textDecoration: 'underline'}}
              >
                {order?.customerId}
              </Link>
            </div>
          )}
        </div>
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
