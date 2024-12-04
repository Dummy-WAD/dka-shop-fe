import { Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import SelectFilter from "../SelectFilter/SelectFilter";
import PaginationCustom from "../Pagination/Pagination";
import ReviewItem from "./ReviewItem";
import { getAllReviewOfProduct } from "../../api/review";

const RATING_OPTIONS = [
    {
        key: "all",
        value: "All",
    },
    {
        key: 5,
        value: "5 stars",
    },
    {
        key: 4,
        value: "4 stars",
    },
    {
        key: 3,
        value: "3 stars",
    },
    {
        key: 2,
        value: "2 stars",
    },
    {
        key: 1,
        value: "1 stars",
    },
]

const LIMIT = 10;

const ReviewContainer = ({productId}) => {
    const [page, setPage] = useState(1);
    const [ratingFilter, setRatingFilter] = useState("all");
    const [listReview, setListReview] = useState();

    const fetchListReview = async () => {
        try {
            const res = await getAllReviewOfProduct(Number(productId), {
                page,
                rating: ratingFilter,
                limit: LIMIT,
            })
            setListReview(res);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchListReview();
     },[page, ratingFilter])

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    return (
        <Grid2 sx={{m: "1rem auto 2rem"}}>
            <Grid2 sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Typography variant="h6">{listReview?.totalResults || 0} feedbacks</Typography>
                <SelectFilter 
                    label="Rating"
                    value={ratingFilter}
                    handleChange={(e) => {
                        setRatingFilter(e.target.value);
                        setPage(1);
                    }}
                    menuList={RATING_OPTIONS}
                />
            </Grid2>
            {listReview && listReview?.results?.length > 0 && (
                <Grid2 sx={{m: "1rem 0 2rem"}}>
                    {listReview?.results.map((item) => (
                        <ReviewItem key={item.id} review={item}/>
                    ))}
                </Grid2>
            )}
            {(listReview && listReview?.results?.length > 0) ? ( 
                <Grid2 sx={{mt: "1rem", mb: "2rem"}}>
                    <PaginationCustom 
                        page={page}
                        totalPages={listReview?.totalPages}
                        handleChangePage={handleChangePage}
                    />
                </Grid2>
            ) : (
                <Typography sx={{textAlign: "center", py: "1rem"}}>No feedbacks</Typography>
            )}
        </Grid2>
    )
}

export default ReviewContainer;