import { TextField } from "@mui/material";
import { forwardRef } from "react";

const MyTextField = forwardRef(({color, fullWidth, style, ...props}, ref) => {
  return (
    <TextField
        {...props}
        inputRef={ref}
        InputLabelProps={{
            sx: {
                color: color,
                '&.Mui-focused': {
                    color: color, 
                },
            },
        }}
        sx={{
            width: fullWidth ? "100%" : null,
            ...style,
            "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: color,
                },
                "&.Mui-focused fieldset": {
                    borderColor: color, 
                },
            },
        }}
    />
  );
});

export default MyTextField