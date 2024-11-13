import { Box, Button, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { changeStatusOrder } from "../../api/order";
import { toast } from "react-toastify";

const ModalConfirmChangeStatusOrder = ({
  openModal,
  setOpenModal,
  statusWantToChange,
  id,
  getOrder,
}) => {
  const successMessage = {
    CANCELLED: "Order has been successfully cancelled.",
    PACKAGING: "Order is now marked as packaged.",
    DELIVERING: "Order is now out for delivery.",
    COMPLETED: "Order has been successfully completed.",
  };
  const getModalContent = () => {
    switch (statusWantToChange) {
      case "CANCELLED":
        return {
          title: "Cancel Order",
          message: "Are you sure you want to cancel this order?",
        };
      case "PACKAGING":
        return {
          title: "Package Order",
          message:
            "The order will be marked as packaged and ready for delivery.",
        };
      case "DELIVERING":
        return {
          title: "Start Delivery",
          message:
            "The order will be marked as delivering. Do you want to proceed?",
        };
      case "COMPLETED":
        return {
          title: "Complete Order",
          message: "The order will be marked as completed. Confirm to proceed.",
        };
      default:
        return {
          title: "Update Order Status",
          message: "Do you want to update the order status?",
        };
    }
  };

  const callAPIChangeStatus = async (id, status) => {
    try {
      const response = await changeStatusOrder(id, status);
      if (response) {
        toast.success(successMessage[status]);
        setOpenModal(false);
        getOrder();
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to update order status"
      );
    }
  };

  const { title, message } = getModalContent();

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "16px",
          }}
        >
          {title}
        </Typography>
        <Typography
          id="modal-description"
          sx={{ mt: 1 }}
          style={{
            textAlign: "center",
            fontWeight: "400",
            fontSize: "18px",
            marginBottom: "16px",
          }}
        >
          {message}
        </Typography>
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "16px",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            fullWidth
            style={{
              padding: "6px",
              backgroundColor: "#274c50",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              transition: "background-color 0.3s",
              width: "170px",
            }}
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{
              padding: "6px",
              backgroundColor: "#274c50",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              transition: "background-color 0.3s",
              width: "170px",
            }}
            onClick={() => callAPIChangeStatus(id, statusWantToChange)}
          >
            Confirm
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

ModalConfirmChangeStatusOrder.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  statusWantToChange: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  getOrder: PropTypes.func.isRequired,
};

export default ModalConfirmChangeStatusOrder;
