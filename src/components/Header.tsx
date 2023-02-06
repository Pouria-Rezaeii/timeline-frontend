import React from "react";
import { makeStyles } from "@mui/styles";
import { headerHeight } from "../services/sizes";
import CloseEventModal from "./CloseEventModal";

export default function Header() {
  const [shodModal, setShowModal] = React.useState(false);
  const c = useStyles();

  const handleOpenModal = () => setShowModal((prev) => !prev);

  return (
    <>
      <header className={c.container} style={{ height: headerHeight }}>
        <h1 className={c.title}>T.i.m.e.L.i.n.e</h1>
        <img src="/timeline.png" className={c.logo} />
        <button className={c.button} onClick={handleOpenModal}>
          Close Event
        </button>
      </header>
      {shodModal && <CloseEventModal onClickClose={() => setShowModal(false)} />}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& > *": {
      fontWeight: 600,
      textAlign: "center",
    },
    overflow: "hidden",
  },
  title: {
    margin: 0,
    padding: ".75rem",
    color: "white",
    fontWeight: 500,
    letterSpacing: -1.2,
    fontSize: "1.2rem",
  },
  button: {
    border: "1px solid #ffffff44",
    borderRadius: 4,
    padding: ".5rem .75rem",
    backgroundColor: "#ffffff33",
    color: "#fff",
    cursor: "pointer",
    marginRight: ".75rem",
    outline: "none",
  },
  logo: {
    width: 100,
  },
}));
