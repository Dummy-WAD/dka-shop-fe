import { Button, Typography } from "@mui/material";
import classes from "./EditDiscount.module.css";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowBack, Done } from "@mui/icons-material";
import MyTextField from "../../components/MyTextField/MyTextField";
import { toast } from "react-toastify";
import { get } from "lodash";
import {
  handleEditDiscount,
  handleGetDiscountDetail,
  handleGetProductListAppliedByDiscount,
} from "../../api/discount";
import moment from "moment";
import DiscountProductTable from "../../components/Discount/DiscountProductTable";
import SelectCustom from "../../components/SelectCustom/SelectCustom";
import { PERCENTAGE, PRICE } from "../../config/status";
import DateInput from "../../components/DateInput/DateInputPro";

const discountTypeOptions = [
  {
    key: PRICE,
    value: PRICE,
  },
  {
    key: PERCENTAGE,
    value: PERCENTAGE,
  },
];

const limit = 5;

const initialPageState = {
  page: 0,
  totalResults: null,
  totalPages: null,
};

const EditDiscount = () => {
  const { id: discountId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isReload, setIsReload] = useState(true);
  const [productList, setProductList] = useState([]);
  const [pageState, setPageState] = useState(initialPageState);
  const [formData, setFormData] = useState({
    id: null,
    discountValue: null,
    discountType: null,
    status: null,
    startDate: null,
    expirationDate: null,
  });

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
      message = "Start Date must be greater than or equal to the Current Date";
    }
    if (moment(expirationDate).valueOf() < moment(startDate).valueOf()) {
      isValid = false;
      message =
        "Expiration Date must be greater than or equal to the Start Date";
    }
    if (isValid) {
      try {
        await handleEditDiscount(discountId, {
          discountType,
          discountValue: parseFloat(discountValue),
          startDate: moment(startDate).format("YYYY-MM-DDTHH:mm:ssZ"),
          expirationDate: moment(expirationDate).format("YYYY-MM-DDTHH:mm:ssZ"),
        });
        toast.success("Edit discount successfully", {
          autoClose: 3000,
        });
        setIsReload(!isReload);
      } catch (error) {
        console.error(error)
        toast.error(get(error, 'response.message.data', 'Update discount failed'), {
          autoClose: 3000,
        });
      }
    } else {
      toast.error(message);
    }
  };

  const handleSetPage = (page) => {
    setPageState({
      ...pageState,
      page,
    });
  };

  const fetchProductList = useCallback(
    async ({ discountId, page, limit }) => {
      try {
        const productsResponse = await handleGetProductListAppliedByDiscount(
          discountId,
          {
            page: page + 1,
            limit,
          }
        );
        setProductList(productsResponse?.results);
        setPageState({
          ...pageState,
          page: productsResponse?.page - 1,
          totalPages: productsResponse?.totalPages,
          totalResults: productsResponse?.totalResults,
        });
      } catch (err) {
        console.error(err);
        toast.error(get(err, "response.data.message"));
      }
    },
    [discountId, JSON.stringify(pageState)]
  );

  useEffect(() => {
    fetchProductList({ discountId, page: pageState.page, limit });
  }, [pageState.page, discountId, fetchProductList, isReload]);

  useEffect(() => {
    const getInitialDiscountInfo = async () => {
      try {
        const discountResponse = await handleGetDiscountDetail(discountId);
        setFormData(discountResponse);
      } catch (err) {
        console.error(err);
        toast.error(get(err, "response.data.message"));
      } finally {
        setIsLoading(false);
      }
    };
    getInitialDiscountInfo();
  }, [discountId, isReload]);

  if (isLoading) return null;

  return (
    <div>
      <div>
        <Button
          sx={{ backgroundColor: "var(--admin-color)", color: "#fff" }}
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mt: "-2rem", fontWeight: 600 }}
        >
          Edit Discount
        </Typography>
      </div>
      <div className={classes.infoContainer}>
        <Typography variant="h6" sx={{ fontWeight: "500", mb: "20px" }}>
          Discount Information
        </Typography>
        <div className={classes.infoGroup}>
          <MyTextField
            id="id"
            name="id"
            label="ID"
            variant="outlined"
            color="var(--admin-color)"
            disabled
            style={{ mb: "1.5rem", flex: 1 }}
            value={formData?.id}
          />
          <MyTextField
            id="discountValue"
            name="discountValue"
            label="Discount value"
            variant="outlined"
            color="var(--admin-color)"
            style={{ mb: "1.5rem", flex: 1 }}
            value={formData?.discountValue}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className={classes.infoGroup}>
          <SelectCustom
            id="discountType"
            name="discountType"
            label="Discount type"
            menuList={discountTypeOptions}
            style={{ mb: "1.5rem", flex: 1 }}
            value={formData?.discountType}
            onChange={(e) => handleInputChange(e)}
          />
          <MyTextField
            id="status"
            name="status"
            label="Status"
            variant="outlined"
            disabled
            color="var(--admin-color)"
            style={{ mb: "1.5rem", flex: 1 }}
            onChange={(e) => handleInputChange(e)}
            value={formData?.status}
          />
        </div>
        <div className={classes.infoGroup}>
          <DateInput
            id="startDate"
            name="startDate"
            label="Started date"
            variant="outlined"
            color="var(--admin-color)"
            className={classes.dateInput}
            style={{ mb: "1.5rem", flex: 1 }}
            onChange={(e) => handleInputChange(e)}
            value={moment(formData?.startDate).format("DD/MM/YYYY")}
          />
          <DateInput
            id="expirationDate"
            name="expirationDate"
            label="Expired date"
            variant="outlined"
            className={classes.dateInput}
            color="var(--admin-color)"
            style={{ mb: "1.5rem", flex: 1 }}
            onChange={(e) => handleInputChange(e)}
            value={moment(formData?.expirationDate).format("DD/MM/YYYY")}
          />
        </div>
      </div>
      <div className={classes.action_buttons}>
        <Button
          sx={{ backgroundColor: "var(--admin-color)", color: "#fff" }}
          variant="contained"
          startIcon={<Done />}
          onClick={() => handleSubmit()}
        >
          Edit
        </Button>
      </div>
      <div className={classes.container}>
        <Typography variant="h6" sx={{ fontWeight: "500" }}>
          Applied products
        </Typography>
        <DiscountProductTable
          data={productList}
          rowsPerPage={limit}
          onSetPage={handleSetPage}
          page={pageState?.page}
          totalResults={pageState?.totalResults}
        />
      </div>
    </div>
  );
};

export default EditDiscount;
