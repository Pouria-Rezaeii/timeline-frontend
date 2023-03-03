import React from "react";
import {makeStyles} from "@mui/styles";
import {axios} from "../../services/api/axios";
import dateFormat from "dateformat";
import {CreateEvent, Event} from "../../services/types/Event.type";
import {useTags} from "../../services/contexts/TagsContext";
import {useTimelines} from "../../services/contexts/TimelinesContext";
import {useLoading} from "../../services/contexts/LoadingContenxt";
import Button from "../Button";
import ModalWrapper from "./ModalWrapper";
import Input from "../Input";
import TextArea from "../TextArea";
import Select from "../Select";

interface IProps {
  onClickClose?: () => void;
}

export default function EventModal(props: IProps) {
  const now = new Date();
  const [date, setDate] = React.useState(dateFormat(now, "yyyy-mm-dd"));
  const [time, setTime] = React.useState(dateFormat(now, "HH:MM"));
  const [title, setTitle] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<{value: string; label: string}[]>([]);
  const [description, setDescription] = React.useState("");
  const [orderIsFollowed, setOrderIsFollowed] = React.useState(true);
  const {tags} = useTags();
  const {timelines, setTimelines, revalidateTimelines} = useTimelines();
  const {isLoading, addApiLoadingState} = useLoading();
  const c = useStyles();

  const handleClose = () => props.onClickClose?.();

  const handleAccept = () => {
    if (!title || !selectedTags.length) {
      alert("Please fill all fields.");
      return;
    }
    if (Number(date.split("-").join("")) > Number(dateFormat(now, "yyyymmdd"))) {
      alert("Date is bigger than today.");
      return;
    }
    const data: CreateEvent = {
      title,
      localDate: date.split("-").join(""),
      localTime: time.split(":").join(""),
      tags: selectedTags.map((item) => item.value),
      description: description || null,
    };

    addApiLoadingState(true, "newEvent");
    axios
      .post<Event>("events", data)
      .then((response) => {
        if (orderIsFollowed) {
          const updatedValue = timelines?.map((timeline, index) => {
            return index === 0
              ? {...timeline, events: [...timeline.events, response.data]}
              : {...timeline};
          });
          setTimelines(updatedValue);
        } else {
          revalidateTimelines();
        }
        // alert("Done");
      })
      .catch((err) => alert(JSON.stringify(err.response.data, null, 4)))
      .finally(() => addApiLoadingState(false, "newEvent"));
    props.onClickClose?.();
  };

  return (
    <ModalWrapper onClickBackdrop={handleClose} noBackdropClickOnMobile title='Close Current Event'>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
      <div className={c.inputBox}>
        <Input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className={c.inputBox}>
        <Input type='time' value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <div className={c.inputBox}>
        <Select
          values={selectedTags}
          options={(tags || [])
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => ({label: item.name, value: item._id}))}
          onChange={(values) => setSelectedTags(values as any)}
          multi
          placeholder='Tags'
        />
      </div>
      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Description'
      />
      <label className={c.checkbox}>
        <input
          type='checkbox'
          checked={orderIsFollowed}
          onChange={(e) => setOrderIsFollowed(e.target.checked)}
        />
        <span>The order has been followed.</span>
      </label>
      <div className={c.buttonsBox}>
        <Button variant='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='primary' onClick={handleAccept} disabled={isLoading}>
          Submit
        </Button>
      </div>
    </ModalWrapper>
  );
}

const useStyles = makeStyles((theme) => ({
  inputBox: {
    width: 250,
  },
  checkbox: {
    width: "100%",
    padding: 2,
    "& input": {
      accentColor: theme.palette.primary.main,
      marginRight: 6,
      transform: "scale(1.2)",
    },
  },
  buttonsBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: ".75rem",
    marginTop: "1.5rem",
  },
}));
