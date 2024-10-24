import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { forwardRef } from "react";


const SelectCustom = forwardRef(({label, handleChange, value, menuList, style}, ref) => {
    return (
        <FormControl sx={{...style}} >
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={handleChange}
                inputRef={ref}
            >
                {menuList?.map((item) => (
                    <MenuItem value={item.key}>{item.value}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});

export default SelectCustom;
