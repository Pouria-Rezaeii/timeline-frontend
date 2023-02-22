import React from "react";
import {makeStyles} from "@mui/styles";
import Overlay from "../Overlay";
import {Event} from "../../services/types/Event.type";
import {axios} from "../../services/api/axios";
import {useLoading} from "../../services/contexts/LoadingContenxt";
import {useTimelines} from "../../services/contexts/TimelinesContext";
import {useTags} from "../../services/contexts/TagsContext";
import clsx from "clsx";
import getLeadingZero from "../../services/utils/getLeadingZero";

interface IProps {
  onClickClose?: () => void;
  event: Event;
  prevEvent: Event | null;
}

export default function EventDetailModal(props: IProps) {
  const {onClickClose, event, prevEvent} = props;
  const {addApiLoadingState} = useLoading();
  const {revalidateTimelines} = useTimelines();
  const {tags} = useTags();
  const c = useStyles();

  const handleEdit = () => {};

  const handleDelete = () => {
    if (window.confirm("Are you sure to delete this event?") === true) {
      axios.delete(`events/${event._id}`);
      addApiLoadingState(true, "deleteEvent");
      axios
        .delete(`events/${event._id}`)
        .then(() => {
          revalidateTimelines();
        })
        .catch((err) => alert(JSON.stringify(err.response.data, null, 4)))
        .finally(() => addApiLoadingState(false, "deleteEvent"));
      props.onClickClose?.();
    } else {
      onClickClose?.();
    }
  };

  const getDuration = () => {
    const eventTimeInMinute =
      Number(event.localTime.slice(0, 2)) * 60 + Number(event.localTime.slice(2, 4));

    const prevEventTimeInMinute = prevEvent
      ? Number(prevEvent.localTime.slice(0, 2)) * 60 + Number(prevEvent.localTime.slice(2, 4))
      : 0;
    const durationInMinutes = eventTimeInMinute - prevEventTimeInMinute;
    return `${getLeadingZero(Math.floor(durationInMinutes / 60))}:${getLeadingZero(
      durationInMinutes % 60
    )}`;
  };

  return (
    <Overlay onClickBackdrop={() => onClickClose?.()}>
      <div className={c.container}>
        <div style={{textAlign: "center"}}>
          <p className={c.title}>Event Details</p>
          <div className={c.line} />
        </div>
        <p className={c.eventTitle}>{event.title}</p>
        <p>
          {prevEvent
            ? `${prevEvent.localTime.slice(0, 2)}:${prevEvent.localTime.slice(2, 4)}`
            : "00:00"}{" "}
          -- {event.localTime.slice(0, 2)}:{event.localTime.slice(2, 4)}
        </p>
        <p>{getDuration()}</p>
        <p className={c.tagsBox}>
          {event.tags.map((tagId) => (
            <span key={tagId}>{tags?.find((tag) => tag._id === tagId)?.name}</span>
          ))}
        </p>
        {event.description && (
          <p className={c.eventDescription} style={{}}>
            {event.description}
          </p>
        )}
        <div className={c.buttonsBox}>
          <button className={clsx(c.button, c.delete)} onClick={handleDelete}>
            Delete
          </button>
          <button className={clsx(c.button, c.edit)} onClick={handleEdit}>
            Edit
          </button>
        </div>
      </div>
    </Overlay>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: 300,
    padding: "2rem 1.5rem 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "1.5rem",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 4,
    boxShadow: "2px 4px 4px 2px #666",
  },
  title: {
    fontWeight: 500,
    fontSize: "1.25rem",
  },
  line: {
    width: 100,
    height: 1,
    backgroundColor: theme.palette.primary.main,
    margin: "10px auto 1rem",
  },
  eventTitle: {
    direction: "rtl",
    textAlign: "left",
    marginBottom: 12,
    fontWeight: 500,
  },
  tagsBox: {
    display: "flex",
    gap: 8,
    "& *": {
      minWidth: 75,
      textAlign: "center",
      fontSize: 12,
      border: "solid 1px #aaa",
      borderRadius: 18,
      padding: "6px 8px",
    },
  },
  eventDescription: {
    fontSize: 14,
    marginTop: 8,
  },
  buttonsBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: ".75rem",
    marginTop: "1.5rem",
  },
  button: {
    width: "100%",
    borderRadius: 4,
    padding: ".75rem 0",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: ".875rem",
    border: "none",
    outline: "none",
  },
  edit: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  delete: {
    backgroundColor: "#e63946",
    color: "#fff",
  },
}));
