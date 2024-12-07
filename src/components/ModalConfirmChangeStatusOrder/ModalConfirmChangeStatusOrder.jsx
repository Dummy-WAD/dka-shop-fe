import {
  Box,
  Button,
  Modal,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { useState } from "react";
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
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const cancelReasons = [
    "Product does not meet quality standards",
    "Product is currently out of stock",
    "Discrepancy in the provided shipping information",
    "Cancellation due to company policy",
    "Other",
  ];

  const successMessage = {
    CANCELLED: "Order has been successfully cancelled by admin.",
    PACKAGING: "Order is now being prepared for packaging.",
    DELIVERING: "Order is now out for delivery.",
    COMPLETED: "Order has been successfully completed.",
  };

  const getModalContent = () => {
    switch (statusWantToChange) {
      case "CANCELLED":
        return {
          title: "Cancel Order",
          message: "Choose a reason for cancellation",
        };
      case "PACKAGING":
        return {
          title: "Accept Order",
          message: "The order will be accepted. Do you want to proceed?",
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
      let data = { status };

      if (status === "CANCELLED") {
        let reason = selectedReason.trim();

        if (selectedReason === "Other") {
          reason = customReason.trim();
        }

        if (!reason) {
          toast.error("Please provide a reason for cancellation.");
          return;
        }

        data.cancelReason = reason;
      }

      const response = await changeStatusOrder(id, data);
      if (response) {
        toast.success(successMessage[status] || "Status updated successfully.");
        setOpenModal(false);
        getOrder();
      }
    } catch (err) {
      console.error("Error updating order status:", err);

      const errorMessage =
        err.response?.data?.message || "Failed to update order status.";
      toast.error(errorMessage);
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

        {statusWantToChange === "CANCELLED" && (
          <>
            <RadioGroup
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
            >
              {cancelReasons.map((reason, index) => (
                <FormControlLabel
                  key={index}
                  value={reason}
                  control={<Radio />}
                  label={reason}
                />
              ))}
            </RadioGroup>

            {selectedReason === "Other" && (
              <TextField
                label="Other reason"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={customReason}
                inputProps={{
                  maxLength: 255,
                }}
                onChange={(e) => setCustomReason(e.target.value)}
                style={{ marginTop: "16px" }}
              />
            )}
          </>
        )}

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
              backgroundColor: "white",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              width: "170px",
              border: "1px solid black",
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
