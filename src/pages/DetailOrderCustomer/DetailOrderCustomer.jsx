import { Navigate, useNavigate, useParams } from "react-router-dom";
import classes from "./DetailOrderCustomer.module.css";
import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";
import { useSelector } from "react-redux";
import {
  Button,
  Grid2,
  Typography,
  Modal,
  TextField,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import OrderCustomerInfo from "../../components/OrderCustomerInfo/OrderCustomerInfo";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import classNames from "classnames";
import OrderCardItem from "../../components/OrderCard/OrderCardItem";

import { getDetailOrderByCustomer, cancelOrder } from "../../api/order";

import { useCallback, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { CUSTOMER } from "../../config/roles";

const DetailOrderCustomer = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, userInfo: user } = useSelector(
    (state) => state.auth
  );
  const { role, firstName: firstNameProfile, lastName: lastNameProfile } = user;

  const reasons = [
    "Want to change delivery address",
    "Want to change to another variant or amount",
    "Changed my decision",
    "Process is too complicated",
    "Too expensive for me",
    "Other",
  ];

  const getOrder = useCallback(async () => {
    try {
      const orderResponse = await getDetailOrderByCustomer(id);
      setOrder(orderResponse);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load order details."
      );
    }
  }, [id]);

  useEffect(() => {
    getOrder();
  }, [id, getOrder]);

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
    if (event.target.value !== "Other") {
      setCancelReason("");
    }
  };

  const handleCancelOrder = async () => {
    if (selectedReason === "Other" && !cancelReason.trim()) {
      toast.error("Please enter a reason for cancellation.");
      return;
    }

    setIsLoading(true);
    try {
      await cancelOrder(id, { cancelReason: cancelReason || selectedReason });
      toast.success("Order canceled successfully.");
      setIsModalOpen(false);
      await getOrder(); // Reload order details
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel the order.");
    } finally {
      setIsLoading(false);
    }
  };

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
        <Grid2 sx={{ mb: "1rem" }}>
          <div className={classNames(classes.section, classes.multipleSection)}>
            <OrderCustomerInfo className={classes.sectionLeft} order={order} />
            <OrderHistory className={classes.sectionRight} order={order} />
          </div>
          <div className={classes.section} style={{ backgroundColor: "#fff" }}>
            <Typography variant="h6" sx={{ fontSize: "20px" }}>
              Order items
            </Typography>
            <div style={{ marginTop: "5px" }}>
              {order?.orderItems.map((item, index) => {
                const {
                  orderItem,
                  product,
                  product_id: productId,
                  isReviewed,
                } = item;
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
                        isReviewed,
                        orderItemId: orderItem?.id,
                      }}
                      orderStatus={order?.status}
                      isFromDetailOrder
                      onGetOrderDetail={getOrder}
                    />
                  </div>
                );
              })}
            </div>
            <div
              className={classes.breakdown}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                {order?.status === "PENDING" && (
                  <Button
                    variant="outlined"
                    onClick={() => setIsModalOpen(true)}
                    sx={{
                      color: "black",
                      borderColor: "black",
                      "&:hover": {
                        borderColor: "black",
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    Cancel order
                  </Button>
                )}
              </div>
              <div>
                <div className={classes.lineItem}>
                  <div className={classes.label}>Subtotal</div>
                  <div className={classes.value}>
                    $ {order?.total?.toFixed(2)}
                  </div>
                </div>
                <div className={classes.lineItem}>
                  <div className={classes.label}>Shipping fee</div>
                  <div className={classes.value}>
                    $ {order?.deliveryFee?.toFixed(2)}
                  </div>
                </div>
                <div className={classNames(classes.lineItem, classes.active)}>
                  <div className={classes.label}>Total amount</div>
                  <div className={classes.value}>
                    ${" "}
                    {(
                      Number(order?.total) + Number(order?.deliveryFee)
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid2>
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="cancel-order-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            border: "1px solid black",
          }}
        >
          <Box>
            <Typography
              id="cancel-order-modal"
              variant="h6"
              sx={{ mb: 2, color: "black", fontWeight: "bold" }}
            >
              Reason for cancellation
            </Typography>
            <RadioGroup
              value={selectedReason}
              onChange={handleReasonChange}
              sx={{ mb: 2 }}
            >
              {reasons.map((reason) => (
                <FormControlLabel
                  key={reason}
                  value={reason}
                  control={<Radio />}
                  label={reason}
                />
              ))}
            </RadioGroup>
            {selectedReason === "Other" && (
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                label="Other"
                placeholder="Enter your reason..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleCancelOrder}
              disabled={isLoading}
              fullWidth
              sx={{
                backgroundColor: isLoading ? "gray" : "black",
                color: "white",
                "&:hover": {
                  backgroundColor: isLoading ? "gray" : "#333",
                },
              }}
            >
              {isLoading ? "Processing..." : "Confirm"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsModalOpen(false)}
              fullWidth
              sx={{
                color: "black",
                borderColor: "black",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailOrderCustomer;
