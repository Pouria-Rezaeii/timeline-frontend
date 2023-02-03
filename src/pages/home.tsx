import React from "react";
import {makeStyles} from "@mui/styles";

export default function Home() {
  const c = useStyles();

  return (
    <div className={c.container}>a</div>
  );
}

const useStyles = makeStyles((theme) => ({
  container:{
    padding:'2rem',
    backgroundColor:'red'
  }
}));
