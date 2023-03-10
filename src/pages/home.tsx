import React from "react";
import {makeStyles} from "@mui/styles";
import Navigation from "../components/Navigation";
import {headerHeight} from "../services/sizes";
import Timelines from "../components/Timelines";

export default function Home() {
  const c = styles();

  return (
    <div className={c.container}>
      <Navigation />
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
  contentBox: {
    marginTop: headerHeight,
    padding: "2rem",
    paddingTop: "6rem",
    [theme.mobileSize]: {
      marginTop: 0,
      padding: "1rem",
      paddingTop: "2rem",
    },
  },
}));
