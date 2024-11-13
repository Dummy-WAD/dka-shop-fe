export const PENDING = "PENDING";
export const PACKAGED = "PACKAGED";
export const DELIVERING = "DELIVERING";
export const COMPLETED = "COMPLETED";

export const ACTIVE = "ACTIVE";
export const INACTIVE = "INACTIVE";

export const STATUS_STYLES = {
  [PENDING]: {
    backgroundColor: "grey",
    color: "white",
  },
  [PACKAGED]: {
    backgroundColor: "#faa564",
    color: "black",
  },
  [DELIVERING]: {
    backgroundColor: "#64befa",
    color: "black",
  },
  [COMPLETED]: {
    backgroundColor: "green",
    color: "white",
  },
  [ACTIVE]: {
    backgroundColor: "green",
    color: "white",
  },
};

export const statisticsUnit = {
  YEAR: "year",
  QUARTER: "quarter",
  MONTH: "month",
  WEEK: "week",
};
