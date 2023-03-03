import React from "react";
import {makeStyles} from "@mui/styles";
import clsx from "clsx";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export default function Button(props: IProps) {
  const {variant = "primary", className, ...rest} = props;
  const c = useStyles();

  return <button {...rest} className={clsx(c.button, c[variant], className)} />;
}

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    maxWidth: 200,
    borderRadius: 4,
    padding: ".75rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: ".875rem",
    border: "none",
    outline: "none",
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  secondary: {
    backgroundColor: "#fff",
    border: "solid 1px #555",
  },
  danger: {
    backgroundColor: "#e63946",
    color: "#fff",
  },
}));
