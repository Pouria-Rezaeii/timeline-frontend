import React from "react";
import {down, up} from "js-media-query";

export function useMediaQuery(direction: "up" | "down", width: number) {
  const [match, setMatch] = React.useState(false);

  React.useEffect(() => {
    setMatch(check(direction, width));
    const listener = () => setMatch(check(direction, width));

    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return match;
}

function check(direction: "up" | "down", width: number) {
  if (direction === "up") {
    return up(width) ? true : false;
  } else {
    return down(width - 1) ? true : false;
  }
}
