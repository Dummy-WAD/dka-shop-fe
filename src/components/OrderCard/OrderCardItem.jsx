import { Grid2, Typography } from "@mui/material";
import classes from "./OrderCardItem.module.css"
const OrderCardItem = ({product}) => {
    return (
        <div className={classes.container}>
            <div className={classes.image}>
                <img src={product?.productImageUrl} alt="thumnail" />
            </div>
            <div className={classes.info}>
                <div>
                    <Typography className={classes.name_product}>
                        {product?.productName}
                    </Typography>
                    <Typography>Variant: {product?.size}, {product?.color}</Typography>
                </div>
                <Typography sx={{mb: "1rem"}}>Amount: {product?.orderItemQuantity}</Typography>
            </div>
            <div className={classes.price}>
                <Typography>Price</Typography>
                <Typography>${product?.orderItemPrice}</Typography>
            </div>
        </div>
    )
}

export default OrderCardItem;