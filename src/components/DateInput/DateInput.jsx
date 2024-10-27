import { TextField } from "@mui/material";
import { forwardRef, useState } from "react";

const DateInput = forwardRef(({color, fullWidth, smallSize, style, value, ...props}, ref) => {
    const [selectedDate, setSelectedDate] = useState(value);

    const handleDateChange = (event) => {
        const value = event.target.value; 
        setSelectedDate(convertToDDMMYYYY(value));
    };

    const convertToDDMMYYYY = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`; 
    };

    const convertToISODate = (date) => {
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`; 
    };
    return (
        <TextField
            {...props}
            inputRef={ref}
            type="date"
            value={convertToISODate(selectedDate)}
            onChange={handleDateChange}
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