import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { forwardRef } from "react";

const SelectAddress = forwardRef(
  (
    { label, handleChange, value, menuList, style, smallSize, color, ...props },
    ref
  ) => {
    return (
      <FormControl sx={{ ...style }}>
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
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 250, // Adjust the height to fit the desired number of items
              },
            },
          }}
        >
          {menuList?.map((item) => (
            <MenuItem value={item.id}>{item.nameEn}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
);

export default SelectAddress;
