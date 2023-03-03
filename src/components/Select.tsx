import React from "react";
import DefaultSelect, {SelectProps} from "react-dropdown-select";
import {makeStyles} from "@mui/styles";
import clsx from "clsx";

export default function Select<T extends string | object>(props: SelectProps<T>) {
  const {className, ...rest} = props;
  const c = useStyles();

  return <DefaultSelect className={clsx(c.select, className)} {...rest} />;
}

const useStyles = makeStyles((theme) => ({
  select: {
    width: "100%",
    backgroundColor: "#eee !important",
    minHeight: "40px !important",
    borderRadius: "4px !important",
    "&:hover": {
      border: "1px solid hsl(0, 0%, 70%) !important",
    },
    "&:focus-within": {
      boxShadow: "none !important",
    },
    "& > *": {
      width: "250px !important",
    },
    "& input": {
      width: "200px !important",
    },
    "& .react-dropdown-select-dropdown": {
      width: "250px !important",
      maxHeight: "180px !important",
    },
    "& .react-dropdown-select-item": {
      fontSize: ".875rem",
    },
    "& .react-dropdown-select-option": {
      width: "200px !important",
      backgroundColor: "#ddd !important",
      color: "#444 !important",
      fontSize: ".75rem",
      display: "flex",
      justifyContent: "space-between",
      "& .react-dropdown-select-option-remove": {
        fontSize: "20px !important",
        flexShrink: 0,
        borderRadius: 2,
        backgroundColor: "#ff00000a",
        marginLeft: "4px",
        color: "#ff000033",
      },
    },
  },
}));
