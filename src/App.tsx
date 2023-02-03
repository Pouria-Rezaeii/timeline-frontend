import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import { theme } from "./services/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}
