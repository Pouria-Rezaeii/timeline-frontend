import React from "react";
import { makeStyles } from "@mui/styles";
import Header from "../components/Header";
import { headerHeight } from "../services/sizes";
import Timelines from "../components/Timelines";

export default function Home() {
  const c = styles();

  return (
    <div className={c.container}>
      <div className={c.headerBox}>
        <Header />
      </div>
      <div className={c.contentBox}>
        <Timelines />
      </div>
    </div>
  );
}

const styles = makeStyles((theme) => ({
  container: {
    minHeight: `calc(100vh - ${headerHeight}px)`,
  },
  headerBox: {
    position: "fixed",
    zIndex: 1000,
    left: 0,
    right: 0,
    top: 0,
    [theme.mobileSize]: {
      top: `calc(100vh - ${headerHeight}px)`,
    },
  },
  contentBox: {
    marginTop: headerHeight,
    padding: "2rem",
    paddingTop: "15rem",
    [theme.mobileSize]: {
      marginTop: 0,
      padding: "1rem",
      paddingTop: "12rem",
    },
  },
  input: {
    fontSize: 20,
    padding: 8,
    fontWeight: 400,
    fill: "red",
    border: "none",
    outline: "none",
    backgroundColor: "#ddd",
    borderRadius: 2,
    cursor: "pointer",
  },
}));
