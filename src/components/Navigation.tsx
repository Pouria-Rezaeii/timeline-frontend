import React from "react";
import {makeStyles} from "@mui/styles";
import {headerHeight, headerHeightSmall} from "../services/sizes";
import EventModal from "./modals/EventModal";
import {useDeviceSize} from "../services/hooks/useDeviceSize";
import clsx from "clsx";
import IconButton from "./IconButton";
import TagModal from "./modals/TagModal";
import Spinner from "./Spinner";
import {useLoading} from "../services/contexts/LoadingContenxt";
import TimelineSettingModal from "./modals/TimelineSettingModal";

export default function Navigation() {
  const [showEventModal, setShowEventModal] = React.useState(false);
  const [showTagModal, setShowTagModal] = React.useState(false);
  const [showSettingModal, setShowSettingModal] = React.useState(false);
  const {isTabletSize} = useDeviceSize();
  const {isLoading} = useLoading();
  const c = useStyles();

  const handleToggleEventModal = () => setShowEventModal((prev) => !prev);
  const handleToggleTagModal = () => setShowTagModal((prev) => !prev);
  const handleToggleSettingModal = () => setShowSettingModal((prev) => !prev);

  return (
    <>
      {isTabletSize ? (
        <div className={clsx(c.container, c.smallDevices)}>
          <div className={c.logoBox}>
            <a href='/'>
              <img src='/timeline.svg' className={c.logo} />
              <span>Timeline</span>
            </a>
          </div>
          <button className={c.buttonCircle} onClick={handleToggleEventModal}>
            {isLoading ? <Spinner /> : "Submit Event"}
          </button>
          <div className={c.iconsBox}>
            <IconButton onClick={handleToggleTagModal}>
              <img src='/tag.svg' width={24} height={24} />
            </IconButton>
            <IconButton onClick={handleToggleSettingModal}>
              <img src='/filter.svg' width={24} height={24} />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className={clsx(c.container, c.largeDevices)} style={{height: headerHeight}}>
          <div className={c.flexBox}>
            <a href='/'>
              <img src='/timeline.svg' className={c.logo} />
            </a>
            <h1 className={c.title}>T.i.m.e.l.i.n.e</h1>
          </div>
          <div>
            <button className={c.button} onClick={handleToggleTagModal}>
              Create Tag
            </button>
            <button className={c.button}>Filters</button>
            <button
              className={c.button}
              // temporary for desktop size
              style={{minWidth: 60, height: isLoading ? 33 : undefined}}
              onClick={handleToggleEventModal}
            >
              {isLoading ? <Spinner size='small' style={{lineHeight: 0.5}} /> : "Submit Event"}
            </button>
          </div>
        </div>
      )}
      {showEventModal && <EventModal onClickClose={() => setShowEventModal(false)} />}
      {showTagModal && <TagModal onClickClose={() => setShowTagModal(false)} />}
      {showSettingModal && <TimelineSettingModal onClickClose={() => setShowSettingModal(false)} />}
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
    paddingRight: 12,
    paddingLeft: 12,
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
    display: "inline-flex",
    justifyContent: "center",
    minWidth: 30,
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
    height: "100%",
    overflow: "hidden",
    textAlign: "left",
    "& *": {
      transform: "translateY(-8px)",
    },
    "& span": {
      color: "#fff",
      fontSize: 11,
      marginLeft: 7,
      letterSpacing: 2.8,
    },
  },
  logo: {
    width: 60,
    [theme.tabletSize]: {
      width: 70,
      marginLeft: ".25rem",
      marginBottom: -30,
    },
  },
}));
