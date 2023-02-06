import React from "react";
import { makeStyles } from "@mui/styles";
import { v4 } from "uuid";
import { axios } from "../services/axios";
import Timeline from "components/Timeline";

interface TimelineType {
  date: string;
  events: {
    description: string;
    localTime: string;
    tags: [string, string];
    title: string;
  }[];
}

export default function Timelines() {
  const [result, setResult] = React.useState<TimelineType[]>();
  const c = useStyles();

  React.useEffect(() => {
    axios.get("events").then(({ data }) => {
      setResult(data);
    });
  }, []);

  const convertDate = (result: TimelineType[] | undefined) => {
    return result?.map((day) => ({
      ...day,
      events: day.events.map((event, index) => {
        const currentTimeInMinutes =
          Number(event.localTime.slice(0, 2)) * 60 + Number(event.localTime.slice(2, 4));
        const prevItemTimeInMinutes =
          index === 0
            ? 0
            : Number(day.events[index - 1].localTime.slice(0, 2)) * 60 +
              Number(day.events[index - 1].localTime.slice(2, 4));

        return {
          ...event,
          width: `${((currentTimeInMinutes - prevItemTimeInMinutes) / (24 * 60)) * 100}%`,
        };
      }),
    }));
  };

  return (
    <>
      {convertDate(result)?.map((timeLine) => (
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
