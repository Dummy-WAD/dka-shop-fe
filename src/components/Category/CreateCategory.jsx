import { Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import MyTextField from "../MyTextField/MyTextField";
import { useRef } from "react";

const CreateCategory = ({onSubmit}) => {
    const nameRef = useRef("");
    const descRef = useRef("");
    const handleSubmit = ()  => {
        const name = nameRef.current.value;
        const desc = descRef.current.value;
        onSubmit(name, desc)
    }
    return (
        <Box sx={{width: "100%"}}>
            <Typography variant="h5" sx={{fontWeight: "500", textAlign: "center"}}>Create Category</Typography>
            <Box sx={{mt: "2rem"}}>
                <MyTextField id="name" label="Name" variant="outlined" color="#000" fullWidth style={{mb: "1.5rem"}} ref={nameRef}/>
                <MyTextField id="desc" label="Description" multiline rows={4} color="#000" fullWidth ref={descRef}/>
            </Box>
            <Button 
                variant="contained" 
                sx={{backgroundColor: "#000", color: "#FFF", mt: "1.5rem", float: "right", minWidth: "150px"}} 
                startIcon={<Add />}
                onClick={handleSubmit}
            >
                Create
            </Button>
        </Box>
    )
}

export default CreateCategory;