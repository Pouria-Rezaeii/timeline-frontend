import { tabletSize } from "./sizes";

export const theme = {
  palette: {
    primary: {
      light: "#27C09F",
      main: "#565282",
      dark: "#049575",
    },
    secondary: {
      light: "",
      main: "",
      dark: "",
    },
    text: {
      primary: "#000000",
      secondary: "#444444",
    },
  },
  mobileSize: generateMediaQuery(600, "down"),
  tabletSize: generateMediaQuery(tabletSize, "down"),
  breakpoints: {
    up: (size: number) => generateMediaQuery(size, "up"),
    down: (size: number) => generateMediaQuery(size, "down"),
  },
  zIndex: {
    header: 1000,
  },
};

function generateMediaQuery(size: number, type: "up" | "down") {
  return type === "up"
    ? `@media (min-width: ${size + 0.05}px)`
    : `@media (max-width: ${size - 0.05}px)`;
}
