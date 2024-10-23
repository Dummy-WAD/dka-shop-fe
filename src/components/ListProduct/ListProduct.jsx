import { Grid2, Pagination, Typography } from "@mui/material";
import CardProduct from "../CardProduct/CardProduct";
import classes from "./ListProduct.module.css";

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
                    <Pagination 
                        count={totalPages} 
                        siblingCount={0}
                        boundaryCount={1}
                        onChange={handleChangePage}
                        page={page}
                        sx={{
                            "& .MuiPagination-ul": {
                                justifyContent: "center",
                            },
                            "& .MuiPaginationItem-root": {
                            backgroundColor: '#fff', 
                            color: '#000',
                            },
                            "& .Mui-selected": {
                            backgroundColor: '#faa564 !important',
                            color: '#fff',
                            },
                            "& .MuiPaginationItem-previousNext" : {
                                backgroundColor: "rgba(250, 165, 100, 0.2)",
                            },
                            "& .MuiPaginationItem-icon" : {
                                borderRadius: "90px",
                                color: "#faa564",
                            }
                        }}
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