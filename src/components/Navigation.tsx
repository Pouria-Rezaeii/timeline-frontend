import React from "react";
import { makeStyles } from "@mui/styles";
import { headerHeight, headerHeightSmall } from "../services/sizes";
import EventModal from "./EventModal";
import { useDeviceSize } from "../services/hooks/useDeviceSize";
import clsx from "clsx";
import IconButton from "./IconButton";
import TagModal from "./TagModal";
import { axios } from "../services/axios";
import { Tag } from "../services/types/Tag.type";

export default function Navigation() {
  const [shodEventModal, setShowEventModal] = React.useState(false);
  const [shodTagModal, setShowTagModal] = React.useState(false);
  const { isTabletSize } = useDeviceSize();
  const c = useStyles();

  const handleToggleEventModal = () => setShowEventModal((prev) => !prev);
  const handleToggleTagModal = () => setShowTagModal((prev) => !prev);

  return (
    <>
      {isTabletSize ? (
        <div className={clsx(c.container, c.smallDevices)}>
          <div className={c.logoBox}>
            <img src="/timeline.svg" className={c.logo} />
          </div>
          <button className={c.buttonCircle} onClick={handleToggleEventModal}>
            Submit Event
          </button>
          <div className={c.iconsBox}>
            <IconButton onClick={handleToggleTagModal}>
              <img src="/tag.svg" width={24} height={24} />
            </IconButton>
            <IconButton>
              <img src="/filter.svg" width={24} height={24} />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className={clsx(c.container, c.largeDevices)} style={{ height: headerHeight }}>
          <div className={c.flexBox}>
            <img src="/timeline.svg" className={c.logo} />
            <h1 className={c.title}>T.i.m.e.L.i.n.e</h1>
          </div>
          <div>
            <button className={c.button} onClick={handleToggleTagModal}>
              Create Tag
            </button>
            <button className={c.button}>Filters</button>
            <button className={c.button} onClick={handleToggleEventModal}>
              Submit Event
            </button>
          </div>
        </div>
      )}
      {shodEventModal && <EventModal onClickClose={() => setShowEventModal(false)} />}
      {shodTagModal && <TagModal onClickClose={() => setShowTagModal(false)} />}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    zIndex: 1000,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& > *": {
      fontWeight: 600,
      textAlign: "center",
    },
  },
  largeDevices: {
    top: 0,
    height: headerHeight,
  },
  smallDevices: {
    bottom: 0,
    height: headerHeightSmall,
    paddingRight: 8,
    paddingLeft: 8,
  },
  title: {
    margin: 0,
    marginLeft: -6,
    marginTop: 2,
    padding: ".75rem",
    color: "white",
    fontWeight: 500,
    letterSpacing: 0.2,
    fontSize: "2.2rem",
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
  buttonCircle: {
    width: 100,
    height: 100,
    marginBottom: 12,
    border: "1px solid #ffffff18",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    cursor: "pointer",
    outline: "none",
    fontSize: "1.1rem",
  },
  flexBox: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 12,
  },
  iconsBox: {
    width: 100,
    display: "flex",
    gap: 6,
  },
  logoBox: {
    width: 100,
    textAlign: "left",
  },
  logo: {
    width: 60,
    [theme.tabletSize]: {
      width: 70,
      marginLeft: ".25rem",
    },
  },
}));
