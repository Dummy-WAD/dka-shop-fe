import { Button, Typography } from "@mui/material";
import classes from "./DiscountDetail.module.css";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import MyTextField from "../../components/MyTextField/MyTextField";
import { toast } from "react-toastify";
import { get } from "lodash";
import {
  handleGetDiscountDetail,
  handleGetProductListAppliedByDiscount,
} from "../../api/discount";
import moment from "moment";
import DiscountProductTable from "./DiscountProductTable";

const limit = 5;

const initialPageState = {
  page: 0,
  totalResults: null,
  totalPages: null,
};

const DiscountDetail = () => {
  const { id: discountId } = useParams();
  const [discountInfo, setDiscountInfo] = useState(null);
  const [productList, setProductList] = useState([]);
  const [pageState, setPageState] = useState(initialPageState);

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
  }, [pageState.page, discountId, fetchProductList]);

  useEffect(() => {
    const getInitialDiscountInfo = async () => {
      try {
        const discountResponse = await handleGetDiscountDetail(discountId);
        setDiscountInfo(discountResponse);
      } catch (err) {
        console.error(err);
        toast.error(get(err, "response.data.message"));
      }
    };
    getInitialDiscountInfo();
  }, [discountId]);

  if (!discountInfo) return null;

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
          Discount Detail
        </Typography>
      </div>
      <div className={classes.infoContainer}>
        <Typography variant="h6" sx={{ fontWeight: "500", mb: "20px" }}>
          Discount Information
        </Typography>
        <div className={classes.infoGroup}>
          <MyTextField
            id="id"
            label="ID"
            variant="outlined"
            color="var(--admin-color)"
            disabled
            style={{ mb: "1.5rem", width: "100%" }}
            value={discountInfo?.id}
          />
          <MyTextField
            id="discountValue"
            label="Discount value"
            variant="outlined"
            color="var(--admin-color)"
            disabled
            style={{ mb: "1.5rem", width: "100%" }}
            value={discountInfo?.discountValue}
          />
        </div>
        <div className={classes.infoGroup}>
          <MyTextField
            id="discountType"
            label="Discount type"
            variant="outlined"
            color="var(--admin-color)"
            disabled
            style={{ mb: "1.5rem", width: "100%" }}
            value={discountInfo?.discountType}
          />
          <MyTextField
            id="status"
            label="Status"
            variant="outlined"
            color="var(--admin-color)"
            disabled
            style={{ mb: "1.5rem", width: "100%" }}
            value={discountInfo?.status}
          />
        </div>
        <div className={classes.infoGroup}>
          <MyTextField
            id="startDate"
            label="Start date"
            variant="outlined"
            color="var(--admin-color)"
            disabled
            style={{ mb: "1.5rem", width: "100%" }}
            value={moment(discountInfo?.startDate).format("DD/MM/YYYY")}
          />
          <MyTextField
            id="expirationDate"
            label="Expired date"
            variant="outlined"
            color="var(--admin-color)"
            disabled
            style={{ mb: "1.5rem", width: "100%" }}
            value={moment(discountInfo?.expirationDate).format("DD/MM/YYYY")}
          />
        </div>
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

export default DiscountDetail;
