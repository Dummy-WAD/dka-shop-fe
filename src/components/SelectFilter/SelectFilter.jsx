import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectFilter = ({label, value, handleChange, menuList}) => {
    return (
        <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">{label}</InputLabel>
            <Select
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  color: "#ccc",
                  borderColor: "#ccc",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  color: "#ccc",
                  borderColor: "#ccc",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ccc",
                  borderWidth: "1px",
                  color: "#ccc",
                },
              }}
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={value}
              label={label}
              onChange={handleChange}
            >
                {menuList.map((item) => (
                    <MenuItem value={item.key} key={item.key}>{item.value}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectFilter;