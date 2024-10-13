import { Close } from "@mui/icons-material";
import { Box, Dialog, DialogContent } from "@mui/material"

const ModalCustom = ({children, isOpen, handleClose}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogContent>
                <Box>
                    <Close 
                        sx={{position: "absolute", right: "24px", top: "20px", "&:hover": {cursor: "pointer"}}} 
                        onClick={handleClose}
                    />
                    {children}
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ModalCustom