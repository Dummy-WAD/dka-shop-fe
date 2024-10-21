import { Card, CardActionArea, CardContent, CardMedia, Divider, Grid2, Rating, Typography } from "@mui/material"
import { FavoriteBorder, ShoppingCart } from "@mui/icons-material"
import IconButton from "../IconButton/IconButton"

const CardProduct = ({product}) => {
    return (
        <Card sx={{width: "18%"}}>
            <CardActionArea>
                <CardMedia 
                    component="img"
                    style={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '1/1' // Giữ tỉ lệ 1:1 giữa width và height
                    }}
                    image={product.primaryImage}
                />
            </CardActionArea>
            <CardContent sx={{pt: "0.5rem", pb: "1rem !important"}}>
                <Typography sx={{fontWeight: "500"}}>{product.name}</Typography>
                <Divider sx={{borderBottomWidth: "2px", my: "0.5rem"}}/>
                <Grid2 sx={{display: "flex", gap: "1.5rem", alignItems : "center"}}>
                    <Typography
                        sx={{
                            textDecoration: "line-through",
                            color: "#ccc"
                        }}
                    >
                        ${product.originPrice}
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: "500",
                            fontSize: "18px",
                            color: "#faa564",
                        }}
                    >
                        ${product.sellPrice}
                    </Typography>
                </Grid2>
                <Grid2 sx={{display: "flex", justifyContent:"space-between", mt: "0.5rem", flexWrap: "wrap"}}>
                    <Rating value={5} readOnly size="small"/>
                    <Grid2 sx={{display:"flex", gap: "0.5rem"}}>
                        <IconButton>
                            <FavoriteBorder fontSize="small" sx={{color: "#ccc"}}/>
                        </IconButton>
                        <IconButton>
                            <ShoppingCart fontSize="small" sx={{color: "#ccc"}}/>
                        </IconButton>
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    )
}

export default CardProduct