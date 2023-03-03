import React from "react";
import {makeStyles} from "@mui/styles";
import Overlay from "../Overlay";
import {axios} from "../../services/api/axios";
import {useTags} from "../../services/contexts/TagsContext";
import {Tag} from "../../services/types/Tag.type";
import {useLoading} from "../../services/contexts/LoadingContenxt";
import Button from "../Button";
import ModalWrapper from "./ModalWrapper";
import Input from "../Input";

interface IProps {
  onClickClose?: () => void;
}

export default function TagModal(props: IProps) {
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("");
  const {tags, setTags} = useTags();
  const {isLoading, addApiLoadingState} = useLoading();
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
    <ModalWrapper onClickBackdrop={handleClose} title='Create New Tag'>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Tag Name' />
      <Input value={color} onChange={(e) => setColor(e.target.value)} placeholder='Color Code' />
      <div className={c.colorBox} style={{backgroundColor: `#${color}`}} />
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
  buttonsBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: ".75rem",
    marginTop: "1.5rem",
  },
  colorBox: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    border: "1px solid hsl(0, 0%, 70%)",
  },
}));
