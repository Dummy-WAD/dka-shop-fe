import { Button, Typography } from "@mui/material"
import Filter from "../../components/Filter/Filter"
import classes from "./Search.module.css"
import SortBy from "../../components/SortBy/SortBy"
import ListProduct from "../../components/ListProduct/ListProduct"

const Search = ({}) => {
    return (
        <div className={classes.container}>
            <div className={classes.left}>
                <Filter />
            </div>
            <div className={classes.right}>
                <div className={classes.main_title}>
                    <Typography sx={{fontSize: "18px"}}>
                        Showing 1-10 of 50 results
                    </Typography>
                    <SortBy />
                </div>
                <div className={classes.list_product}>
                    <ListProduct />
                </div>
            </div>
        </div>
    )
}

export default Search