import React from "react";
import {makeStyles} from "@mui/styles";
import Overlay from "../Overlay";
import {axios} from "../../services/api/axios";
import clsx from "clsx";
import {useTags} from "../../services/contexts/TagsContext";
import {Tag} from "../../services/types/Tag.type";
import {useLoading} from "../../services/contexts/LoadingContenxt";
import {useDeviceSize} from "../../services/hooks/useDeviceSize";

interface IProps {
  onClickClose?: () => void;
}

export default function TagModal(props: IProps) {
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("");
  const {tags, setTags} = useTags();
  const {isLoading, addApiLoadingState} = useLoading();
  const {isTabletSize} = useDeviceSize();
  const c = useStyles();

  const handleClose = () => props.onClickClose?.();

  const handleAccept = () => {
    if (!name) {
      return;
    }
    if (color.length !== 6) {
      alert("Color code is wrong.");
      return;
    }

    const data: Omit<Tag, "_id"> = {name, color};
    addApiLoadingState(true, "newTag");
    axios
      .post<Tag>("tags", data)
      .then((response) => {
        setTags([...(tags || []), response.data]);
        props.onClickClose?.();
        // revalidateTags();
      })
      .catch((err) => alert(JSON.stringify(err.response.data, null, 4)))
      .finally(() => addApiLoadingState(false, "newTag"));
    props.onClickClose?.();
  };

  return (
    <Overlay onClickBackdrop={!isTabletSize ? handleClose : undefined}>
      <div className={c.container}>
        <div style={{textAlign: "center"}}>
          <p className={c.title}>Create New Tag</p>
          <div className={c.line} />
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={c.textInput}
          placeholder='Tag Name'
        />
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={c.textInput}
          placeholder='Color Code'
        />
        <div className={c.colorBox} style={{backgroundColor: `#${color}`}} />
        <div className={c.buttonsBox}>
          <button className={clsx(c.button, c.reject)} onClick={handleClose}>
            Cancel
          </button>
          <button className={clsx(c.button, c.accept)} onClick={handleAccept} disabled={isLoading}>
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
    margin: "10px auto 2rem",
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
  colorBox: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    border: "1px solid hsl(0, 0%, 70%)",
  },
}));
