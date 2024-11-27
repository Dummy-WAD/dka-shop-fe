import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Modal, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSummary from "./CheckoutSummary";
import ProductTable from "./ProductTablePaymentDetail";
import ShippingAddress from "./ShippingAddress";
import { getTotalCartItems, placeOrder } from "../../api/cart";
import cartSlice from "../../redux/slice/cartSlice";
import css from "./PaymentDetail.module.css";
import { getTotalNotifications } from "../../api/notification";
import { setTotalNotificationItems } from "../../redux/slice/notificationSlice";

const PaymentDetail = ({
  valuePaymentDetails,
  setValue,
  setValueOrderSuccess,
}) => {
  const { preparedOrderItems, deliveryService, productCost, totalCost } =
    valuePaymentDetails;
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openModalPriceChanged, setModalPriceChanged] = useState(false);
  const [openModalDeliveryFeeChanged, setModalDeliveryFeeChanged] =
    useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const userRole = useSelector((state) => state.auth.userInfo.role);

  const createCartData = (
    preparedOrderItems,
    deliveryService,
    selectedAddress
  ) => ({
    orderItems: preparedOrderItems.map((item) => ({
      productVariantId: item.productVariantId,
      quantity: item.quantity,
      currentPrice: item.price,
    })),
    deliveryService: {
      id: deliveryService.id,
      deliveryFee: deliveryService.deliveryFee,
    },
    addressId: selectedAddress.id,
  });

  const handlePlaceOrder = async () => {
    try {
      const data = createCartData(
        preparedOrderItems,
        deliveryService,
        selectedAddress
      );
      const response = await placeOrder(data);
      if (response) {
        toast.success("Order placed successfully");
        const [cartsCount, notificationCount] = await Promise.all([
          getTotalCartItems(),
          getTotalNotifications(userRole),
        ]);

        if (notificationCount)
          dispatch(
            setTotalNotificationItems(notificationCount.notificationsCount)
          );
        dispatch(
          cartSlice.actions.setTotalCartItems(cartsCount.totalCartItems)
        );
        setValueOrderSuccess(response);
        setValue("3");
      }
    } catch (error) {
      console.error(error);
      const { code, message } = error.response.data;
      if (code === 400) {
        switch (message) {
          case "Quantity of product is not enough!":
            setOpenModal(true);
            break;
          case "Price of product has changed!":
            setModalPriceChanged(true);
            break;
          case "Delivery fee has changed!":
            setModalDeliveryFeeChanged(true);
            break;
          default:
            toast.error("Failed to place order");
        }
      } else {
        toast.error("Failed to place order");
      }
    }
  };

  const renderModal = (open, setOpen, title, description) => (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 1 }}>
          {description}
        </Typography>
        <Button
          onClick={() => {
            setOpen(false);
            setValue("1");
          }}
          variant="contained"
          sx={{ ...buttonStyle, mt: 2 }}
          fullWidth
        >
          OK
        </Button>
      </Box>
    </Modal>
  );

  return (
    <div className={css.paymentDetailContainer}>
      <ShippingAddress
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
      <ProductTable products={preparedOrderItems} />
      <CheckoutSummary
        deliveryService={deliveryService}
        productCost={productCost}
        totalCost={totalCost}
        handlePlaceOrder={handlePlaceOrder}
      />

      {renderModal(
        openModal,
        setOpenModal,
        "Out of Stock",
        "The quantity you requested exceeds the available stock. Please check the new quantity."
      )}
      {renderModal(
        openModalPriceChanged,
        setModalPriceChanged,
        "Price Changed",
        "The price of this product has been updated. Please check the new price."
      )}
      {renderModal(
        openModalDeliveryFeeChanged,
        setModalDeliveryFeeChanged,
        "Delivery Fee Changed",
        "The delivery fee has been updated. Please check the new delivery fee."
      )}
    </div>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 3,
};

const buttonStyle = {
  padding: "6px",
  backgroundColor: "#274c50",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

PaymentDetail.propTypes = {
  valuePaymentDetails: PropTypes.shape({
    preparedOrderItems: PropTypes.array.isRequired,
    deliveryService: PropTypes.object.isRequired,
    productCost: PropTypes.number.isRequired,
    totalCost: PropTypes.number.isRequired,
  }).isRequired,
  setValue: PropTypes.func.isRequired,
  setValueOrderSuccess: PropTypes.func.isRequired,
};

export default PaymentDetail;
