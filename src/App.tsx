import React from "react";
import {theme} from "./services/theme";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import {ThemeProvider} from "@mui/styles";
import TagsProvider from "./services/contexts/TagsContext";
import TimelinesProvider from "./services/contexts/TimelinesContext";
import LoadingProvider from "./services/contexts/LoadingContenxt";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LoadingProvider>
          <TimelinesProvider>
            <TagsProvider>
              <Routes>
                <Route path='/' element={<Home />} />
              </Routes>
            </TagsProvider>
          </TimelinesProvider>
        </LoadingProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
