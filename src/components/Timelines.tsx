import React from "react";
import {makeStyles} from "@mui/styles";
import {v4} from "uuid";
import Timeline, {TimelinePlaceholder} from "components/Timeline";
import {useTimelines} from "../services/contexts/TimelinesContext";
import {useTags} from "../services/contexts/TagsContext";

export default function Timelines() {
  const {timelines} = useTimelines();
  const {tags} = useTags();
  const c = useStyles();

  return (
    <>
      {!timelines || !tags
        ? [1, 2, 3].map(() => (
            <div key={v4()} className={c.timelineBox}>
              <TimelinePlaceholder />
            </div>
          ))
        : timelines?.map((timeLine) => (
            <div key={v4()} className={c.timelineBox}>
              <Timeline timeline={timeLine} />
            </div>
          ))}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  timelineBox: {
    marginBottom: "13rem",
    "&:last-of-type": {
      marginBottom: "4rem",
      [theme.tabletSize]: {
        marginBottom: "9rem",
      },
    },
  },
}));
