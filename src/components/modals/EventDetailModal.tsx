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
import Button from "../Button";
import ModalWrapper from "./ModalWrapper";

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
    <ModalWrapper title='Event Detail' onClickBackdrop={() => onClickClose?.()}>
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
        <Button variant='danger' onClick={handleDelete}>
          Delete
        </Button>
        <Button variant='primary' onClick={handleEdit}>
          Edit
        </Button>
      </div>
    </ModalWrapper>
  );
}

const useStyles = makeStyles((theme) => ({
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
}));
