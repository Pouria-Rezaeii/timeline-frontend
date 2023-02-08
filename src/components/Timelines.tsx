import React from "react";
import { makeStyles } from "@mui/styles";
import { v4 } from "uuid";
import { axios } from "../services/axios";
import Timeline from "components/Timeline";
import { Timeline as TimelineType } from "../services/types/Timeline.type";

export default function Timelines() {
  const [result, setResult] = React.useState<TimelineType[]>();
  const c = useStyles();

  React.useEffect(() => {
    axios.get("events").then(({ data }) => {
      setResult(data);
    });
  }, []);

  return (
    <>
      {result?.map((timeLine) => (
        <div key={v4()} className={c.timelineBox}>
          <Timeline timeline={timeLine} />
        </div>
      ))}
    </>
  );
}

const useStyles = makeStyles((theme: any) => ({
  timelineBox: {
    marginBottom: "15rem",
  },
}));
