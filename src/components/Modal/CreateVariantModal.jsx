import { Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRef } from "react";
import MyTextField from "../MyTextField/MyTextField";
import { toast } from "react-toastify";

const CreateVariantModal = ({ onCreateVariant, variantList }) => {
  const sizeRef = useRef("");
  const colorRef = useRef("");
  const quantityRef = useRef("");
  const handleSubmit = () => {
    const size = sizeRef.current.value.trim();
    const color = colorRef.current.value.trim();
    const quantity = quantityRef.current.value.trim();
    if (!size || !color || !quantity) {
      toast.error("Please fill in all the information", {
        autoClose: 3000,
      });
      return;
    }
    const quantityInput = quantity.trim();
    const quantityNumber = parseInt(quantityInput, 10);
    if (
      isNaN(quantityNumber) ||
      quantityNumber < 0 ||
      quantityNumber.toString() !== quantityInput
    ) {
      toast.error("Quantity must be an integer greater than or equal to 0", {
        autoClose: 3000,
      });
      return;
    }
    const check = variantList.find(
      (item) =>
        item.color.toLowerCase() === color.toLowerCase() && item.size.toLowerCase() === size.toLowerCase()
    );
    if (check) {
      toast.error("There is already this variant", {
        autoClose: 3000,
      });
      return;
    }
    const createdVariant = {
      size,
      color,
      quantity,
    };
    onCreateVariant(createdVariant);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: "500", textAlign: "center" }}>
        Create Variant
      </Typography>
      <Box sx={{ mt: "2rem" }}>
        <MyTextField
          id="size"
          label="Size"
          variant="outlined"
          color="var(--admin-color)"
          fullWidth
          style={{ mb: "1.5rem" }}
          ref={sizeRef}
        />
        <MyTextField
          id="color"
          label="Color"
          variant="outlined"
          color="var(--admin-color)"
          fullWidth
          style={{ mb: "1.5rem" }}
          ref={colorRef}
        />
        <MyTextField
          id="quantity"
          label="Quantity"
          variant="outlined"
          color="var(--admin-color)"
          fullWidth
          style={{ mb: "1.5rem" }}
          ref={quantityRef}
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
        startIcon={<Add />}
        onClick={handleSubmit}
      >
        Create
      </Button>
    </Box>
  );
};

export default CreateVariantModal;
