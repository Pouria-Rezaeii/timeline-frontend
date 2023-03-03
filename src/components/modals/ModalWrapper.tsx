import React from "react";
import {makeStyles} from "@mui/styles";
import Overlay from "../Overlay";
import {useDeviceSize} from "../../services/hooks/useDeviceSize";

interface IProps {
  title: string;
  children: React.ReactNode;
  onClickBackdrop?: () => void;
  noBackdropClickOnMobile?: boolean;
}

export default function ModalWrapper(props: IProps) {
  const {title, children, onClickBackdrop, noBackdropClickOnMobile} = props;
  const {isMobileSize} = useDeviceSize();
  const c = useStyles();

  return (
    <Overlay
      onClickBackdrop={!noBackdropClickOnMobile || !isMobileSize ? onClickBackdrop : undefined}
    >
      <div className={c.container}>
        <div className={c.titleBox}>{title}</div>
        <div className={c.contentBox}>{children}</div>
      </div>
    </Overlay>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: 300,
    borderRadius: 4,
    boxShadow: "2px 4px 4px 2px #666",
    overflow: "hidden",
    backgroundColor: theme.palette.primary.main,
  },
  titleBox: {
    width: "100%",
    padding: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 500,
    fontSize: "1.25rem",
    color: "#fff",
    height: 86,
  },
  contentBox: {
    width: "100%",
    backgroundColor: "#fff",
    padding: "2rem 1.5rem 0",
    paddingBottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
}));
