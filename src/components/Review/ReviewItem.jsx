import { Avatar, Grid2, Rating, Typography } from "@mui/material";

const ReviewItem = ({review}) => {
    return (
        <Grid2 sx={{display: "flex", borderBottom: "1px solid #e2e2e2", p: "1.5rem 0"}}>
            <Grid2 sx={{minWidth: "80px"}}>
                <Avatar 
                        alt="avatar"
                        src={review?.avaLink || ""}
                        sx={{width: "60px", height: "60px"}}
                />
            </Grid2>
            <Grid2 sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                <Typography sx={{fontSize: "18px", fontWeight:"600"}}>{review?.customer?.lastName} {review?.customer?.firstName}</Typography>
                <Typography sx={{fontSize: "14px", color: "#757575", mt: "-.25rem"}}>Variant: {review?.orderItem?.size}, {review?.orderItem?.color}</Typography>
                <Rating value={Number(review?.rating)} readOnly size="small"/>
                <Typography>{review?.reviewText}</Typography>
            </Grid2>
        </Grid2>
    )
}

export default ReviewItem;