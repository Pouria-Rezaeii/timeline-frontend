import React from "react";
import {makeStyles} from "@mui/styles";
import dateFormat from "dateformat";
import Button from "../Button";
import ModalWrapper from "./ModalWrapper";
import {useSearchParams} from "react-router-dom";
import Input from "../Input";

interface IProps {
  onClickClose?: () => void;
}

const today = new Date();
const twoDayBefore = today.setDate(today.getDate() - 2);
const toInitialValue = dateFormat(new Date(), "yyyy-mm-dd");
const fromInitialValue = dateFormat(twoDayBefore, "yyyy-mm-dd");

export default function TimelineSettingModal(props: IProps) {
  const [from, setFrom] = React.useState(fromInitialValue);
  const [to, setTo] = React.useState(toInitialValue);
  const [displayEventsTitle, setDisplayEventsTitle] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const c = useStyles();

  React.useEffect(() => {
    const fromQParam = searchParams.get("from");
    const toQParam = searchParams.get("to");
    fromQParam &&
      setFrom(`${fromQParam.slice(0, 4)}-${fromQParam.slice(4, 6)}-${fromQParam.slice(6, 8)}`);
    toQParam && setTo(`${toQParam.slice(0, 4)}-${toQParam.slice(4, 6)}-${toQParam.slice(6, 8)}`);
  }, []);

  const handleAccept = () => {
    setSearchParams({
      from: from.split("-").join(""),
      to: to.split("-").join(""),
    });
    props.onClickClose?.();
  };

  const handleReset = () => {
    setSearchParams({
      from: fromInitialValue.split("-").join(""),
      to: toInitialValue.split("-").join(""),
    });
    props.onClickClose?.();
  };

  return (
    <ModalWrapper onClickBackdrop={props.onClickClose} title='Settings'>
      <label style={{width: "100%"}}>
        <span className={c.label} style={{}}>
          From
        </span>
        <Input type='date' value={from} onChange={(e) => setFrom(e.target.value)} />
      </label>
      <div style={{height: 2}} />
      <label style={{width: "100%"}}>
        <span className={c.label}>To</span>
        <Input type='date' value={to} onChange={(e) => setTo(e.target.value)} />
      </label>
      <label className={c.checkbox}>
        <input
          type='checkbox'
          checked={displayEventsTitle}
          onChange={(e) => setDisplayEventsTitle(e.target.checked)}
        />
        <span>Display Events title</span>
      </label>
      <div className={c.buttonsBox}>
        <Button variant='secondary' onClick={handleReset}>
          Reset
        </Button>
        <Button variant='primary' onClick={handleAccept}>
          Submit
        </Button>
      </div>
    </ModalWrapper>
  );
}

const useStyles = makeStyles((theme) => ({
  label: {
    display: "block",
    marginBottom: 6,
    color: "#777",
    paddingLeft: 2,
  },
  checkbox: {
    width: "100%",
    marginTop: 16,
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
