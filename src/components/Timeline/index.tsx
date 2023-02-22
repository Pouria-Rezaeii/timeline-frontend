import React from "react";
import {makeStyles} from "@mui/styles";
import {v4} from "uuid";
import {Timeline as TimelineType} from "../../services/types/Timeline.type";
import dateFormat from "dateformat";
import {useDeviceSize} from "../../services/hooks/useDeviceSize";
import EventDetailModal from "../modals/EventDetailModal";
import EventItem, {EventPlaceholder} from "../EventItem";
import Timestamp from "../Timestamp";
import {getWidth} from "./utils";
import {Tag} from "../../services/types/Tag.type";

interface IProps {
  timeline: TimelineType;
  tags: Tag[];
}

export default React.memo(function Timeline({timeline, tags}: IProps) {
  const [showEventDetailModal, setShowEventDetailModal] = React.useState(false);
  const [activeEventIndex, setActiveEventIndex] = React.useState<number | null>(null);
  const {date} = timeline;
  const c = useStyles();
  const {isTabletSize, isMobileSize} = useDeviceSize();
  const today = dateFormat(new Date(), "yyyymmdd");

  const handleCloseModal = () => {
    setShowEventDetailModal(false);
    setActiveEventIndex(null);
  };

  React.useEffect(() => {
    activeEventIndex !== null && setShowEventDetailModal(true);
  }, [activeEventIndex]);

  // console.log("Timeline rendered");

  return (
    <div className={c.container}>
      <div key={v4()} className={c.timeline}>
        {timeline.events.map((event, index) => {
          const width = getWidth(index, timeline);
          return (
            <div key={event._id} style={{width: `${width}%`}}>
              <EventItem
                event={event}
                tags={tags}
                showTitle={width > (isMobileSize ? 2.8 : isTabletSize ? 1.4 : 0.8)}
                onClick={() => setActiveEventIndex(index)}
              />
            </div>
          );
        })}
      </div>
      <div className={c.timeStampsBox}>
        <Timestamp />
      </div>
      <span className={c.date}>
        {date === today && <span>Today: </span>}
        {`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`}
      </span>
      {showEventDetailModal && activeEventIndex !== null && (
        <EventDetailModal
          event={timeline.events[activeEventIndex]}
          prevEvent={activeEventIndex !== 0 ? timeline.events[activeEventIndex - 1] : null}
          onClickClose={handleCloseModal}
        />
      )}
    </div>
  );
});

export function TimelinePlaceholder() {
  const c = useStyles();
  return (
    <div className={c.container}>
      <div key={v4()} className={c.timeline}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <EventPlaceholder key={v4()} />
        ))}
      </div>
      <div className={c.timeStampsBox}>
        <Timestamp />
      </div>
      <span className={c.date}>&&&&-&&-&&</span>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    paddingTop: "9rem",
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
  timeStampsBox: {
    width: "calc(100% + 10px)",
    marginLeft: -5,
    marginTop: 4,
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
