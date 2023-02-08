import { mobileSize, tabletSize } from "../sizes";
import { useMediaQuery } from "./useMediaQuery";

export function useDeviceSize() {
  const isMobileSize = useMediaQuery("down", mobileSize);
  const isTabletSize = useMediaQuery("down", tabletSize);

  return {
    isMobileSize,
    isTabletSize,
  };
}
