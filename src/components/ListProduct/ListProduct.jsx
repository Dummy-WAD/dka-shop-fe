import { Grid2, Typography } from "@mui/material";
import CardProduct from "../CardProduct/CardProduct";
import classes from "./ListProduct.module.css";
import PaginationCustom from "../Pagination/Pagination";

const ListProduct = ({page, onChangePage, listProducts, totalPages}) => {
    const handleChangePage = (e, value) => {
        onChangePage(value);
    }
    return (
        <div className={classes.container}>
            {listProducts.length > 0 &&
            <>
                <div className={classes.list_product}>
                    {listProducts.map((item, index)=> (
                        <CardProduct key={index} product={item} />
                    ))}
                </div>
                <Grid2 sx={{mt: "1rem", mb: "2rem"}}>
                    <PaginationCustom 
                        page={page}
                        totalPages={totalPages}
                        handleChangePage={handleChangePage}
                    />
                </Grid2>
            </>}
            {listProducts.length === 0 && 
                <Typography sx={{textAlign: "center", py: "1rem"}}>No result found</Typography>
            }
        </div>
    )
}

export default ListProduct;