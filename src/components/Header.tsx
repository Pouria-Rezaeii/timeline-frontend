import React from "react";
import { makeStyles } from "@mui/styles";
import { headerHeight } from "../services/sizes";
import { axios } from "../services/axios";

export default function Header() {
  const c = useStyles();

  const handleEndCurrentEvent = () => {
    const date = new Date();
    axios.post("http://localhost:4000/event", {
      date: date.toISOString().split("T")[0],
      shortDescription: "event 1",
      endTime: {
        hour: date.getHours(),
        minutes: date.getMinutes(),
      },
    });
  };

  return (
    <header className={c.container} style={{ height: headerHeight }}>
      <h1 className={c.title}>TimeLine</h1>
      <button className={c.button} onClick={handleEndCurrentEvent}>
        End Task
      </button>
    </header>
  );
}

const useStyles = makeStyles((theme: any) => ({
  container: {
    backgroundColor: "#029F85",
    position: "relative",
    "& > *": {
      fontWeight: 600,
      textAlign: "center",
    },
  },
  title: {
    margin: 0,
    padding: ".75rem",
    color: "white",
  },
  button: {
    position: "absolute",
    top: "50%",
    right: "1rem",
    transform: "translateY(-50%)",
    border: "1px solid #aaa",
    borderRadius: 8,
    padding: ".5rem .75rem",
    backgroundColor: "#ffffff33",
    color: "#fff",
    cursor: "pointer",
  },
}));
