import { Chip } from "@mui/material";
import React from "react";

const statusStyles = {
  pending: {
    backgroundColor: 'grey',
    color: 'white',
  },
  packaged: {
    backgroundColor: '#faa564',
    color: 'black',
  },
  delivering: {
    backgroundColor: '#64befa',
    color: 'black',
  },
  completed: {
    backgroundColor: 'green',
    color: 'white',
  },
  active: {
    backgroundColor: 'green',
    color: 'white',
  },
  default: {
    backgroundColor: 'black',
    color: 'white',
  },
  // Add more statuses and their styles as needed
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

function StatusChip({ label, status, style, ...props }) {
  const { backgroundColor, color } = statusStyles[status] || {};

  return (
    <Chip
      // {...props}
      label={status ? capitalizeFirstLetter(status) : label}
      sx={{
        ...style,
        ".MuiChip-label": {
          p: 2,
        },
        backgroundColor: backgroundColor,
        color: color,
        minWidth: '100px'
      }}
    />
  );
}

export default StatusChip;
