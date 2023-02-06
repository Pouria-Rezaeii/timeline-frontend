import React from "react";
import { makeStyles } from "@mui/styles";
import { v4 } from "uuid";

interface Timeline {
  date: string;
  events: {
    description: string;
    localTime: string;
    tags: [string, string];
    title: string;
    width: string;
  }[];
}

const tempColors = [
  "#F84A54",
  "#F28A35",
  "#FAB52A",
  "#7FBB4E",
  "#31BCAF",
  "#1E7985",
  "#34ABF3",
  "#267FC7",
  "#7A75AF",
  "#F55EA8",
];

export default function Timeline(props: { timeline: Timeline }) {
  const c = useStyles();

  return (
    <div key={v4()} className={c.container}>
      {props.timeline.events.map((event, index) => {
        return (
          <div
            key={v4()}
            className={c.event}
            style={{ width: event.width, backgroundColor: tempColors[index] }}
          >
            <div className={c.title} style={{ borderTop: `2px dotted ${tempColors[index]}` }}>
              {event.title}
            </div>
            <div className={c.timeStampsBox}></div>
          </div>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles((theme: any) => ({
  container: {
    backgroundColor: "#f1f1f1",
    padding: 0,
    height: "1rem",
    width: "100%",
    display: "flex",
  },
  event: {
    height: "100%",
    position: "relative",
  },
  title: {
    position: "absolute",
    bottom: "5.2rem",
    right: -63,
    fontSize: 9,
    transform: "rotate(-270deg)",
    minWidth: 140,
  },
  timeStampsBox: {},
}));
