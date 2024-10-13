import classes from "./ShowCategory.module.css"
import { CategoryIcon } from "../../icon/Icon";
import TableCategory from "./TableCategory";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect } from "react";
import ModalCustom from "../../components/Modal/BasicModal";
import { handleGetAllCategories} from "../../api/category";
import categorySlice from "../../redux/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import ViewCategory from "../../components/Category/ViewCategory";

const ShowCategory = () => {
  const dispatch = useDispatch();

  const {listData: data, isOpenModal: isOpen, typeModal: type, page, category, orderBy, orderDirection, search} = useSelector((state)=> state.category)

  const handleSetPage = (newPage) => dispatch(categorySlice.actions.setCategoryInfo({page: newPage}))

  const handleClose = () => dispatch(categorySlice.actions.setCategoryInfo({isOpenModal: false}))

  const limit = 5;

  const handleViewDetail = (item) => {
    dispatch(categorySlice.actions.setCategoryInfo({
      category: item,
      typeModal: "view",
      isOpenModal: true,
    }))
  }

  const handleSetOderBy = (name) => {
    const order = name == orderBy ? (orderDirection === "desc" ? "asc" : "desc") : "asc"
    dispatch(categorySlice.actions.setCategoryInfo({
        orderBy: name,
        orderDirection: order,
        page: 0,
    }))
  }

  const fetchCategories = async (page, limit, orderBy, orderDirection, name) => {
    try {
      const res = await handleGetAllCategories(page+1,limit,orderBy,orderDirection,name);
      dispatch(categorySlice.actions.setCategoryInfo({
        listData: res.results,
        totalPages: res.totalPages,
        page: parseInt(res.page) - 1,
        totalResults: res.totalResults,
        isOpenModal: false,
        typeModal: "",
      }))
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(()=>{
      fetchCategories(page, limit, orderBy, orderDirection, search);
  },[page, orderBy, orderDirection])

  return (
    <>
        <div className={classes.main_title}>
            <div className={classes.title_page}>
              <CategoryIcon className={classes.icon_style} />
              <p>CATEGORY</p>
            </div>
            <Button 
              variant="contained" 
              sx={{backgroundColor: "#000", color: "#FFF"}} 
              startIcon={<Add />}
            >
              Create
            </Button>
        </div>
        <div>
            <TableCategory 
              categories={data} 
              rowsPerPage={limit} 
              handleViewDetail={handleViewDetail}
              onSetPage={handleSetPage}
              onSetOrder={handleSetOderBy}
            />
        </div>
        {(isOpen && type=="view") &&
          <ModalCustom isOpen={isOpen} handleClose={handleClose}>
            <ViewCategory />
          </ModalCustom>
        }
    </>
  )
};

export default ShowCategory;
