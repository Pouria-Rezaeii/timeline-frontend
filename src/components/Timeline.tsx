import React from "react";
import {makeStyles} from "@mui/styles";
import {v4} from "uuid";
import {Timeline as TimelineType} from "../services/types/Timeline.type";
import {useTags} from "../services/contexts/TagsContext";
import dateFormat from "dateformat";
import {useDeviceSize} from "../services/hooks/useDeviceSize";

interface IProps {
  timeline: TimelineType;
}

export default function Timeline({timeline}: IProps) {
  const {date} = timeline;
  const c = useStyles();
  const {tags} = useTags();
  const {isTabletSize, isMobileSize} = useDeviceSize();
  const today = dateFormat(new Date(), "yyyymmdd");

  const getColor = (id: string) => tags?.find((item) => item._id === id)?.color;

  const getWidth = (index: number) => {
    const currentItem = timeline.events[index];
    const prevItem = index === 0 ? null : timeline.events[index - 1];

    const currentTimeInMinutes =
      Number(currentItem.localTime.slice(0, 2)) * 60 + Number(currentItem.localTime.slice(2, 4));
    const prevItemTimeInMinutes =
      index === 0
        ? 0
        : Number(prevItem!.localTime.slice(0, 2)) * 60 + Number(prevItem!.localTime.slice(2, 4));

    return ((currentTimeInMinutes - prevItemTimeInMinutes) / (24 * 60)) * 100;
  };

  return (
    <div className={c.container}>
      <div key={v4()} className={c.timeline}>
        {timeline.events.map((event, index) => {
          const firstTagColor = getColor(event.tags[0]);
          const width = getWidth(index);

          return (
            <div key={v4()} className={c.event} style={{width: `${width}%`}}>
              <div className={c.title} style={{borderTopColor: firstTagColor}}>
                <span
                  style={{opacity: width > (isMobileSize ? 2.2 : isTabletSize ? 1.4 : 0.8) ? 1 : 0}}
                >
                  {event.title}
                </span>
              </div>
              {event.tags.length === 1 ? (
                <div style={{height: "100%", backgroundColor: firstTagColor}} />
              ) : (
                event.tags.map((tagId) => (
                  <div
                    key={v4()}
                    style={{
                      height: `${(100 / event.tags.length).toFixed(3)}%`,
                      backgroundColor: getColor(tagId),
                    }}
                  />
                ))
              )}
            </div>
          );
        })}
      </div>
      <div className={c.timeStampsBox}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((time) => (
          <div key={v4()}>{`${time < 5 ? "0" : ""}${time * 2}`}</div>
        ))}
      </div>
      <span className={c.date}>
        {date === today
          ? "Today"
          : date === String(+today - 1)
          ? "Yesterday"
          : `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`}
      </span>
    </div>
  );
}

export function TimelinePlaceholder() {
  const c = useStyles();
  return (
    <div className={c.container}>
      <div key={v4()} className={c.timeline}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={v4()} className={c.event} style={{width: "11.5%"}}>
            <div className={c.title} style={{borderTopColor: "#ddd"}}></div>
          </div>
        ))}
      </div>
      <div className={c.timeStampsBox}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((time) => (
          <div key={v4()}>{`${time < 5 ? "0" : ""}${time * 2}`}</div>
        ))}
      </div>
      <span className={c.date}>&&&&-&&-&&</span>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  timeline: {
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
    right: -64,
    fontSize: 9,
    transform: "rotate(-270deg)",
    minWidth: 140,
    borderTopWidth: 1,
    borderTopStyle: "dashed",
    // borderTopWidth: 2,
    // borderTopStyle: "dotted",
  },
  timeStampsBox: {
    display: "flex",
    width: "100%",
    marginTop: 4,
    justifyContent: "space-between",
    "& > *": {
      fontSize: 8,
      color: "#aaa",
    },
  },
  date: {
    display: "inline-block",
    fontSize: 12,
    marginTop: 4,
    padding: "2px 4px 1px",
    borderRadius: 2,
    color: "white",
    backgroundColor: theme.palette.primary.main,
    opacity: 0.6,
  },
}));
