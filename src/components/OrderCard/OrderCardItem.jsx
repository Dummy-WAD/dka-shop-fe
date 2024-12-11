import { Button, Typography } from "@mui/material";
import classes from "./OrderCardItem.module.css";
import ModalCustom from "../Modal/BasicModal";
import { useBoolean } from "../../hook/useBoolean";
import CreateReview from "../Review/CreateReview";
import { COMPLETED } from "../../config/status";
const OrderCardItem = ({ product, isFromDetailOrder, orderStatus, onGetOrderDetail, handleClickOnReviewButton }) => {

  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <img
          src={product?.productImageUrl}
          alt="thumnail"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={classes.info}>
        <div>
          <Typography className={classes.name_product}>
            {product?.productName}
          </Typography>
          <Typography>
            Variant: {product?.size}, {product?.color}
          </Typography>
        </div>
        <Typography sx={{ mb: "1rem" }}>Amount: {product?.quantity}</Typography>
      </div>
      <div className={classes.price}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography>Price</Typography>
          <Typography sx={{ minWidth: "80px", textAlign: "end" }}>
            ${product?.price}
          </Typography>
        </div>
        {orderStatus === COMPLETED && isFromDetailOrder && !product?.isReviewed && (
          <Button
            variant="outlined"
            onClick={handleClickOnReviewButton}
            sx={{
              backgroundColor: "var(--admin-color)",
              color: "#fff",
              cursor: "auto",
            }}
          >
            Review
          </Button>
        )}
        {orderStatus === COMPLETED && isFromDetailOrder && product?.isReviewed && <div style={{color: "grey"}}>Reviewed</div>}
      </div>
      
    </div>
  );
};

export default OrderCardItem;
