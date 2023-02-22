import React from "react";
import {v4} from "uuid";
import {makeStyles} from "@mui/styles";

export default function Timestamp() {
  const c = useStyles();
  return (
    <div className={c.container}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((time, index) => (
        <React.Fragment key={v4()}>
          <div>{`${time < 5 ? "0" : ""}${time * 2}`}</div>
          {index !== 12 && <div>|</div>}
        </React.Fragment>
      ))}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    "& > *": {
      fontSize: 8,
      color: "#aaa",
    },
  },
}));
