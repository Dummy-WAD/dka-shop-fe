import { forwardRef } from "react";
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const DateInput = forwardRef(({color, fullWidth, smallSize, style, value, ...props}, ref) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField
            {...props}
            inputRef={ref}
            value={value ? dayjs(value) : null}
            format={"DD/MM/YYYY"}
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
      </LocalizationProvider>
    );
});

export default DateInput;