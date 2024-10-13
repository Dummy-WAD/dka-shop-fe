import { Box, Typography, Button } from "@mui/material";
import { Upload } from "@mui/icons-material";
import MyTextField from "../MyTextField/MyTextField";
import { useSelector } from "react-redux";
import { useRef } from "react";

const EditCategory = ({onSubmit}) => {
    const {category} = useSelector((state) => state.category)
    const nameRef = useRef("");
    const descRef = useRef("");
    const handleSubmit = ()  => {
        const name = nameRef.current.value;
        const desc = descRef.current.value;
        onSubmit(name,desc)
    }
    return (
        <Box sx={{width: "100%"}}>
            <Typography variant="h5" sx={{fontWeight: "500", textAlign: "center"}}>Edit Category</Typography>
            <Box sx={{mt: "2rem"}}>
                <MyTextField id="id" label="ID" variant="outlined" value={category.id} color="#000" fullWidth style={{mb: "1.5rem"}} disabled/>
                <MyTextField id="name" label="Name" variant="outlined" defaultValue={category.name} color="#000" fullWidth style={{mb: "1.5rem"}} ref={nameRef}/>
                <MyTextField id="desc" label="Description" multiline rows={4} color="#000" defaultValue={category.description} fullWidth ref={descRef}/>
            </Box>
            <Button 
                variant="contained" 
                sx={{backgroundColor: "#000", color: "#FFF", mt: "1.5rem", float: "right", minWidth: "150px"}} 
                startIcon={<Upload />}
                onClick={handleSubmit}
            >
                Update
            </Button>
        </Box>
    )
}

export default EditCategory;