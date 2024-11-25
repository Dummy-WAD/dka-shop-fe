import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import SelectCustom from "../SelectCustom/SelectCustom";
import { Done } from "@mui/icons-material";
import MyTextField from "../MyTextField/MyTextField";
import classes from "./NewDiscount.module.css";
import { handleEditDiscount } from "../../api/discount";
import { toast } from "react-toastify";
import DateInput from "../DateInput/DateInputPro";
import moment from "moment";
import { PERCENTAGE, PRICE } from "../../config/status";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { LoadingButton } from "@mui/lab";

const discountTypeOptions = [
  {
    key: PRICE,
    value: "By price",
  },
  {
    key: PERCENTAGE,
    value: "By percentage",
  },
];

function EditDiscount({ handleClose, fetchDataDiscount }) {
  const currentDiscount = useSelector(
    (state) => state.discount.currentDiscountSelected
  );
  const { id, discountValue, discountType, status, startDate, expirationDate } =
    currentDiscount || {};
  const [formData, setFormData] = useState({
    id,
    discountValue,
    discountType,
    status,
    startDate,
    expirationDate,
  });
  const [isLoading, setIsLoading] = useState(false);
  if (!currentDiscount) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    let isValid = true;
    let message = "";
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const { startDate, expirationDate, discountType, discountValue } = formData;
    isValid =
      startDate && expirationDate && discountType != "" && discountValue != "";
    if (!isValid) {
      isValid = false;
      message = "Please fill all information";
    }

    if (isNaN(discountValue) || parseFloat(discountValue) <= 0) {
      isValid = false;
      message = "Discount value must be a positive number";
    }
    if (discountType == "PERCENTAGE" && discountValue > 100) {
      isValid = false;
      message = "Discount value cannot exceed 100%";
    }
    if (moment(startDate).valueOf() < moment(currentDate).valueOf()) {
      isValid = false;
      message = "Start date must be greater than or equal to the current date";
    }
    if (moment(expirationDate).valueOf() < moment(startDate).valueOf()) {
      isValid = false;
      message =
        "Expiration date must be greater than or equal to the start date";
    }
    if (isValid) {
      setIsLoading(true);
      try {
        await handleEditDiscount(id, {
          discountType,
          discountValue: parseFloat(discountValue),
          startDate: moment(startDate).format("YYYY-MM-DDTHH:mm:ssZ"),
          expirationDate: moment(expirationDate).format("YYYY-MM-DDTHH:mm:ssZ"),
        });
        toast.success("Edit discount successfully", {
          autoClose: 3000,
        });
        await fetchDataDiscount();
        handleClose();
      } catch (error) {
        console.error(error);
        toast.error(
          get(error, "response.message.data", "Update discount failed"),
          {
            autoClose: 3000,
          }
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error(message);
    }
  };

  return (
    <Box sx={{ width: "500px" }}>
      <Typography variant="h5" sx={{ fontWeight: "500", textAlign: "center" }}>
        New Discount
      </Typography>
      <Box sx={{ mt: "1rem" }}>
        <div className={classes.row}>
          <MyTextField
            id="id"
            name="id"
            label="ID"
            variant="outlined"
            color="var(--admin-color)"
            style={{ width: "60%" }}
            disabled
            smallSize
            value={formData?.id}
          />
          <MyTextField
            id="status"
            name="status"
            label="Status"
            variant="outlined"
            style={{ width: "60%" }}
            smallSize
            disabled
            color="var(--admin-color)"
            onChange={(e) => handleInputChange(e)}
            value={formData?.status}
          />
        </div>
        <div className={classes.row}>
          <SelectCustom
            id="discountType"
            name="discountType"
            label="Discount type"
            menuList={discountTypeOptions}
            style={{ width: "calc(50% - 8px)" }}
            value={formData?.discountType}
            onChange={(e) => handleInputChange(e)}
            smallSize
          />
          {formData?.discountType == PRICE && (
            <Typography
              variant="h6"
              sx={{ fontWeight: "500", textAlign: "center" }}
            >
              $
            </Typography>
          )}
          <MyTextField
            id="discountValue"
            name="discountValue"
            label="Discount amount"
            variant="outlined"
            color="var(--admin-color)"
            value={formData?.discountValue}
            onChange={(e) => handleInputChange(e)}
            style={{
              "& .MuiInputBase-input": {
                paddingY: "0.7rem",
              },
              ...(discountType == "" && { width: "calc(50% - 8px)" }),
            }}
          />
          {formData?.discountType == PERCENTAGE && (
            <Typography
              variant="h6"
              sx={{ fontWeight: "500", textAlign: "center" }}
            >
              %
            </Typography>
          )}
        </div>

        <div className={classes.row}>
          <DateInput
            id="startDate"
            name="startDate"
            label="Start date"
            variant="outlined"
            color="var(--admin-color)"
            smallSize
            style={{ width: "60%" }}
            onChange={(e) => handleInputChange(e)}
            value={moment(formData?.startDate).format("DD/MM/YYYY")}
          />
          <DateInput
            id="expirationDate"
            name="expirationDate"
            label="Expiration date"
            variant="outlined"
            color="var(--admin-color)"
            smallSize
            style={{ width: "60%" }}
            onChange={(e) => handleInputChange(e)}
            value={moment(formData?.expirationDate).format("DD/MM/YYYY")}
          />
        </div>
      </Box>
      <LoadingButton
        variant="contained"
        loading={isLoading}
        loadingPosition="start"
        sx={{
          backgroundColor: "var(--admin-color)",
          color: "#FFF",
          mt: "1.5rem",
          float: "right",
          minWidth: "150px",
        }}
        startIcon={<Done />}
        onClick={handleSubmit}
      >
        Save
      </LoadingButton>
    </Box>
  );
}

export default EditDiscount;
