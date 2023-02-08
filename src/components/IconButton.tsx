import React from "react";
import { makeStyles } from "@mui/styles";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function IconButton(props: IProps) {
  const { children, className } = props;
  const c = useStyles();

  return (
    <button {...props} className={c.container}>
      {children}
    </button>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "inline-block",
    width: 46,
    height: 46,
    borderRadius: "50%",
    border: "none",
    outline: "none",
    cursor: "pointer",
    backgroundColor: "#00000022",
    transition: ".1s",
    "&:hover": {
      backgroundColor: "#00000033",
    },
  },
}));
