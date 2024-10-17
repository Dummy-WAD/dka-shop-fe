import classes from "./ListImage.module.css"
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { ImageList, ImageListItem, IconButton } from "@mui/material";
import { useState } from "react";

const ListImage = ({primaryImage, otherImages}) => {
    const [nowImage, setNowImage] = useState(primaryImage);
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalImages = otherImages.length + 1;
    const numberImagesShow = totalImages < 5 ? totalImages : 5;

    const handlePrev = () => {
        handleSelectImage(currentIndex - 1)
    }

    const handleNext = () => {
        handleSelectImage(currentIndex + 1)
    }

    const handleSelectImage = (index) => {
        setCurrentIndex(index);
        setNowImage(index == 0 ? primaryImage : otherImages[index-1])
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
        <>
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
                            src={primaryImage}
                            srcSet={primaryImage}
                            loading="lazy"
                            className={classes.sub_image}
                        />
                    </ImageListItem>
                    {otherImages.map((item, index) => (
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
        </>
    )
}

export default ListImage;