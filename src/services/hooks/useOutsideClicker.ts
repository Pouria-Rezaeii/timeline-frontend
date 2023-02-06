import React, { useEffect } from "react";

export function useOutsideClicker(handler: (event: MouseEvent) => void) {
  const ref = React.useRef<any>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if ((ref && !ref.current) || (ref && ref.current?.contains(event.target as Node))) {
        return;
      }
      handler(event);
    };
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
  return ref;
}
