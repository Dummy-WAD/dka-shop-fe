import { Grid2, Pagination } from "@mui/material";
import CardProduct from "../CardProduct/CardProduct";
import classes from "./ListProduct.module.css"

const listProduct =  [
    {
        primaryImage: "https://i.pinimg.com/736x/b0/07/2a/b0072a58fcac835d79f4b7727cd3e730.jpg",
        name: "Chen Yi Heng",
        originPrice: 200,
        sellPrice: 180,
    },
    {
        primaryImage: "https://i.pinimg.com/736x/b0/07/2a/b0072a58fcac835d79f4b7727cd3e730.jpg",
        name: "Chen Yi Heng",
        originPrice: 200,
        sellPrice: 180,
    },
    {
        primaryImage: "https://i.pinimg.com/736x/b0/07/2a/b0072a58fcac835d79f4b7727cd3e730.jpg",
        name: "Chen Yi Heng",
        originPrice: 200,
        sellPrice: 180,
    },
    {
        primaryImage: "https://i.pinimg.com/736x/b0/07/2a/b0072a58fcac835d79f4b7727cd3e730.jpg",
        name: "Chen Yi Heng",
        originPrice: 200,
        sellPrice: 180,
    },
    {
        primaryImage: "https://i.pinimg.com/736x/b0/07/2a/b0072a58fcac835d79f4b7727cd3e730.jpg",
        name: "Chen Yi Heng",
        originPrice: 200,
        sellPrice: 180,
    },
    {
        primaryImage: "https://i.pinimg.com/736x/b0/07/2a/b0072a58fcac835d79f4b7727cd3e730.jpg",
        name: "Chen Yi Heng",
        originPrice: 200,
        sellPrice: 180,
    },
    {
        primaryImage: "https://i.pinimg.com/736x/b0/07/2a/b0072a58fcac835d79f4b7727cd3e730.jpg",
        name: "Chen Yi Heng",
        originPrice: 200,
        sellPrice: 180,
    },
    {
        primaryImage: "https://i.pinimg.com/736x/b0/07/2a/b0072a58fcac835d79f4b7727cd3e730.jpg",
        name: "Chen Yi Heng",
        originPrice: 200,
        sellPrice: 180,
    },
    {
        primaryImage: "https://i.pinimg.com/736x/b0/07/2a/b0072a58fcac835d79f4b7727cd3e730.jpg",
        name: "Chen Yi Heng",
        originPrice: 200,
        sellPrice: 180,
    },
    {
        primaryImage: "https://i.pinimg.com/736x/b0/07/2a/b0072a58fcac835d79f4b7727cd3e730.jpg",
        name: "Chen Yi Heng",
        originPrice: 200,
        sellPrice: 180,
    },
    {
        primaryImage: "https://i.pinimg.com/736x/b0/07/2a/b0072a58fcac835d79f4b7727cd3e730.jpg",
        name: "Chen Yi Heng",
        originPrice: 200,
        sellPrice: 180,
    },
    {
        primaryImage: "https://i.pinimg.com/736x/b0/07/2a/b0072a58fcac835d79f4b7727cd3e730.jpg",
        name: "Chen Yi Heng",
        originPrice: 200,
        sellPrice: 180,
    },
]

const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
};

const ListProduct = ({}) => {
    const chunkedProducts = chunkArray(listProduct, 5);
    return (
        // <div className={classes.container}>
        //     {chunkedProducts.map(group => (
        //         <div className={classes.container_row}>
        //             {group.map((item, index) => (
        //                 <CardProduct key={index} product={item}/>
        //             ))}
        //         </div>
        //     ))}
        // </div>
        <div className={classes.container}>
            <div className={classes.list_product}>
                {listProduct.map((item, index)=> (
                    <CardProduct key={index} product={item} />
                ))}
            </div>
            <Grid2 sx={{mt: "1rem", mb: "2rem"}}>
                <Pagination 
                    count={5} 
                    page={2}
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
        </div>
    )
}

export default ListProduct;