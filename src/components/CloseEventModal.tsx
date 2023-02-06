import React from "react";
import { makeStyles } from "@mui/styles";
import Overlay from "./Overlay";
import { axios } from "../services/axios";
import clsx from "clsx";
import dateFormat from "dateformat";
import Select from "react-dropdown-select";

interface IProps {
  onClickClose?: () => void;
}

export default function CloseEventModal(props: IProps) {
  const now = new Date();
  const [date, setDate] = React.useState(dateFormat(now, "yyyy-mm-dd"));
  const [time, setTime] = React.useState(dateFormat(now, "HH:MM"));
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState<{ value: string; label: string }[]>([]);
  const [description, setDescription] = React.useState("");
  const c = useStyles();

  const handleClose = () => props.onClickClose?.();

  const handleAccept = () => {
    if (!title || !tags.length) {
      alert("Please fill all fields.");
      return;
    }
    const data = {
      title,
      localDate: date.split("-").join(""),
      localTime: time.split(":").join(""),
      tags: tags?.map((item) => item.value),
      description,
    };
    axios
      .post("events", data)
      .then(() => props.onClickClose?.())
      .catch((err) =>
        alert(
          JSON.stringify(data, null, 4).concat(
            "\n".concat(JSON.stringify(err.response.data, null, 4))
          )
        )
      );
  };

  const options = [
    { value: "1", label: "Leanne Graham " },
    { value: "2", label: "Ervin Howell" },
    { value: "3", label: "John Eastwood" },
  ];

  return (
    <Overlay onClickBackdrop={handleClose}>
      <div className={c.container}>
        <div style={{ textAlign: "center" }}>
          <p className={c.title}>Close Current Event</p>
          <div className={c.line} />
        </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={c.textInput}
          placeholder="Title"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={c.input}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className={c.input}
        />
        <Select
          values={tags}
          options={options}
          onChange={(values) => setTags(values as any)}
          multi
          style={{ maxWidth: 250 }}
          className={c.select}
          placeholder="Tags"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={clsx(c.textInput, c.textArea)}
          placeholder="Description"
          rows={6}
        />
        <div className={c.buttonsBox}>
          <button className={clsx(c.button, c.reject)} onClick={handleClose}>
            Cancel
          </button>
          <button className={clsx(c.button, c.accept)} onClick={handleAccept}>
            Submit
          </button>
        </div>
      </div>
    </Overlay>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem 1.5rem 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "1.5rem",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 4,
    boxShadow: "2px 4px 4px 2px #888",
    // width: 300,
  },
  title: {
    fontWeight: 500,
    fontSize: "1.25rem",
  },
  line: {
    width: 100,
    height: 1,
    backgroundColor: theme.palette.primary.main,
    margin: "10px auto 2rem",
  },
  input: {
    fontSize: 16,
    padding: 8,
    fontWeight: 400,
    fill: "red",
    border: "1px solid hsl(0, 0%, 80%)",
    outline: "none",
    backgroundColor: "#eee",
    borderRadius: 4,
    cursor: "pointer",
    width: 250,
    height: 40,
  },
  textInput: {
    padding: "8px 8px",
    minHeight: 40,
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 4,
    fontSize: ".875rem",
    letterSpacing: 0.2,
    border: "1px solid hsl(0, 0%, 80%)",
    "&:focus": {
      outline: "none !important",
      border: "1px solid hsl(0, 0%, 70%)",
    },
  },
  select: {
    backgroundColor: "#eee !important",
    minHeight: "40px !important",
    borderRadius: "4px !important",
    "&:hover": {
      border: "1px solid hsl(0, 0%, 70%) !important",
    },
    "&:focus-within": {
      boxShadow: "none !important",
    },
    "& > *": {
      width: "250px !important",
    },
    "& input": {
      width: "200px !important",
    },
    "& .react-dropdown-select-dropdown": {
      width: "250px !important",
      maxHeight: "200px !important",
    },
    "& .react-dropdown-select-item": {
      fontSize: ".875rem",
    },
    "& .react-dropdown-select-option": {
      width: "200px !important",
      backgroundColor: "#ddd !important",
      color: "#444 !important",
      fontSize: ".75rem",
      display: "flex",
      justifyContent: "space-between",
      "& .react-dropdown-select-option-remove": {
        fontSize: "20px !important",
        flexShrink: 0,
        borderRadius: 2,
        backgroundColor: "#ff00000a",
        marginLeft: "4px",
        color: "#ff000033",
      },
    },
  },
  textArea: {
    resize: "none",
    letterSpacing: -0.8,
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
  accept: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  reject: {
    backgroundColor: "#fff",
    border: "solid 1px #555",
  },
}));
