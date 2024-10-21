import { Typography, Button, Divider, Slider } from "@mui/material"
import classes from "./Filter.module.css"
import { KeyboardArrowDown, KeyboardArrowUp, ArrowForward, AttachMoney } from "@mui/icons-material"
import { useState } from "react"
import ButtonLink from "../ButtonLink/ButtonLink"

const categoriesList = [
    {id: 1, name: "Spring"},
    {id: 2, name: "Summer"},
    {id: 3, name: "Autumn"},
    {id: 4, name: "Winter"},
    {id: 5, name: "All seasons"},
    {id: 6, name: "Spring"},
]

function valuetext(value) {
    return `${value} VND`;
}

const initialPrice = [0,400]

const Filter = ({}) => {
    const [numberCategoryShow, setNumberCategoryShow] = useState(5);
    const [value, setValue] = useState(initialPrice)

    const handleShowMore = () => {
        setNumberCategoryShow(numberCategoryShow + 5);
    }
    const handleShowLess = () => {
        setNumberCategoryShow(numberCategoryShow - 5);
    }
    const handleChangeValue = (e, newValue) => {
        setValue(newValue);
    }
    const formatValueLabel = (val) => {
        return Math.floor((val * initialPrice[1] / 100))
    };
    const activeCategory = 2;
    return (
        <div className={classes.container}>
            <Typography variant="h5" sx={{fontWeight: "700", mb: "2rem"}}>Filter</Typography>
            <div>
                <Typography variant="h6" sx={{fontWeight: "500", mb:  "0.5rem"}}>Categories</Typography>
                <div className={classes.list_filter}>
                    {categoriesList.map((item, index)=>(
                        index < numberCategoryShow && (
                            <ButtonLink 
                                key={index}
                                onClick={()=>console.log(item.name)} 
                                active={item.id == activeCategory}
                                style = {{textAlign: "left"}}
                            >
                                {item.name}
                            </ButtonLink>
                        )
                    ))}
                    {numberCategoryShow < categoriesList.length  && 
                        <ButtonLink 
                            onClick={handleShowMore} 
                            style = {{textAlign: "left"}}
                        >
                            <div className={classes.showButton}>
                                <Typography>Show more</Typography>
                                <KeyboardArrowDown />
                            </div>
                        </ButtonLink>
                    }
                    {numberCategoryShow > categoriesList.length  && 
                        <ButtonLink 
                            onClick={handleShowLess} 
                            style = {{textAlign: "left"}}
                        >
                            <div className={classes.showButton}>
                                <Typography>Show less</Typography>
                                <KeyboardArrowUp />
                            </div>
                        </ButtonLink>
                    }
                </div>
                <Divider sx={{mt: "0.5rem"}}/>
            </div>
            <div className={classes.price}>
                <Typography variant="h6" sx={{fontWeight: "500", mb:  "0.5rem"}}>Price</Typography>
                <Slider
                    value={value}
                    onChange={handleChangeValue}
                    valueLabelDisplay="auto"
                    valueLabelFormat={formatValueLabel}
                    color="var(--admin-color)"
                    sx={{
                        '& .MuiSlider-thumb':{
                            backgroundColor: "#fff",
                            border: "3px solid var(--admin-color)"
                        }
                    }}
                />
                <div className={classes.input_container}>
                    <div className={classes.input}>
                       <AttachMoney fontSize="small" />
                        <input type="text" />
                    </div>
                    <ArrowForward fontSize="small" />
                    <div className={classes.input}>
                       <AttachMoney fontSize="small" />
                        <input type="text" />
                    </div>
                </div>
            </div>
            <Divider sx={{mt: "1.5rem"}}/>
        </div>
    )
}

export default Filter