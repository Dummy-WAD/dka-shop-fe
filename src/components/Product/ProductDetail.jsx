import { useDispatch, useSelector } from "react-redux";
import { Grid2, Button, Typography } from "@mui/material";
import classes from "./ProductDetail.module.css"
import { ArrowBack } from "@mui/icons-material";
import MyTextField from "../MyTextField/MyTextField";
import TableProductVarian from "./TableProductVarian";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailProductForAdminById } from "../../api/product";
import { setListProductInfo } from "../../redux/slice/productSlice";
import ListImage from "../ListImage/ListImage";

const ProductDetail = ({}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {product} = useSelector(state => state.product)

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const res = await getDetailProductForAdminById(id);
                dispatch(setListProductInfo({
                    product: res,
                }))
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    },[])

    return (
        <div>
            <div>
                <Link to="/admin/product">
                    <Button
                        sx={{backgroundColor: "var(--admin-color)", color: "#fff"}}
                        variant="contained"
                        startIcon={<ArrowBack/>}
                        onClick={() => window.history.back()}
                    >
                        Back
                    </Button>
                </Link>
                <Typography variant="h5" sx={{textAlign: "center", mt: "-2rem", fontWeight: 600}}>Product Detail</Typography>
            </div>
            <div className={classes.container}>
                <div className={classes.container_left}>
                    <ListImage primaryImage={product.primaryImage} otherImages={product.otherImages} />
                </div>
                <div className={classes.container_right}>
                    <div className={classes.row}>
                        <MyTextField id="id" label="ID" variant="outlined" color="var(--admin-color)" disabled style={{mb: "1.5rem", width: "50%"}} value={product.id}/>
                        <MyTextField id="name" label="Name" variant="outlined" color="var(--admin-color)" disabled style={{mb: "1.5rem", width: "50%"}} value={product.name}/>
                    </div>
                    <div className={classes.row}>
                        <MyTextField id="price" label="Price" variant="outlined" color="var(--admin-color)" disabled style={{mb: "1.5rem", width: "50%"}} value={product.price}/>
                        <MyTextField id="category" label="Category" variant="outlined" color="var(--admin-color)" disabled style={{mb: "1.5rem", width: "50%"}} value={product?.category?.name ?? "no category"}/>
                    </div>
                    <div className={classes.row}>
                        <MyTextField id="description" label="Description" variant="outlined" multiline rows={4} color="var(--admin-color)" disabled style={{width: "100%"}} value={product.description}/>
                    </div>
                    <Grid2>
                        <TableProductVarian productVarians={product.productVariants} rowsPerPage={5} />
                    </Grid2>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;