import { Typography, Button } from "@mui/material";
import classes from "./OrderSuccess.module.css"
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

const OrderSuccess = ({order}) => {
    const navigate = useNavigate();
    return (
        <div className={classes.container}>
            <Typography variant="h5" sx={{color: "#6C7275"}} >Order placed successfully! 🎉</Typography>
            <div className={classes.order_info}>
                <div className={classes.column_left}>
                    <p>Date</p>
                    <p>Bill</p>
                    <p>Payment method</p>
                </div>
                <div className={classes.column_right}>
                    <p>{moment(order.date).format("DD/MM/YYYY")}</p>
                    <p>${order.totalPrice}</p>
                    <p>{order.paymentMethod}</p>
                </div>
            </div>
            <div>
                <Button
                    variant="outlined"
                    sx={{ backgroundColor: "#264652", color: "#fff" ,textTransform: "none", fontSize: "16px", borderRadius: "30px", p: "0.5rem 1.5rem", fontWeight: 400 }}
                    onClick={()=>navigate('/purchase')}
                >
                    Purchase history
                </Button>
            </div>
        </div>
    )
}

export default OrderSuccess;