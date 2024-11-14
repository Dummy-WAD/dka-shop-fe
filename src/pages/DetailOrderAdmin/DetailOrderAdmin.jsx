import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import classes from "./DetailOrderAdmin.module.css";
import { useSelector } from "react-redux";
import { Button, Grid2, Typography } from "@mui/material";
import OrderCustomerInfo from "../../components/OrderCustomerInfo/OrderCustomerInfo";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import classNames from "classnames";
import OrderCardItem from "../../components/OrderCard/OrderCardItem";
import { useEffect, useState } from "react";
import { getDetailOrderByAdmin } from "../../api/order";
import { toast } from "react-toastify";
import { ADMIN } from "../../config/roles";
import { ArrowBack } from "@mui/icons-material";
import ButtonChangeStatusOrder from "../../components/ButtonChangeStatusOrder/ButtonChangeStatusOrder";

const DetailOrderAdmin = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, userInfo: user } = useSelector(
    (state) => state.auth
  );
  const { role } = user;

  const getOrder = async () => {
    try {
      const orderResponse = await getDetailOrderByAdmin(id);
      setOrder(orderResponse);
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getOrder();
  }, [id]);

  if (!isAuthenticated || role !== ADMIN)
    return <Navigate to="/unauthorized" />;

  if (!order) return null;

  return (
    <div className={classes.container}>
      <Link to="/admin/order">
        <Button
          sx={{
            backgroundColor: "var(--admin-color)",
            color: "#fff",
            position: "absolute",
            left: 0,
            top: 0,
          }}
          variant="contained"
          startIcon={<ArrowBack />}
        >
          Back
        </Button>
      </Link>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontWeight: "500", mb: "2rem" }}
      >
        Detail Order
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "500",
          mb: "1rem",
          fontSize: "18px",
        }}
      >
        # Order id: <span>{order?.id}</span>
      </Typography>
      <Grid2
        sx={{
          mb: "1rem",
          display: "flex",
          border: " 1px solid #00000017",
        }}
      >
        <div className={classNames(classes.section, classes.multipleSection)}>
          <OrderCustomerInfo className={classes.sectionTop} order={order} />
          <OrderHistory className={classes.sectionBottom} order={order} />
        </div>
        <div className={classes.section} style={{ backgroundColor: "#fff" }}>
          <Typography variant="h6" sx={{ fontSize: "20px" }}>
            Order items
          </Typography>
          <div style={{ marginTop: "15px" }}>
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
                  onClick={() => navigate(`/admin/product/${productId}`)}
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

          <ButtonChangeStatusOrder order={order} getOrder={getOrder} />
        </div>
      </Grid2>
    </div>
  );
};

export default DetailOrderAdmin;
