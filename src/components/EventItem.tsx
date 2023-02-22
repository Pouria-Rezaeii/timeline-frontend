import React from "react";
import {Event} from "../services/types/Event.type";
import {makeStyles} from "@mui/styles";
import {Tag} from "../services/types/Tag.type";

function getColor(id: string, tags?: Tag[]) {
  return tags?.find((item) => item._id === id)?.color;
}

interface IProps {
  event: Event;
  showTitle: boolean;
  onClick?: () => void;
  tags?: Tag[];
}

export default React.memo(function EventItem(props: IProps) {
  const {event, showTitle, tags, onClick: handleClick} = props;
  const c = useStyles();
  const firstTagColor = getColor(event.tags[0], tags);

  // console.log("Event Rendered");

  return (
    <div className={c.event} onClick={handleClick}>
      {showTitle && (
        <div className={c.title} style={{borderTopColor: firstTagColor}}>
          {event.title}
        </div>
      )}
      {event.tags.length === 1 ? (
        <div style={{height: "100%", backgroundColor: firstTagColor}} />
      ) : (
        event.tags.map((tagId) => (
          <div
            key={tagId}
            style={{
              height: `${(100 / event.tags.length).toFixed(3)}%`,
              backgroundColor: getColor(tagId, tags),
            }}
          />
        ))
      )}
    </div>
  );
});

export function EventPlaceholder() {
  const c = useStyles();
  return (
    <div className={c.event} style={{width: "11.5%"}}>
      <div className={c.title} style={{borderTopColor: "#ddd"}}></div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  event: {
    height: "100%",
    position: "relative",
  },
  title: {
    position: "absolute",
    bottom: "5.2rem",
    right: -65,
    fontSize: 8,
    transform: "rotate(-270deg)",
    minWidth: 140,
    borderTopWidth: 1,
    borderTopStyle: "dashed",
    direction: "rtl",
    textAlign: "left",
    [theme.tabletSize]: {
      lineHeight: 1,
    },
  },
}));
