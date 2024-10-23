import { Typography, Divider, Slider } from "@mui/material"
import classes from "./Filter.module.css"
import { KeyboardArrowDown, KeyboardArrowUp, ArrowForward, AttachMoney } from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"
import ButtonLink from "../ButtonLink/ButtonLink"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategoriesInCustomer } from "../../api/category"
import { setFilterCategory, setFilterPrice } from "../../redux/slice/searchSlice"

const initialPrice = [0,1000]
const limit = 5;

const Filter = ({}) => {
    const dispatch = useDispatch();
    const { priceStart, priceEnd, filterCategory } = useSelector(state => state.search);
    const [listCategories, setListCategories] = useState([]);
    const [numberCategoryShow, setNumberCategoryShow] = useState(limit);
    const transferPriceStart = Math.round(priceStart / initialPrice[1] * 100);
    const transferPriceEnd = Math.round(priceEnd / initialPrice[1] * 100);
    const priceStartRef = useRef(null);
    const priceEndRef = useRef(null);

    const handleShowMore = () => {
        setNumberCategoryShow(numberCategoryShow + limit);
    }
    const handleShowLess = () => {
        setNumberCategoryShow(numberCategoryShow - limit);
    }
    const handleChangeValue = (e, newValue) => {
        const [start, end] = newValue;
        const transferStart = Math.round(start * initialPrice[1] / 100);
        const transferEnd = Math.round(end * initialPrice[1] / 100);
        dispatch(setFilterPrice({
            start: transferStart,
            end: transferEnd,
        }))
        priceStartRef.current.value = transferStart;
        priceEndRef.current.value = transferEnd;
    }

    const handleInputPriceStart = (e) => {
        if (e.key === 'Enter') {
            const value = parseInt(priceStartRef.current.value);
            if (value <= initialPrice[1] && value >= initialPrice[0]){
                if (value > priceEnd){
                    dispatch(setFilterPrice({
                        start: priceEnd,
                        end: value,
                    }))
                    priceStartRef.current.value = priceEnd;
                    priceEndRef.current.value = value;
                } else {
                    dispatch(setFilterPrice({
                        start: value,
                        end: priceEnd,
                    }))
                }
            }
            else priceStartRef.current.value = priceStart;
        }
    }

    const handleInputPriceEnd = (e) => {
        if (e.key === 'Enter') {
            const value = parseInt(priceEndRef.current.value);
            if (value <= initialPrice[1] && value >= initialPrice[0]){
                if (value < priceStart){
                    dispatch(setFilterPrice({
                        start: value,
                        end: priceStart,
                    }))
                    priceStartRef.current.value = value;
                    priceEndRef.current.value = priceStart;
                } else {
                    dispatch(setFilterPrice({
                        start: priceStart,
                        end: value,
                    }))
                }
            } else priceEndRef.current.value = priceEnd;
        }
    }

    const formatValueLabel = (val) => {
        return Math.floor((val * initialPrice[1] / 100))
    };

    const handleSelectCategory = (id) => {
        dispatch(setFilterCategory(id));
    }

    useEffect(()=> {
        const fetchCategories = async () => {
            try{
                const res = await getAllCategoriesInCustomer();
                setListCategories(res);
            } catch (err){
                console.error(err);
            }
        }
        fetchCategories();
        setFilterPrice({
            start: initialPrice[0],
            end: initialPrice[1],
        })
    },[])

    return (
        <div className={classes.container}>
            <Typography variant="h5" sx={{fontWeight: "700", mb: "2rem"}}>Filter</Typography>
            <div>
                <Typography variant="h6" sx={{fontWeight: "500", mb:  "0.5rem"}}>Categories</Typography>
                <div className={classes.list_filter}>
                    <ButtonLink 
                        key="all"
                        onClick={()=> handleSelectCategory("all")} 
                        active={"all" == filterCategory}
                        style = {{textAlign: "left"}}
                    >
                        All
                    </ButtonLink>
                    {listCategories.map((item, index)=>(
                        index < numberCategoryShow && (
                            <ButtonLink 
                                key={index}
                                onClick={()=> handleSelectCategory(item.id)} 
                                active={item.id == filterCategory}
                                style = {{textAlign: "left"}}
                            >
                                {item.name}
                            </ButtonLink>
                        )
                    ))}
                    {numberCategoryShow < listCategories.length  && 
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
                    {numberCategoryShow > listCategories.length && numberCategoryShow != limit  && 
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
                    value={[transferPriceStart, transferPriceEnd]}
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
                        <input type="text" ref={priceStartRef} defaultValue={priceStart} onKeyPress={handleInputPriceStart} onChange={()=>{}}/>
                    </div>
                    <ArrowForward fontSize="small" />
                    <div className={classes.input}>
                       <AttachMoney fontSize="small" />
                        <input type="text" ref={priceEndRef} defaultValue={priceEnd} onKeyPress={handleInputPriceEnd} onChange={()=>{}}/>
                    </div>
                </div>
            </div>
            <Divider sx={{mt: "1.5rem"}}/>
        </div>
    )
}

export default Filter