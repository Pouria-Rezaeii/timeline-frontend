import React from "react";
import {makeStyles} from "@mui/styles";
import Timeline, {TimelinePlaceholder} from "components/Timeline";
import {useTimelines} from "../services/contexts/TimelinesContext";
import {useTags} from "../services/contexts/TagsContext";

export default function Timelines() {
  const {timelines} = useTimelines();
  const {tags} = useTags();
  const c = useStyles();

  // const counterRef = React.useRef(0);
  // counterRef.current = counterRef.current + 1;
  // console.log("TIMELINES rendered", counterRef.current);

  return (
    <>
      {!timelines || !tags
        ? [1, 2, 3].map((item) => (
            <div key={item} className={c.timelineBox}>
              <TimelinePlaceholder />
            </div>
          ))
        : timelines.map((timeLine) => (
            <div key={timeLine.date} className={c.timelineBox}>
              <Timeline timeline={timeLine} tags={tags} />
            </div>
          ))}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  timelineBox: {
    marginBottom: "4.5rem",
    [theme.tabletSize]: {
      marginBottom: "2.5rem",
    },
    "&:last-of-type": {
      marginBottom: "4rem",
      [theme.tabletSize]: {
        marginBottom: "8rem",
      },
    },
  },
}));
