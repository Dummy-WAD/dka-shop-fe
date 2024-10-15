import classes from "./ShowCategory.module.css"
import { CategoryIcon } from "../../icon/Icon";
import TableCategory from "./TableCategory";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ModalCustom from "../../components/Modal/BasicModal";
import { handleGetAllCategories, handleCreateCategory, handleEditCategory, handleDeleteCategory} from "../../api/category";
import categorySlice from "../../redux/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../components/SearchInput/SearchInput";
import ViewCategory from "../../components/Category/ViewCategory";
import CreateCategory from "../../components/Category/CreateCategory";
import EditCategory from "../../components/Category/EditCategory";
import DeleteModal from "../../components/Modal/DeleteModal";
import { toast } from "react-toastify";

const ShowCategory = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [listData, setListData] = useState([]);

  const {page, category, orderBy, orderDirection, search} = useSelector((state)=> state.category)

  const handleSetPage = (newPage) => dispatch(categorySlice.actions.setCategoryInfo({page: newPage}))

  const handleClose = () => setIsOpen(false);

  const limit = 5;

  const handleViewDetail = (item) => {
    dispatch(categorySlice.actions.setCategoryInfo({
      category: item,
    }))
    setIsOpen(true);
    setTypeModal("view")
  }

  const handleViewCreate = () => {
    setIsOpen(true);
    setTypeModal("create")
  }

  const handleViewEdit = (item) => {
    dispatch(categorySlice.actions.setCategoryInfo({
      category: item,
    }))
    setIsOpen(true);
    setTypeModal("edit")
  }

  const handleViewDelete = (item) => {
    dispatch(categorySlice.actions.setCategoryInfo({
      category: item,
    }))
    setIsOpen(true);
    setTypeModal("delete")
  }

  const handleSetOderBy = (name) => {
    const order = name == orderBy ? (orderDirection === "asc" ? "desc" : orderDirection === "desc" ? "" : "asc") : "asc";
    const nameOrder = order == "" ? "" : name;
    dispatch(categorySlice.actions.setCategoryInfo({
        orderBy: nameOrder,
        orderDirection: order,
        page: 0,
    }))
  }

  const handleSearch = () => {
    fetchCategories(page, limit, orderBy, orderDirection, search);
  }

  const handleChangeSearch = (value) => {
    dispatch(categorySlice.actions.setCategoryInfo({
      search: value
    }))
  }

  const handleCreate = async (name, desc) => {
    if (name.trim()!=="" && desc.trim() !== ""){
      try{
        await handleCreateCategory(name, desc);
        toast.success("Create new category successfully",{
          autoClose: 3000,
        });
        fetchCategories(page, limit, orderBy, orderDirection, search);
      }
      catch (err){
        toast.error(err.response.data.message,{
          autoClose: 3000,
        });
      }
    }
    else{
      toast.error("Please fill in all the information",{
        autoClose: 3000,
      });
    }
  }

  const handleEdit = async (name, desc) => {
    if (name.trim()!=="" && desc.trim() !== "" && (name != category.name || desc != category.description)){
      try{
        await handleEditCategory(category.id,name, desc);
        toast.success("Edit category successfully",{
          autoClose: 3000,
        });
        fetchCategories(page, limit, orderBy, orderDirection, search);
      }
      catch (err){
        toast.error(err.response.data.message,{
          autoClose: 3000,
        });
      }
    }
    else if (name == category.name && desc == category.description) handleClose()
    else {
      toast.error("Please fill in all the information",{
        autoClose: 3000,
      });
    }
  }

  const handleDelete = async () => {
    try{
      await handleDeleteCategory(category.id);
      toast.success("Delete category successfully",{
        autoClose: 3000,
      });
      fetchCategories(page, limit, orderBy, orderDirection, search);
    } catch (err){
      toast.error(err.response.data.message,{
        autoClose: 3000,
      });
    }
  }

  const fetchCategories = async (page, limit, orderBy, orderDirection, name) => {
    try {
      const res = await handleGetAllCategories(page+1,limit,orderBy,orderDirection,name);
      dispatch(categorySlice.actions.setCategoryInfo({
        totalPages: res.totalPages,
        page: parseInt(res.page) - 1,
        totalResults: res.totalResults,
      }))
      setListData(res.results)
      setIsOpen(false);
      setTypeModal("")
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(()=>{
      fetchCategories(page, limit, orderBy, orderDirection, search);
  },[page, orderBy, orderDirection,search])

  return (
    <>
        <div className={classes.main_title}>
            <div className={classes.title_page}>
              <CategoryIcon className={classes.icon_style} />
              <p>CATEGORY</p>
            </div>
            <div className={classes.search_create}>
              <SearchInput 
                placeholder="Search"
                value={search}
                onSearch={handleSearch}
                onChange={handleChangeSearch}
              />
              <Button 
                variant="contained" 
                sx={{backgroundColor: "var(--admin-color)", color: "#FFF"}} 
                startIcon={<Add />}
                onClick={handleViewCreate}
              >
                Create
              </Button>
            </div>
        </div>
        <div>
            <TableCategory 
              categories={listData} 
              rowsPerPage={limit} 
              onSetPage={handleSetPage}
              onSetOrder={handleSetOderBy}
              handleViewDetail={handleViewDetail}
              handleViewEdit={handleViewEdit}
              handleViewDelete={handleViewDelete}
            />
        </div>
        {(isOpen && typeModal=="view") &&
          <ModalCustom isOpen={isOpen} handleClose={handleClose}>
            <ViewCategory />
          </ModalCustom>
        }

        {(isOpen && typeModal=="create") &&
          <ModalCustom isOpen={isOpen} handleClose={handleClose}>
            <CreateCategory onSubmit={handleCreate} />
          </ModalCustom>
        }
        {(isOpen && typeModal=="edit") &&
          <ModalCustom isOpen={isOpen} handleClose={handleClose}>
            <EditCategory onSubmit={handleEdit}/>
          </ModalCustom>
        }
        {(isOpen && typeModal=="delete") &&
          <DeleteModal 
            isOpen={isOpen} 
            handleClose={handleClose} 
            onSubmit={handleDelete} 
            title="Delete category"
            description="Are you sure delete this category ?"
          />
        }
    </>
  )
};

export default ShowCategory;
