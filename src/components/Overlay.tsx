import React from "react";
import { makeStyles } from "@mui/styles";

interface BackdropProps {
  children: React.ReactNode;
  onClickBackdrop?: () => void;
}

export default function Overlay(props: BackdropProps) {
  const c = useStyles();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target == e.currentTarget) {
      props.onClickBackdrop?.();
    }
  };

  return (
    <div className={c.container} onClick={(e) => handleClick(e)}>
      {props.children}
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    backgroundColor: "#00000066",
    position: "fixed",
    zIndex: 1100,
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "15vh",
    backdropFilter: "blur(1px)",
  },
});
