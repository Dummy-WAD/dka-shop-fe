import { Box, Typography, Button } from "@mui/material";
import { useRef } from "react";
import MyTextField from "../MyTextField/MyTextField";
import { Edit } from "@mui/icons-material";
import { toast } from "react-toastify";

const SecondaryEditVariantModal = ({ variant, variantList, onEditVariant }) => {
  const sizeRef = useRef("");
  const colorRef = useRef("");
  const increaseRef = useRef("");
  const decreaseRef = useRef("");
  const handleSubmit = () => {
    const size = sizeRef.current.value.trim();
    const color = colorRef.current.value.trim();
    const increase = increaseRef.current.value.trim();
    const decrease = decreaseRef.current.value.trim();
    if (!size || !color) {
      toast.error("Please fill in all the information", {
        autoClose: 3000,
      });
      return;
    }
    const increaseNumber = parseInt(increase, 10);
    if (increase) {
      if (
        isNaN(increaseNumber) ||
        increaseNumber < 0 ||
        increaseNumber.toString() !== increase
      ) {
        toast.error("The increase value must be an integer greater than or equal to 0", {
          autoClose: 3000,
        });
        return;
      }
    }

    const decreaseNumber = parseInt(decrease, 10);
    if (decrease) {
      if (
        isNaN(decreaseNumber) ||
        decreaseNumber < 0 ||
        decreaseNumber.toString() !== decrease
      ) {
        toast.error("The decrease value must be an integer greater than or equal to 0", {
          autoClose: 3000,
        });
        return;
      }
    }

    if (increaseNumber >= 0 && decreaseNumber >= 0) {
      toast.error("Only fill value in increase or decrease input", {
        autoClose: 3000,
      });
      return;
    }

    if(decreaseNumber && decreaseNumber > variant?.quantity) {
      toast.error("The decrease value must be smaller than the quantity", {
        autoClose: 3000,
      });
      return;
    }

    const check = variantList.find(
      (item) =>
        item.id !== variant?.id &&
        item.color.toLowerCase() === color.toLowerCase() &&
        item.size.toLowerCase() === size.toLowerCase()
    );
    if (check) {
      toast.error("There is already this variant", {
        autoClose: 3000,
      });
      return;
    }
    const { changeValue, isPositive } = increaseNumber
      ? {
          changeValue: increaseNumber,
          isPositive: true,
        }
      : decreaseNumber
      ? {
          changeValue: decreaseNumber,
          isPositive: false,
        }
      : { changeValue: 0, isPositive: true };
    const editVariant = {
      id: variant?.id,
      size,
      color,
      quantity: variant?.quantity,
      changeValue,
      isPositive,
    };
    onEditVariant(editVariant);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: "500", textAlign: "center" }}>
        Edit Variant
      </Typography>
      <Box sx={{ mt: "2rem" }}>
        <MyTextField
          id="size"
          defaultValue={variant?.size}
          label="Size"
          variant="outlined"
          color="var(--admin-color)"
          fullWidth
          style={{ mb: "1.5rem" }}
          ref={sizeRef}
        />
        <MyTextField
          id="color"
          defaultValue={variant?.color}
          label="Color"
          variant="outlined"
          color="var(--admin-color)"
          fullWidth
          style={{ mb: "1.5rem" }}
          ref={colorRef}
        />
        <MyTextField
          id="quantity"
          defaultValue={variant?.quantity}
          label="Quantity"
          variant="outlined"
          color="var(--admin-color)"
          fullWidth
          style={{ mb: "1.5rem" }}
          disabled
        />
        <MyTextField
          id="increase"
          defaultValue={variant?.isPositive ? variant?.changeValue : ""}
          label="Increase"
          variant="outlined"
          color="var(--admin-color)"
          fullWidth
          style={{ mb: "1.5rem" }}
          ref={increaseRef}
        />
        <MyTextField
          id="decrease"
          defaultValue={!variant?.isPositive ? variant?.changeValue : ""}
          label="Decrease"
          variant="outlined"
          color="var(--admin-color)"
          fullWidth
          style={{ mb: "1.5rem" }}
          ref={decreaseRef}
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "var(--admin-color)",
          color: "#FFF",
          mt: "1.5rem",
          float: "right",
          minWidth: "150px",
        }}
        startIcon={<Edit />}
        onClick={handleSubmit}
      >
        Edit
      </Button>
    </Box>
  );
};

export default SecondaryEditVariantModal;
