import { Navigate, useNavigate, useParams } from "react-router-dom";
import classes from "./DetailOrderCustomer.module.css";
import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";
import { useSelector } from "react-redux";
import { Grid2, Typography } from "@mui/material";
import OrderCustomerInfo from "../../components/OrderCustomerInfo/OrderCustomerInfo";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import classNames from "classnames";
import OrderCardItem from "../../components/OrderCard/OrderCardItem";
import { useEffect, useState } from "react";
import { getDetailOrder } from "../../api/order";
import { toast } from "react-toastify";
import { CUSTOMER } from "../../config/roles";

const DetailOrderCustomer = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, userInfo: user } = useSelector(
    (state) => state.auth
  );
  const { role, firstName: firstNameProfile, lastName: lastNameProfile } = user;
  
  useEffect(() => {
    const getOrder = async () => {
      try {
        const orderResponse = await getDetailOrder(id);
        console.log("orderResponse", orderResponse);
        setOrder(orderResponse);
      } catch (err) {
        console.error(err);
        toast.error(err.response.data.message);
      }
    };
    getOrder();
  }, [id]);

  if (!isAuthenticated || role !== CUSTOMER)
    return <Navigate to="/unauthorized" />;

  if (!order) return null;

  return (
    <div className={classes.container}>
      <div className={classes.container_left}>
        <SidebarProfile
          firstName={firstNameProfile}
          lastName={lastNameProfile}
        />
      </div>
      <div className={classes.container_right}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "500", mb: "2rem" }}
        >
          Detail Order
        </Typography>
        <Grid2
          sx={{
            mb: "1rem",
          }}
        >
          <div className={classNames(classes.section, classes.multipleSection)}>
            <OrderCustomerInfo
              className={classes.sectionLeft}
              user={user}
              order={order}
            />
            <OrderHistory className={classes.sectionRight} order={order} />
          </div>
          <div className={classes.section} style={{ backgroundColor: "#fff" }}>
            <Typography variant="h6" sx={{ fontSize: "20px" }}>
              Order items
            </Typography>
            <div style={{ marginTop: "5px" }}>
              {order?.orderItems.map((item, index) => {
                const { orderItem, product, product_id: productId } = item;
                const {
                  color,
                  price,
                  product_name: productName,
                  size,
                  quantity,
                } = orderItem;
                const productImageUrl = product?.productImages[0]?.image_url;
                return (
                  <div
                    key={index}
                    className={classes.orderItem}
                    onClick={() => navigate(`/product/${productId}`)}
                  >
                    <OrderCardItem
                      product={{
                        productId,
                        size,
                        color,
                        productName,
                        productImageUrl,
                        price,
                        quantity,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className={classes.breakdown}>
              <div className={classes.lineItem}>
                <div className={classes.label}>Subtotal</div>
                <div className={classes.value}>$ {order?.total}</div>
              </div>
              <div className={classes.lineItem}>
                <div className={classes.label}>Shipping fee</div>
                <div className={classes.value}>$ {order?.deliveryFee}</div>
              </div>
              <div className={classNames(classes.lineItem, classes.active)}>
                <div className={classes.label}>Total amount</div>
                <div className={classes.value}>
                  $ {Number(order?.total) + Number(order?.deliveryFee)}
                </div>
              </div>
            </div>
          </div>
        </Grid2>
      </div>
    </div>
  );
};

export default DetailOrderCustomer;
