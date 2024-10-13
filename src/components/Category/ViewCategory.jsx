import { Box, Typography } from "@mui/material";
import MyTextField from "../MyTextField/MyTextField";
import { useSelector } from "react-redux";

const ViewCategory = ({}) => {
    const {category} = useSelector((state) => state.category)
    return (
        <Box sx={{width: "100%"}}>
            <Typography variant="h5" sx={{fontWeight: "500", textAlign: "center"}}>Category detail</Typography>
            <Box sx={{mt: "2rem"}}>
                <MyTextField id="id" label="ID" variant="outlined" value={category.id} color="#000" fullWidth style={{mb: "1.5rem"}} disabled/>
                <MyTextField id="name" label="Name" variant="outlined" value={category.name} color="#000" fullWidth style={{mb: "1.5rem"}} disabled/>
                <MyTextField id="desc" label="Description" multiline rows={4} color="#000" value={category.description} fullWidth disabled/>
            </Box>
        </Box>
    )
}

export default ViewCategory;