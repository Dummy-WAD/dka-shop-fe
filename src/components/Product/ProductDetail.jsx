import { useDispatch, useSelector } from "react-redux";
import { Grid2, Button, Typography, ImageList, ImageListItem, IconButton } from "@mui/material";
import classes from "./ProductDetail.module.css"
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import MyTextField from "../MyTextField/MyTextField";
import TableProductVarian from "./TableProductVarian";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailProductForAdminById } from "../../api/product";
import { setListProductInfo } from "../../redux/slice/productSlice";

const ProductDetail = ({}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {product} = useSelector(state => state.product)
    const [nowImage, setNowImage] = useState(product.primaryImage);
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalImages = product.otherImages.length + 1;
    const numberImagesShow = totalImages < 5 ? totalImages : 5;

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

    const handlePrev = () => {
        handleSelectImage(currentIndex - 1)
    }

    const handleNext = () => {
        handleSelectImage(currentIndex + 1)
    }

    const handleSelectImage = (index) => {
        setCurrentIndex(index);
        setNowImage(index == 0 ? product.primaryImage : product.otherImages[index-1])
    }

    const notPrev = currentIndex === 0 || totalImages === numberImagesShow;
    const notNext = currentIndex >= (totalImages-numberImagesShow) || totalImages === numberImagesShow;

    const isShow = (index) => {
        if (totalImages ===  numberImagesShow) return true;
        var startImage, endImage;
        if (currentIndex + numberImagesShow - 1 >= totalImages){
            startImage = totalImages - numberImagesShow;
            endImage = totalImages - 1;
        } else {
            startImage = currentIndex;
            endImage = currentIndex + numberImagesShow - 1;
        }
        return index >= startImage && index <= endImage;
    }

    return (
        <div>
            <div>
                <Link to="/admin/product">
                    <Button
                        sx={{backgroundColor: "var(--admin-color)", color: "#fff"}}
                        variant="contained"
                        startIcon={<ArrowBack/>}
                    >
                        Back
                    </Button>
                </Link>
                <Typography variant="h5" sx={{textAlign: "center", mt: "-2rem", fontWeight: 600}}>Product Detail</Typography>
            </div>
            <div className={classes.container}>
                <div className={classes.container_left}>
                    <img src={nowImage} loading="lazy" className={classes.image_now}/>
                    <div className={classes.main_list_image}>
                        <IconButton 
                            className={notPrev ? classes.hidden : classes.show}
                            onClick={handlePrev} 
                            disabled={notPrev} 
                            style={{ position: 'absolute', left: "0.5rem", top: "calc(50% - 20px)", zIndex: 2, backgroundColor:  "#fff" }}
                        >
                            <ArrowBack />
                        </IconButton>
                        {totalImages > 1 &&
                        <ImageList 
                            className={classes.list_image}
                            cols={numberImagesShow} 
                        >
                            <ImageListItem 
                                key={0}
                                className={currentIndex === 0 ? classes.selected : null}
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                    display: isShow(0) ? "block" : "none"
                                }}
                                onClick={()=> handleSelectImage(0)}
                            >
                                <img
                                    src={product.primaryImage}
                                    srcSet={product.primaryImage}
                                    loading="lazy"
                                    className={classes.sub_image}
                                />
                            </ImageListItem>
                            {product.otherImages.map((item, index) => (
                                <ImageListItem 
                                    key={index+1} 
                                    className={currentIndex === index+1 ? classes.selected : null}
                                    sx={{
                                        "&:hover": {
                                            cursor: "pointer",
                                        },
                                        display: isShow(index+1) ? "block" : "none"
                                    }}
                                    onClick={()=> handleSelectImage(index+1)}
                                >
                                <img
                                    src={item}
                                    srcSet={item}
                                    loading="lazy"
                                    className={classes.sub_image}
                                />
                                </ImageListItem>
                            ))}
                        </ImageList>}
                        <IconButton 
                            onClick={handleNext} 
                            className={notNext ? classes.hidden : classes.show}
                            disabled={notNext} 
                            style={{ position: 'absolute', right: "0.5rem", top: "calc(50% - 20px)", zIndex: 2, backgroundColor:  "#fff" }}
                        >
                            <ArrowForward />
                        </IconButton>
                    </div>
                </div>
                <div className={classes.container_right}>
                    <div className={classes.row}>
                        <MyTextField id="id" label="ID" variant="outlined" color="var(--admin-color)" disabled style={{mb: "1.5rem", width: "50%"}} value={product.id}/>
                        <MyTextField id="name" label="Name" variant="outlined" color="var(--admin-color)" disabled style={{mb: "1.5rem", width: "50%"}} value={product.name}/>
                    </div>
                    <div className={classes.row}>
                        <MyTextField id="price" label="Price" variant="outlined" color="var(--admin-color)" disabled style={{mb: "1.5rem", width: "50%"}} value={product.price}/>
                        <MyTextField id="category" label="Category" variant="outlined" color="var(--admin-color)" disabled style={{mb: "1.5rem", width: "50%"}} value={product.category.name}/>
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