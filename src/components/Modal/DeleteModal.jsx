import { Dialog, Box, DialogContent, Typography, Button } from "@mui/material";
import { Close } from "@mui/icons-material";

const DeleteModal = ({ isOpen, handleClose, onSubmit, title, description, haveAction = true }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    borderRadius: "10px", 
                    boxShadow: 24,
                    p: "0.5rem 2rem",
                },
            }}
        >
            <DialogContent sx={{paddingTop: "0.5rem"}}>
                <Box>
                    <Close 
                        sx={{position: "absolute", right: "1rem", top: "1rem", "&:hover": {cursor: "pointer"}}} 
                        onClick={handleClose}
                    />
                    <Typography variant="h5" sx={{fontWeight: "500", textAlign: "center"}}>{title}</Typography>
                    <Typography sx={{mt: "1rem", textAlign: "center"}}>{description}</Typography>
                    {haveAction && (
                        <>
                            <Box sx={{display: "flex", gap: "1.5rem", justifyContent: "center", mt: "1.5rem"}}>
                                <Button 
                                    variant="outlined" 
                                    sx={{ color: "var(--admin-color)", border: "1px solid var(--admin-color)"}} 
                                    onClick={handleClose}
                                >
                                    No
                                </Button>
                                <Button 
                                    variant="contained" 
                                    sx={{backgroundColor: "var(--admin-color)", color: "#FFF"}} 
                                    onClick={onSubmit}
                                >
                                    Yes
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteModal;

export {DeleteModal};
