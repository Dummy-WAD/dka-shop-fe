import { Chip } from "@mui/material";
import React from "react";

function StatusChip({ label, bgColor, color, style, ...props }) {
  return (
    <Chip
      {...props}
      label={label}
      sx={{
        ...style,
        ".MuiChip-label": {
          p: 2,
        },
        
      }}
    />
  );
}

export default StatusChip;
