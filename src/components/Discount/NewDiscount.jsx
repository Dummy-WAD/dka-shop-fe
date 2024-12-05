import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import SelectCustom from "../SelectCustom/SelectCustom";
import { Add } from "@mui/icons-material";
import MyTextField from "../MyTextField/MyTextField";
import classes from "./NewDiscount.module.css";
import dayjs from "dayjs";
import { createDiscount } from "../../api/discount";
import { toast } from "react-toastify";
import DateInput from "../DateInput/DateInputPro";
import moment from "moment";
import { LoadingButton } from "@mui/lab";

const discountType = [
  {
    key: "PRICE",
    value: "By price",
  },
  {
    key: "PERCENTAGE",
    value: "By percentage",
  },
];

function NewDiscount({ handleClose }) {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [required, setRequired] = useState(true);
  const [valid, setValid] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    let isValid = true;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    isValid =
      !isNaN(startDate) &&
      !isNaN(endDate) &&
      startDate &&
      endDate &&
      type != "" &&
      value != "";
    if (!isValid)
      return { isValid: false, message: "Please fill all information" };
    else if (type == "PERCENTAGE" && value > 100)
      return { isValid: false, message: "Discount value cannot exceed 100%" };
    else if (startDate < currentDate)
      return {
        isValid: false,
        message: "Start Date must be greater than or equal to the Current Date",
      };
    else if (endDate < startDate)
      return {
        isValid: false,
        message:
          "Expiration Date must be greater than or equal to the Start Date",
      };
    else if (isNaN(value) || parseFloat(value) <= 0) {
      return {
        isValid: false,
        message: "Discount value must be a positive number",
      };
    } else return { isValid: true };
  };
  const handleSubmit = async () => {
    const { isValid, message } = validate();
    if (isValid) {
      try {
        setIsLoading(true)
        await createDiscount({
          discountType: type,
          discountValue: value,
          startDate: moment(startDate).format("YYYY-MM-DDTHH:mm:ssZ"),
          expirationDate: moment(endDate).format("YYYY-MM-DDTHH:mm:ssZ"),
        });
        toast.success("Create discount successfully", {
          autoClose: 3000,
        });
        handleClose();
      } catch (error) {
        toast.error("Create discount failed", {
          autoClose: 3000,
        });
      } finally {
        setIsLoading(false)
      }
    } else {
      setError(message);
    }
  };
  return (
    <Box sx={{ width: "500px" }}>
      <Typography variant="h5" sx={{ fontWeight: "500", textAlign: "center" }}>
        New Discount
      </Typography>
      <Box sx={{ mt: "1rem" }}>
        <div className={classes.row}>
          <SelectCustom
            id="label"
            label="Type"
            menuList={discountType}
            style={{ width: "calc(50% - 8px)" }}
            value={type}
            onChange={(e) => setType(e.target.value)}
            smallSize
          />
          {type == "PRICE" && (
            <Typography
              variant="h6"
              sx={{ fontWeight: "500", textAlign: "center" }}
            >
              $
            </Typography>
          )}
          <MyTextField
            id="value"
            label="Discount amount"
            variant="outlined"
            color="var(--admin-color)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              "& .MuiInputBase-input": {
                paddingY: "0.7rem",
              },
              ...(type == "" && { width: "calc(50% - 8px)" }),
            }}
          />
          {type == "PERCENTAGE" && (
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
            label="Start date"
            variant="outlined"
            color="var(--admin-color)"
            smallSize
            style={{ width: "60%" }}
            value={startDate && new Date(startDate)}
            onChange={(e) => {
              setStartDate(new Date(dayjs(e.target.value, "DD/MM/YYYY")));
            }}
          />
          <DateInput
            id="endDate"
            label="Expiration date"
            variant="outlined"
            color="var(--admin-color)"
            smallSize
            style={{ width: "60%" }}
            value={endDate && new Date(endDate)}
            onChange={(e) => {
              setEndDate(new Date(dayjs(e.target.value, "DD/MM/YYYY")));
            }}
          />
        </div>
        {error && (
          <div className={classes.row}>
            <p className={classes.error}>{error}</p>
          </div>
        )}
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
        startIcon={<Add />}
        onClick={handleSubmit}
      >
        Create
      </LoadingButton>
    </Box>
  );
}

export default NewDiscount;
