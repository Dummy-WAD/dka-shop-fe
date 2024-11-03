import { CardActionArea, Typography, Card } from "@mui/material"
import classes from "./OrderCard.module.css"
import OrderCardItem from "./OrderCardItem"
const OrderCard = ({order}) => {

    const handleAction = () => {
        console.log("Order card");
    }
    return (
        <Card sx={{borderRadius: "10px", border: "2px solid #E8ECEF", margin: "1.5rem 0"}}>
            <CardActionArea sx={{padding: "1rem"}} onClick={handleAction}>
                <div className={classes.section_header}>
                    <Typography>Order number {order?.orderId}</Typography>
                    <Typography sx={{color: "#FACC15"}}>{order?.currentStatus}</Typography>
                </div>
                <div className={classes.section_products}>
                    {order?.listOfOrderItems.map((product)=>(
                        <div className={classes.product}>
                            <OrderCardItem product={product} key={product?.productId} />
                        </div>
                    ))}
                </div>
                <div className={classes.section_footer}>
                    <Typography sx={{color: "#6C7275"}}>{order?.numberOfOrderItems} products</Typography>
                    <div className={classes.price}>
                        <Typography sx={{fontWeight: 500}}>Total:</Typography>
                        <Typography sx={{fontWeight: 500, color: "#FACC15", fontSize: "20px"}}>${order?.totalPrice}</Typography>
                    </div>
                </div>
            </CardActionArea>
        </Card>
    )
}

export default OrderCard