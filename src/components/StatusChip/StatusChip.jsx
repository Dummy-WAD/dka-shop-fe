import { Chip } from "@mui/material";
import React from "react";

const statusStyles = {
  PENDING: {
    backgroundColor: 'grey',
    color: 'white',
  },
  PACKAGED: {
    backgroundColor: '#faa564',
    color: 'black',
  },
  DELIVERING: {
    backgroundColor: '#64befa',
    color: 'black',
  },
  COMPLETED: {
    backgroundColor: 'green',
    color: 'white',
  },
  ACTIVE: {
    backgroundColor: 'green',
    color: 'white',
  },
  Default: {
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
      label={status ? status : label}
      sx={{
        ...style,
        ".MuiChip-label": {
          p: 2,
        },
        backgroundColor: backgroundColor,
        color: color,
        minWidth: '110px'
      }}
    />
  );
}

export default StatusChip;
