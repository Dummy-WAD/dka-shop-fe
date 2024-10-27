import { TextField } from "@mui/material";
import { forwardRef } from "react";
import { CalendarMonth } from "@mui/icons-material";

const MyTextField = forwardRef(({color, fullWidth, smallSize, style,  ...props}, ref) => {
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
            ...(smallSize && {
                "& .MuiInputBase-input": {
                    paddingBottom: "0.7rem",
                    paddingTop: "0.7rem",
                },
                // "& .MuiInputLabel-root": {
                //     marginTop: "-0.35rem",
                // },
                "& .MuiInputLabel-root": {
                    transform: "translate(14px, 10px) scale(1)", // Điều chỉnh vị trí của label khi không thu nhỏ
                },
                "& .MuiInputLabel-shrink": {
                    transform: "translate(14px, -10px) scale(0.75)", // Điều chỉnh vị trí của label khi thu nhỏ
                },
            }),
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