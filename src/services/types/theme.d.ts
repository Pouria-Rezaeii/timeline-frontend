import "@mui/styles";
import { theme } from "../theme";

type Theme = typeof theme;

declare module "@mui/styles" {
  interface DefaultTheme extends Theme {}
}
