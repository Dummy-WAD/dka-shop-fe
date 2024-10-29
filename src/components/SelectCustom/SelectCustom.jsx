import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { forwardRef } from "react";


const SelectCustom = forwardRef(({label, handleChange, value, menuList, style, smallSize, ...props}, ref) => {
    return (
        <FormControl 
            sx={{...style}}
        >
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={handleChange}
                inputRef={ref}
                {...props}
                sx={{
                    ...(smallSize && {
                        "& .MuiInputBase-input": {
                          paddingBottom: "0.7rem",
                          paddingTop: "0.7rem",
                        },
                    }),
                }}
            >
                {menuList?.map((item) => (
                    <MenuItem value={item.key}>{item.value}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});

export default SelectCustom;
