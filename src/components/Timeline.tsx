import React from "react";
import { makeStyles } from "@mui/styles";
import { v4 } from "uuid";
import { Timeline as TimelineType } from "../services/types/Timeline.type";
import { useTags } from "../services/TagsContext";

interface IProps {
  timeline: TimelineType;
}

export default function Timeline(props: IProps) {
  const { timeline } = props;
  const c = useStyles();
  const { tags } = useTags();

  const getColor = (id: string) => tags.find((item) => item._id === id)?.color;

  const getWidth = (index: number) => {
    const currentItem = timeline.events[index];
    const prevItem = index === 0 ? null : timeline.events[index - 1];

    const currentTimeInMinutes =
      Number(currentItem.localTime.slice(0, 2)) * 60 + Number(currentItem.localTime.slice(2, 4));
    const prevItemTimeInMinutes =
      index === 0
        ? 0
        : Number(prevItem!.localTime.slice(0, 2)) * 60 + Number(prevItem!.localTime.slice(2, 4));

    return `${((currentTimeInMinutes - prevItemTimeInMinutes) / (24 * 60)) * 100}%`;
  };

  return (
    <div key={v4()} className={c.container}>
      {timeline.events.map((event, index) => {
        const firstTagColor = getColor(event.tags[0]);
        return (
          <div key={v4()} className={c.event} style={{ width: getWidth(index) }}>
            <div className={c.title} style={{ borderTopColor: `#${firstTagColor}` }}>
              {event.title}
            </div>
            {event.tags.length === 1 ? (
              <div style={{ height: "100%", backgroundColor: `#${firstTagColor}` }} />
            ) : (
              event.tags.map((tagId) => (
                <div
                  key={v4()}
                  style={{
                    height: `${(100 / event.tags.length).toFixed(3)}%`,
                    backgroundColor: `#${getColor(tagId)}`,
                  }}
                />
              ))
            )}
            <div className={c.timeStampsBox}></div>
          </div>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
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
    borderTopWidth: 2,
    borderTopStyle: "dotted",
    [theme.tabletSize]: {
      // borderTopWidth: 1,
    },
  },
  timeStampsBox: {},
}));
