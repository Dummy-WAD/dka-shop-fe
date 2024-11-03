import { TextField } from "@mui/material";
import { forwardRef, useState } from "react";
import moment from "moment/moment";

const DateInput = forwardRef(({color, fullWidth, smallSize, style, value, ...props}, ref) => {
    const convertToISODate = (date) => {
        return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
    };
    return (
        <TextField
            {...props}
            inputRef={ref}
            type="date"
            value={convertToISODate(value)}
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

export default DateInput;